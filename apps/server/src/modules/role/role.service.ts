import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto, RoleQueryDto } from './dto/role.dto';
import { Role, PageResult, Status } from '@admin-system/shared';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: RoleQueryDto): Promise<PageResult<Role>> {
    const { pageNum, pageSize, roleName, roleKey, status } = query;
    const skip = (pageNum - 1) * pageSize;

    const where: any = {};
    if (roleName) {
      where.roleName = { contains: roleName };
    }
    if (roleKey) {
      where.roleKey = { contains: roleKey };
    }
    if (status !== undefined && status !== null) {
      where.status = status;
    }

    const [roles, total] = await Promise.all([
      this.prisma.role.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          roleMenus: true,
        },
        orderBy: { roleSort: 'asc' },
      }),
      this.prisma.role.count({ where }),
    ]);

    const list = roles.map(role => ({
      roleId: role.roleId,
      roleName: role.roleName,
      roleKey: role.roleKey,
      roleSort: role.roleSort,
      status: role.status,
      menuIds: role.roleMenus.map(rm => rm.menuId),
      remark: role.remark,
      createTime: role.createTime.toISOString(),
      updateTime: role.updateTime.toISOString(),
    }));

    return {
      list,
      total,
      pageNum,
      pageSize,
    };
  }

  async findAllRoles(): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({
      where: { status: Status.NORMAL },
      include: {
        roleMenus: true,
      },
      orderBy: { roleSort: 'asc' },
    });

    return roles.map(role => ({
      roleId: role.roleId,
      roleName: role.roleName,
      roleKey: role.roleKey,
      roleSort: role.roleSort,
      status: role.status,
      menuIds: role.roleMenus.map(rm => rm.menuId),
      remark: role.remark,
      createTime: role.createTime.toISOString(),
      updateTime: role.updateTime.toISOString(),
    }));
  }

  async findOne(roleId: number): Promise<Role> {
    const role = await this.prisma.role.findUnique({
      where: { roleId },
      include: {
        roleMenus: true,
      },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return {
      roleId: role.roleId,
      roleName: role.roleName,
      roleKey: role.roleKey,
      roleSort: role.roleSort,
      status: role.status,
      menuIds: role.roleMenus.map(rm => rm.menuId),
      remark: role.remark,
      createTime: role.createTime.toISOString(),
      updateTime: role.updateTime.toISOString(),
    };
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { menuIds, ...rest } = createRoleDto;

    // 检查角色键是否已存在
    const existingRole = await this.prisma.role.findUnique({
      where: { roleKey: rest.roleKey },
    });

    if (existingRole) {
      throw new BadRequestException('Role key already exists');
    }

    // 创建角色
    const role = await this.prisma.role.create({
      data: {
        ...rest,
        roleMenus: {
          create: menuIds.map(menuId => ({ menuId })),
        },
      },
      include: {
        roleMenus: true,
      },
    });

    return {
      roleId: role.roleId,
      roleName: role.roleName,
      roleKey: role.roleKey,
      roleSort: role.roleSort,
      status: role.status,
      menuIds: role.roleMenus.map(rm => rm.menuId),
      remark: role.remark,
      createTime: role.createTime.toISOString(),
      updateTime: role.updateTime.toISOString(),
    };
  }

  async update(roleId: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const { menuIds, ...rest } = updateRoleDto;

    // 检查角色是否存在
    const existingRole = await this.prisma.role.findUnique({
      where: { roleId },
    });

    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    // 检查角色键是否被其他角色占用
    if (rest.roleKey !== existingRole.roleKey) {
      const roleWithSameKey = await this.prisma.role.findUnique({
        where: { roleKey: rest.roleKey },
      });

      if (roleWithSameKey) {
        throw new BadRequestException('Role key already exists');
      }
    }

    // 更新角色
    const role = await this.prisma.role.update({
      where: { roleId },
      data: {
        ...rest,
        roleMenus: {
          deleteMany: {},
          create: menuIds.map(menuId => ({ menuId })),
        },
      },
      include: {
        roleMenus: true,
      },
    });

    return {
      roleId: role.roleId,
      roleName: role.roleName,
      roleKey: role.roleKey,
      roleSort: role.roleSort,
      status: role.status,
      menuIds: role.roleMenus.map(rm => rm.menuId),
      remark: role.remark,
      createTime: role.createTime.toISOString(),
      updateTime: role.updateTime.toISOString(),
    };
  }

  async remove(roleId: number): Promise<void> {
    const role = await this.prisma.role.findUnique({
      where: { roleId },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // 检查是否有用户使用该角色
    const usersWithRole = await this.prisma.userRole.count({
      where: { roleId },
    });

    if (usersWithRole > 0) {
      throw new BadRequestException('Cannot delete role that is assigned to users');
    }

    await this.prisma.role.delete({
      where: { roleId },
    });
  }
}

