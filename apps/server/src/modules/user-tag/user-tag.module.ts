import { Module } from '@nestjs/common'
import { UserTagController } from './user-tag.controller'
import { UserTagService } from './user-tag.service'
import { PrismaModule } from '../../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [UserTagController],
  providers: [UserTagService],
  exports: [UserTagService],
})
export class UserTagModule {}

