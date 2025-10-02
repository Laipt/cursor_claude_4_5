import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, UserQueryDto, ResetPasswordDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User, PageResult } from '@admin-system/shared';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: UserQueryDto): Promise<PageResult<User>> {
    const { pageNum, pageSize, username, phone, status } = query;
    const skip = (pageNum - 1) * pageSize;

    const where: any = {};
    if (username) {
      where.username = { contains: username };
    }
    if (phone) {
      where.phone = { contains: phone };
    }
    if (status !== undefined && status !== null) {
      where.status = status;
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
        orderBy: { createTime: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    const list = users.map(user => ({
      userId: user.userId,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      status: user.status,
      roleIds: user.userRoles.map(ur => ur.roleId),
      roles: user.userRoles.map(ur => ur.role.roleName),
      createTime: user.createTime.toISOString(),
      updateTime: user.updateTime.toISOString(),
    }));

    return {
      list,
      total,
      pageNum,
      pageSize,
    };
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      userId: user.userId,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      status: user.status,
      roleIds: user.userRoles.map(ur => ur.roleId),
      roles: user.userRoles.map(ur => ur.role.roleName),
      createTime: user.createTime.toISOString(),
      updateTime: user.updateTime.toISOString(),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, roleIds, ...rest } = createUserDto;

    // 检查用户名是否已存在
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        ...rest,
        userRoles: {
          create: roleIds.map(roleId => ({ roleId })),
        },
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    return {
      userId: user.userId,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      status: user.status,
      roleIds: user.userRoles.map(ur => ur.roleId),
      roles: user.userRoles.map(ur => ur.role.roleName),
      createTime: user.createTime.toISOString(),
      updateTime: user.updateTime.toISOString(),
    };
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { roleIds, ...rest } = updateUserDto;

    // 检查用户是否存在
    const existingUser = await this.prisma.user.findUnique({
      where: { userId },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // 检查用户名是否被其他用户占用
    if (rest.username !== existingUser.username) {
      const userWithSameName = await this.prisma.user.findUnique({
        where: { username: rest.username },
      });

      if (userWithSameName) {
        throw new BadRequestException('Username already exists');
      }
    }

    // 更新用户
    const user = await this.prisma.user.update({
      where: { userId },
      data: {
        ...rest,
        userRoles: {
          deleteMany: {},
          create: roleIds.map(roleId => ({ roleId })),
        },
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    return {
      userId: user.userId,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      status: user.status,
      roleIds: user.userRoles.map(ur => ur.roleId),
      roles: user.userRoles.map(ur => ur.role.roleName),
      createTime: user.createTime.toISOString(),
      updateTime: user.updateTime.toISOString(),
    };
  }

  async remove(userId: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { userId },
    });
  }

  async batchRemove(userIds: number[]): Promise<void> {
    await this.prisma.user.deleteMany({
      where: {
        userId: { in: userIds },
      },
    });
  }

  async resetPassword(userId: number, resetPasswordDto: ResetPasswordDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 10);

    await this.prisma.user.update({
      where: { userId },
      data: { password: hashedPassword },
    });
  }
}

