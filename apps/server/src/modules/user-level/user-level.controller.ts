import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { UserLevelService } from './user-level.service'

@Controller('user-level')
@UseGuards(JwtAuthGuard)
export class UserLevelController {
  constructor(private readonly userLevelService: UserLevelService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.userLevelService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLevelService.findOne(+id)
  }

  @Post()
  create(@Body() data: any) {
    return this.userLevelService.create(data)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.userLevelService.update(+id, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLevelService.remove(+id)
  }
}

