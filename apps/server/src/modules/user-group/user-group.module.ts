import { Module } from '@nestjs/common'
import { UserGroupController } from './user-group.controller'
import { UserGroupService } from './user-group.service'
import { PrismaModule } from '../../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [UserGroupController],
  providers: [UserGroupService],
  exports: [UserGroupService],
})
export class UserGroupModule {}

