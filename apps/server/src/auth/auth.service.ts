import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { User } from '@admin-system/shared';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // 查找用户
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // 检查用户状态
    if (user.status === 0) {
      throw new UnauthorizedException('User account is disabled');
    }

    // 生成 JWT token
    const payload = { userId: user.userId, username: user.username };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async getUserInfo(userId: number): Promise<User> {
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
      throw new UnauthorizedException('User not found');
    }

    // 提取角色信息
    const roles = user.userRoles
      .filter(ur => ur.role.status === 1)
      .map(ur => ur.role.roleName);

    const roleIds = user.userRoles
      .filter(ur => ur.role.status === 1)
      .map(ur => ur.role.roleId);

    // 提取权限信息
    const permissionsSet = new Set<string>();
    user.userRoles.forEach(ur => {
      if (ur.role.status === 1) {
        ur.role.roleMenus.forEach(rm => {
          if (rm.menu.perms && rm.menu.status === 1) {
            permissionsSet.add(rm.menu.perms);
          }
        });
      }
    });

    const permissions = Array.from(permissionsSet);

    // 返回用户信息
    return {
      userId: user.userId,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      status: user.status,
      roleIds,
      roles,
      permissions,
      createTime: user.createTime.toISOString(),
      updateTime: user.updateTime.toISOString(),
    };
  }

  async logout() {
    // 在实际应用中，这里可以将 token 加入黑名单
    // 目前简单返回成功
    return { message: 'Logout successful' };
  }
}

