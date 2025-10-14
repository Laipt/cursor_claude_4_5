import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { MenuModule } from './modules/menu/menu.module';
import { DictModule } from './modules/dict/dict.module';
import { ConfigModule } from './modules/config/config.module';
import { AppUserModule } from './modules/app-user/app-user.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { UserTagModule } from './modules/user-tag/user-tag.module';
import { UserLevelModule } from './modules/user-level/user-level.module';
import { UserGroupModule } from './modules/user-group/user-group.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    RoleModule,
    MenuModule,
    DictModule,
    ConfigModule,
    AppUserModule,
    ProductModule,
    OrderModule,
    UserTagModule,
    UserLevelModule,
    UserGroupModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

