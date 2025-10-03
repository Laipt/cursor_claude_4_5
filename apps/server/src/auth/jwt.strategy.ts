import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../common/decorators/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    });
  }

  async validate(payload: any): Promise<JwtPayload> {
    if (!payload || !payload.userId) {
      throw new UnauthorizedException('Invalid token');
    }

    // 检查用户是否存在
    const user = await this.prisma.user.findUnique({
      where: { userId: payload.userId },
      select: { passwordChangedAt: true, status: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // 检查用户状态
    if (user.status === 0) {
      throw new UnauthorizedException('User account is disabled');
    }

    // 检查密码是否在 token 签发后被修改过
    if (user.passwordChangedAt) {
      const tokenIssuedAt = new Date(payload.iat * 1000); // JWT iat 是秒级时间戳
      const passwordChangedAt = new Date(user.passwordChangedAt);
      
      if (passwordChangedAt > tokenIssuedAt) {
        throw new UnauthorizedException('Password has been changed, please login again');
      }
    }

    return { userId: payload.userId, username: payload.username };
  }
}

