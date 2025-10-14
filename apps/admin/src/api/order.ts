import request from '@/utils/request'
import type {
  OrderListResponse,
  QueryOrderDto,
  DeliveryDto,
  RefundDto,
  UpdateRemarkDto,
  OrderStatistics,
  OrderDetail,
} from '@kk/shared'

// 订单列表
export const getOrderList = (params: QueryOrderDto) => {
  return request.get<OrderListResponse>('/admin/order/list', { params })
}

// 订单详情
export const getOrderDetail = (id: number) => {
  return request.get<OrderDetail>(`/admin/order/${id}`)
}

// 发货
export const deliveryOrder = (id: number, data: DeliveryDto) => {
  return request.post(`/admin/order/${id}/delivery`, data)
}

// 退款
export const refundOrder = (id: number, data: RefundDto) => {
  return request.post(`/admin/order/${id}/refund`, data)
}

// 更新备注
export const updateOrderRemark = (id: number, data: UpdateRemarkDto) => {
  return request.put(`/admin/order/${id}/remark`, data)
}

// 订单统计
export const getOrderStatistics = () => {
  return request.get<OrderStatistics>('/admin/order/statistics/overview')
}


