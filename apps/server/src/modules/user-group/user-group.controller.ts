import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { UserGroupService } from './user-group.service'

@Controller('user-group')
@UseGuards(JwtAuthGuard)
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.userGroupService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGroupService.findOne(+id)
  }

  @Post()
  create(@Body() data: any) {
    return this.userGroupService.create(data)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.userGroupService.update(+id, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGroupService.remove(+id)
  }
}

