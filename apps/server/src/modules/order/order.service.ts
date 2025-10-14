import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { QueryOrderDto } from './dto/query-order.dto'
import { DeliveryDto } from './dto/delivery.dto'
import { RefundDto } from './dto/refund.dto'
import { UpdateRemarkDto } from './dto/update-remark.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryOrderDto) {
    const { page, pageSize, keyword, status, paid, refundStatus, payType, shippingType, startTime, endTime } = query

    const where: Prisma.OrderWhereInput = {
      isSystemDel: 0,
    }

    // 关键词搜索（订单号、手机号、姓名）
    if (keyword) {
      where.OR = [
        { orderId: { contains: keyword } },
        { userPhone: { contains: keyword } },
        { realName: { contains: keyword } },
      ]
    }

    // 订单状态筛选
    if (status !== undefined) {
      where.status = status
    }

    // 支付状态筛选
    if (paid !== undefined) {
      where.paid = paid
    }

    // 退款状态筛选
    if (refundStatus !== undefined) {
      where.refundStatus = refundStatus
    }

    // 支付方式筛选
    if (payType) {
      where.payType = payType
    }

    // 配送方式筛选
    if (shippingType !== undefined) {
      where.shippingType = shippingType
    }

    // 时间范围筛选
    if (startTime && endTime) {
      where.createTime = {
        gte: new Date(startTime),
        lte: new Date(endTime),
      }
    }

    const total = await this.prisma.order.count({ where })

    const list = await this.prisma.order.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createTime: 'desc' },
    })

    return {
      total,
      list,
    }
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderInfos: true,
        orderStatus: {
          orderBy: { createTime: 'desc' },
        },
        user: {
          select: {
            nickname: true,
            avatar: true,
            phone: true,
          },
        },
      },
    })

    return order
  }

  async delivery(deliveryDto: DeliveryDto) {
    const { orderId, deliveryName, deliveryId, deliveryType } = deliveryDto

    // 更新订单发货信息
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        deliveryName,
        deliveryId,
        deliveryType,
        status: 1, // 待收货
      },
    })

    // 添加订单状态记录
    await this.prisma.orderStatus.create({
      data: {
        oid: orderId,
        changeType: 'express',
        changeMessage: `已发货 快递公司：${deliveryName}, 快递单号：${deliveryId}`,
      },
    })

    return order
  }

  async refund(refundDto: RefundDto) {
    const { orderId, refundPrice, refundReason } = refundDto

    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        refundStatus: 2, // 已退款
        refundPrice,
        refundReason,
        refundReasonTime: new Date(),
      },
    })

    // 添加订单状态记录
    await this.prisma.orderStatus.create({
      data: {
        oid: orderId,
        changeType: 'refund',
        changeMessage: `退款成功，退款金额：${refundPrice}`,
      },
    })

    // TODO: 这里应该调用支付接口进行实际退款操作
    // TODO: 退款成功后返还用户积分/余额等

    return order
  }

  async updateRemark(updateDto: UpdateRemarkDto) {
    const { orderId, remark } = updateDto

    return this.prisma.order.update({
      where: { id: orderId },
      data: { remark },
    })
  }

  async statistics() {
    // 总订单数和总金额
    const totalOrders = await this.prisma.order.count({
      where: { isSystemDel: 0 },
    })

    const totalAmount = await this.prisma.order.aggregate({
      where: { isSystemDel: 0 },
      _sum: { payPrice: true },
    })

    // 已支付订单数和金额
    const paidOrders = await this.prisma.order.count({
      where: { paid: 1, isSystemDel: 0 },
    })

    const paidAmount = await this.prisma.order.aggregate({
      where: { paid: 1, isSystemDel: 0 },
      _sum: { payPrice: true },
    })

    // 退款订单数和金额
    const refundOrders = await this.prisma.order.count({
      where: { refundStatus: 2, isSystemDel: 0 },
    })

    const refundAmount = await this.prisma.order.aggregate({
      where: { refundStatus: 2, isSystemDel: 0 },
      _sum: { refundPrice: true },
    })

    // 今日订单数和金额
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const todayOrders = await this.prisma.order.count({
      where: {
        createTime: { gte: todayStart },
        isSystemDel: 0,
      },
    })

    const todayAmount = await this.prisma.order.aggregate({
      where: {
        createTime: { gte: todayStart },
        paid: 1,
        isSystemDel: 0,
      },
      _sum: { payPrice: true },
    })

    return {
      totalOrders,
      totalAmount: Number(totalAmount._sum.payPrice || 0),
      paidOrders,
      paidAmount: Number(paidAmount._sum.payPrice || 0),
      refundOrders,
      refundAmount: Number(refundAmount._sum.refundPrice || 0),
      todayOrders,
      todayAmount: Number(todayAmount._sum.payPrice || 0),
    }
  }
}


