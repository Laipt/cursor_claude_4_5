import { Module } from '@nestjs/common'
import { UserLevelController } from './user-level.controller'
import { UserLevelService } from './user-level.service'
import { PrismaModule } from '../../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [UserLevelController],
  providers: [UserLevelService],
  exports: [UserLevelService],
})
export class UserLevelModule {}

