import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../../common/decorators/permissions.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // 获取用户的角色和权限
    const userWithRoles = await this.prisma.user.findUnique({
      where: { userId: user.userId },
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

    if (!userWithRoles) {
      throw new ForbiddenException('User not found');
    }

    // 检查是否是管理员
    const isAdmin = userWithRoles.userRoles.some(
      ur => ur.role.roleKey === 'admin' && ur.role.status === 1,
    );

    if (isAdmin) {
      return true; // 管理员拥有所有权限
    }

    // 收集用户的所有权限
    const userPermissions = new Set<string>();
    userWithRoles.userRoles.forEach(ur => {
      if (ur.role.status === 1) {
        ur.role.roleMenus.forEach(rm => {
          if (rm.menu.perms && rm.menu.status === 1) {
            userPermissions.add(rm.menu.perms);
          }
        });
      }
    });

    // 检查是否拥有所需权限
    const hasPermission = requiredPermissions.some(permission =>
      userPermissions.has(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}

