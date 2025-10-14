import { IsInt, IsOptional, IsArray } from 'class-validator'

export class UpdateProductDto {
  @IsInt()
  id: number

  @IsOptional()
  storeName?: string

  @IsOptional()
  storeInfo?: string

  @IsOptional()
  keyword?: string

  @IsOptional()
  cateId?: string

  @IsOptional()
  image?: string

  @IsOptional()
  sliderImage?: string

  @IsOptional()
  price?: number

  @IsOptional()
  vipPrice?: number

  @IsOptional()
  otPrice?: number

  @IsOptional()
  postage?: number

  @IsOptional()
  unitName?: string

  @IsOptional()
  stock?: number

  @IsOptional()
  isShow?: number

  @IsOptional()
  isPostage?: number

  @IsOptional()
  giveIntegral?: number

  @IsOptional()
  cost?: number

  @IsOptional()
  specType?: number

  @IsOptional()
  @IsArray()
  attrs?: any[]

  @IsOptional()
  @IsArray()
  attrValues?: any[]
}

