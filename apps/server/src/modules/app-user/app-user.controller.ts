import { Controller, Get, Put, Post, Body, Query, Param, UseGuards } from '@nestjs/common'
import { AppUserService } from './app-user.service'
import { QueryAppUserDto } from './dto/query-app-user.dto'
import { UpdateAppUserDto } from './dto/update-app-user.dto'
import { AdjustBalanceDto } from './dto/adjust-balance.dto'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'

@Controller('admin/app-user')
@UseGuards(JwtAuthGuard)
export class AppUserController {
  constructor(private readonly appUserService: AppUserService) {}

  @Get('list')
  async getList(@Query() query: QueryAppUserDto) {
    return this.appUserService.findAll(query)
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.appUserService.findOne(+id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateAppUserDto) {
    updateDto.uid = +id
    return this.appUserService.update(updateDto)
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: number) {
    return this.appUserService.updateStatus(+id, status)
  }

  @Post('adjust-balance')
  async adjustBalance(@Body() adjustDto: AdjustBalanceDto) {
    return this.appUserService.adjustBalance(adjustDto)
  }

  @Get('tags/list')
  async getTags() {
    return this.appUserService.getTags()
  }

  @Get('groups/list')
  async getGroups() {
    return this.appUserService.getGroups()
  }

  @Post('tags')
  async createTag(@Body('tagName') tagName: string) {
    return this.appUserService.createTag(tagName)
  }

  @Post('groups')
  async createGroup(@Body('groupName') groupName: string) {
    return this.appUserService.createGroup(groupName)
  }
}


