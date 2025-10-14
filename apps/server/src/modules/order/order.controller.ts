import { Controller, Get, Post, Put, Body, Query, Param, UseGuards } from '@nestjs/common'
import { OrderService } from './order.service'
import { QueryOrderDto } from './dto/query-order.dto'
import { DeliveryDto } from './dto/delivery.dto'
import { RefundDto } from './dto/refund.dto'
import { UpdateRemarkDto } from './dto/update-remark.dto'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'

@Controller('admin/order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('list')
  async getList(@Query() query: QueryOrderDto) {
    return this.orderService.findAll(query)
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.orderService.findOne(+id)
  }

  @Post(':id/delivery')
  async delivery(@Param('id') id: string, @Body() deliveryDto: DeliveryDto) {
    deliveryDto.orderId = +id
    return this.orderService.delivery(deliveryDto)
  }

  @Post(':id/refund')
  async refund(@Param('id') id: string, @Body() refundDto: RefundDto) {
    refundDto.orderId = +id
    return this.orderService.refund(refundDto)
  }

  @Put(':id/remark')
  async updateRemark(@Param('id') id: string, @Body() updateDto: UpdateRemarkDto) {
    updateDto.orderId = +id
    return this.orderService.updateRemark(updateDto)
  }

  @Get('statistics/overview')
  async statistics() {
    return this.orderService.statistics()
  }
}


