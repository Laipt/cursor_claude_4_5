import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { UserTagService } from './user-tag.service'

@Controller('user-tag')
@UseGuards(JwtAuthGuard)
export class UserTagController {
  constructor(private readonly userTagService: UserTagService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.userTagService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTagService.findOne(+id)
  }

  @Post()
  create(@Body() data: any) {
    return this.userTagService.create(data)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.userTagService.update(+id, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTagService.remove(+id)
  }
}

