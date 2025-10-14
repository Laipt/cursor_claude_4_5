import request from '@/utils/request'
import type {
  ProductListResponse,
  QueryProductDto,
  CreateProductDto,
  UpdateProductDto,
  BatchUpdateProductDto,
  CategoryTreeResponse,
} from '@kk/shared'

// 商品列表
export const getProductList = (params: QueryProductDto) => {
  return request.get<ProductListResponse>('/admin/product/list', { params })
}

// 商品详情
export const getProductDetail = (id: number) => {
  return request.get(`/admin/product/${id}`)
}

// 创建商品
export const createProduct = (data: CreateProductDto) => {
  return request.post('/admin/product', data)
}

// 更新商品
export const updateProduct = (id: number, data: UpdateProductDto) => {
  return request.put(`/admin/product/${id}`, data)
}

// 删除商品
export const deleteProduct = (id: number) => {
  return request.delete(`/admin/product/${id}`)
}

// 更新商品状态
export const updateProductStatus = (id: number, isShow: number) => {
  return request.put(`/admin/product/${id}/status`, { isShow })
}

// 批量操作
export const batchUpdateProduct = (data: BatchUpdateProductDto) => {
  return request.post('/admin/product/batch-update', data)
}

// 分类树
export const getCategoryTree = () => {
  return request.get<CategoryTreeResponse>('/admin/category/tree')
}

// 分类列表
export const getCategoryList = () => {
  return request.get('/admin/category/list')
}

// 创建分类
export const createCategory = (data: any) => {
  return request.post('/admin/category', data)
}

// 更新分类
export const updateCategory = (id: number, data: any) => {
  return request.put(`/admin/category/${id}`, data)
}

// 删除分类
export const deleteCategory = (id: number) => {
  return request.delete(`/admin/category/${id}`)
}


