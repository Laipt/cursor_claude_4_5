import { Controller, Get, Post, Put, Delete, Body, Query, Param, UseGuards } from '@nestjs/common'
import { ProductService } from './product.service'
import { QueryProductDto } from './dto/query-product.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { BatchUpdateProductDto } from './dto/batch-update.dto'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'

@Controller('admin/product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  async getList(@Query() query: QueryProductDto) {
    return this.productService.findAll(query)
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.productService.findOne(+id)
  }

  @Post()
  async create(@Body() createDto: CreateProductDto) {
    return this.productService.create(createDto)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateProductDto) {
    updateDto.id = +id
    return this.productService.update(updateDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(+id)
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('isShow') isShow: number) {
    return this.productService.updateStatus(+id, isShow)
  }

  @Post('batch-update')
  async batchUpdate(@Body() batchDto: BatchUpdateProductDto) {
    return this.productService.batchUpdate(batchDto)
  }
}


