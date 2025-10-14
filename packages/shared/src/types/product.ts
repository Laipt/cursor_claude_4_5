// 商品相关类型定义

export interface Product {
  id: number
  image: string
  sliderImage: string
  storeName: string
  storeInfo: string
  keyword: string
  cateId: string
  price: number
  vipPrice: number
  otPrice: number
  postage: number
  unitName: string
  sort: number
  sales: number
  stock: number
  isShow: number
  isHot: number
  isBenefit: number
  isBest: number
  isNew: number
  isPostage: number
  giveIntegral: number
  cost: number
  ficti: number
  browse: number
  specType: number
  isRecycle: number
}

export interface ProductAttr {
  id: number
  productId: number
  attrName: string
  attrValues: string
  type: number
}

export interface ProductAttrValue {
  id: number
  productId: number
  suk: string
  stock: number
  sales: number
  price: number
  image: string | null
  unique: string
  cost: number
  barCode: string
  otPrice: number
  weight: number
  volume: number
}

export interface Category {
  id: number
  pid: number
  path: string
  name: string
  type: number
  status: number
  sort: number
  children?: Category[]
}

export interface ProductReply {
  id: number
  uid: number
  productId: number
  productScore: number
  serviceScore: number
  comment: string
  pics: string
  createTime: Date
  merchantReplyContent: string | null
  merchantReplyTime: Date | null
  isReply: number
}

export interface QueryProductDto {
  page: number
  pageSize: number
  keyword?: string
  cateId?: string
  isShow?: number
  isHot?: number
  isBest?: number
  isNew?: number
  priceMin?: number
  priceMax?: number
  stockMin?: number
  stockMax?: number
}

export interface CreateProductDto {
  storeName: string
  storeInfo: string
  keyword: string
  cateId: string
  image: string
  sliderImage: string
  price: number
  vipPrice: number
  otPrice: number
  postage: number
  unitName: string
  stock: number
  isShow: number
  isPostage: number
  giveIntegral: number
  cost: number
  specType: number
  attrs?: ProductAttr[]
  attrValues?: Omit<ProductAttrValue, 'id' | 'productId'>[]
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  id: number
}

export interface BatchUpdateProductDto {
  ids: number[]
  action: 'show' | 'hide' | 'delete' | 'category'
  value?: any
}

export interface ProductListResponse {
  total: number
  list: Product[]
}

export interface CategoryTreeResponse {
  list: Category[]
}


