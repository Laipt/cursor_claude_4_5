// 订单相关类型定义

export interface Order {
  id: number
  orderId: string
  uid: number
  realName: string
  userPhone: string
  userAddress: string
  totalNum: number
  totalPrice: number
  payPrice: number
  couponPrice: number
  paid: number
  payTime: Date | null
  payType: string
  createTime: Date
  status: number
  refundStatus: number
  refundPrice: number
  deliveryName: string | null
  deliveryType: string | null
  deliveryId: string | null
  gainIntegral: number
  useIntegral: number
  mark: string
  remark: string | null
  verifyCode: string
  shippingType: number
}

export interface OrderInfo {
  id: number
  orderId: number
  productId: number
  productName: string
  image: string
  sku: string
  price: number
  payNum: number
  giveIntegral: number
  isReply: number
}

export interface OrderStatus {
  id: number
  oid: number
  changeType: string
  changeMessage: string
  createTime: Date
}

export interface OrderDetail extends Order {
  orderInfos: OrderInfo[]
  orderStatus: OrderStatus[]
  user?: {
    nickname: string
    avatar: string
    phone: string
  }
}

export interface QueryOrderDto {
  page: number
  pageSize: number
  keyword?: string // 订单号/用户手机/姓名
  status?: number
  paid?: number
  refundStatus?: number
  payType?: string
  shippingType?: number
  startTime?: string
  endTime?: string
}

export interface DeliveryDto {
  orderId: number
  deliveryName: string
  deliveryId: string
  deliveryType: 'express' | 'send' | 'fictitious'
}

export interface RefundDto {
  orderId: number
  refundPrice: number
  refundReason?: string
}

export interface UpdateRemarkDto {
  orderId: number
  remark: string
}

export interface OrderStatistics {
  totalOrders: number
  totalAmount: number
  paidOrders: number
  paidAmount: number
  refundOrders: number
  refundAmount: number
  todayOrders: number
  todayAmount: number
}

export interface OrderListResponse {
  total: number
  list: Order[]
}

// 订单状态枚举
// 注意：订单状态、支付状态、退款状态等枚举已移至 @kk/shared/constants.ts
// 请使用：OrderStatus, PayStatus, RefundStatus

// 配送方式枚举
export enum ShippingTypeEnum {
  EXPRESS = 1,    // 快递
  SELF_PICKUP = 2, // 自提
}


