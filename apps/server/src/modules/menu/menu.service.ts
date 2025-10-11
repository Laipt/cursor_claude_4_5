import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { Menu, MenuTree, Status } from '@kk/shared';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Menu[]> {
    const menus = await this.prisma.menu.findMany({
      orderBy: { orderNum: 'asc' },
    });

    return menus.map(menu => ({
      menuId: menu.menuId,
      menuName: menu.menuName,
      parentId: menu.parentId,
      orderNum: menu.orderNum,
      path: menu.path,
      component: menu.component,
      menuType: menu.menuType as any,
      visible: menu.visible,
      status: menu.status,
      perms: menu.perms,
      icon: menu.icon,
      remark: menu.remark,
      createTime: menu.createTime.toISOString(),
      updateTime: menu.updateTime.toISOString(),
    }));
  }

  async findTree(userId?: number): Promise<MenuTree[]> {
    let menus: any[];

    if (userId) {
      // 获取用户的菜单权限
      const user = await this.prisma.user.findUnique({
        where: { userId },
        include: {
          userRoles: {
            include: {
              role: {
                include: {
                  roleMenus: {
                    include: {
                      menu: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!user) {
        return [];
      }

      // 检查是否是管理员
      const isAdmin = user.userRoles.some(
        ur => ur.role.roleKey === 'admin' && ur.role.status === Status.NORMAL,
      );

      if (isAdmin) {
        // 管理员获取所有菜单
        menus = await this.prisma.menu.findMany({
          where: { status: Status.NORMAL },
          orderBy: { orderNum: 'asc' },
        });
      } else {
        // 普通用户获取授权的菜单
        const menuIds = new Set<number>();
        user.userRoles.forEach(ur => {
          if (ur.role.status === Status.NORMAL) {
            ur.role.roleMenus.forEach(rm => {
              if (rm.menu.status === Status.NORMAL) {
                menuIds.add(rm.menuId);
              }
            });
          }
        });

        menus = await this.prisma.menu.findMany({
          where: {
            menuId: { in: Array.from(menuIds) },
            status: Status.NORMAL,
          },
          orderBy: { orderNum: 'asc' },
        });
      }
    } else {
      // 不传 userId 则返回所有菜单
      menus = await this.prisma.menu.findMany({
        orderBy: { orderNum: 'asc' },
      });
    }

    const menuList = menus.map(menu => ({
      menuId: menu.menuId,
      menuName: menu.menuName,
      parentId: menu.parentId,
      orderNum: menu.orderNum,
      path: menu.path,
      component: menu.component,
      menuType: menu.menuType as any,
      visible: menu.visible,
      status: menu.status,
      perms: menu.perms,
      icon: menu.icon,
      remark: menu.remark,
      createTime: menu.createTime.toISOString(),
      updateTime: menu.updateTime.toISOString(),
    }));

    return this.buildTree(menuList);
  }

  private buildTree(menus: Menu[], parentId: number = 0): MenuTree[] {
    const tree: MenuTree[] = [];

    for (const menu of menus) {
      if (menu.parentId === parentId) {
        const children = this.buildTree(menus, menu.menuId);
        tree.push({
          ...menu,
          children: children.length > 0 ? children : undefined,
        });
      }
    }

    return tree;
  }

  async findOne(menuId: number): Promise<Menu> {
    const menu = await this.prisma.menu.findUnique({
      where: { menuId },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    return {
      menuId: menu.menuId,
      menuName: menu.menuName,
      parentId: menu.parentId,
      orderNum: menu.orderNum,
      path: menu.path,
      component: menu.component,
      menuType: menu.menuType as any,
      visible: menu.visible,
      status: menu.status,
      perms: menu.perms,
      icon: menu.icon,
      remark: menu.remark,
      createTime: menu.createTime.toISOString(),
      updateTime: menu.updateTime.toISOString(),
    };
  }

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const menu = await this.prisma.menu.create({
      data: createMenuDto,
    });

    return {
      menuId: menu.menuId,
      menuName: menu.menuName,
      parentId: menu.parentId,
      orderNum: menu.orderNum,
      path: menu.path,
      component: menu.component,
      menuType: menu.menuType as any,
      visible: menu.visible,
      status: menu.status,
      perms: menu.perms,
      icon: menu.icon,
      remark: menu.remark,
      createTime: menu.createTime.toISOString(),
      updateTime: menu.updateTime.toISOString(),
    };
  }

  async update(menuId: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const existingMenu = await this.prisma.menu.findUnique({
      where: { menuId },
    });

    if (!existingMenu) {
      throw new NotFoundException('Menu not found');
    }

    // 检查是否将菜单的父级设置为自己或自己的子级
    if (updateMenuDto.parentId === menuId) {
      throw new BadRequestException('Cannot set menu parent to itself');
    }

    const menu = await this.prisma.menu.update({
      where: { menuId },
      data: updateMenuDto,
    });

    return {
      menuId: menu.menuId,
      menuName: menu.menuName,
      parentId: menu.parentId,
      orderNum: menu.orderNum,
      path: menu.path,
      component: menu.component,
      menuType: menu.menuType as any,
      visible: menu.visible,
      status: menu.status,
      perms: menu.perms,
      icon: menu.icon,
      remark: menu.remark,
      createTime: menu.createTime.toISOString(),
      updateTime: menu.updateTime.toISOString(),
    };
  }

  async remove(menuId: number): Promise<void> {
    const menu = await this.prisma.menu.findUnique({
      where: { menuId },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    // 检查是否有子菜单
    const childMenus = await this.prisma.menu.count({
      where: { parentId: menuId },
    });

    if (childMenus > 0) {
      throw new BadRequestException('Cannot delete menu with children');
    }

    await this.prisma.menu.delete({
      where: { menuId },
    });
  }
}

