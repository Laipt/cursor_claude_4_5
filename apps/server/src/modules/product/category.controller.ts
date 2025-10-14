import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'

@Controller('admin/category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('tree')
  async getTree() {
    return this.categoryService.getTree()
  }

  @Get('list')
  async getList() {
    return this.categoryService.findAll()
  }

  @Post()
  async create(@Body() data: any) {
    return this.categoryService.create(data)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.categoryService.update(+id, data)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(+id)
  }
}


