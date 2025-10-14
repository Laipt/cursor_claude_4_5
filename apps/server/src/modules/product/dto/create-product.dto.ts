import { IsString, IsNumber, IsInt, IsOptional, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class AttrDto {
  @IsString()
  attrName: string

  @IsString()
  attrValues: string
}

class AttrValueDto {
  @IsString()
  suk: string

  @IsInt()
  stock: number

  @IsNumber()
  price: number

  @IsOptional()
  @IsString()
  image?: string

  @IsOptional()
  @IsNumber()
  cost?: number

  @IsOptional()
  @IsString()
  barCode?: string

  @IsOptional()
  @IsNumber()
  otPrice?: number

  @IsOptional()
  @IsNumber()
  weight?: number

  @IsOptional()
  @IsNumber()
  volume?: number
}

export class CreateProductDto {
  @IsString()
  storeName: string

  @IsString()
  storeInfo: string

  @IsString()
  keyword: string

  @IsString()
  cateId: string

  @IsString()
  image: string

  @IsString()
  sliderImage: string

  @IsNumber()
  price: number

  @IsNumber()
  vipPrice: number

  @IsNumber()
  otPrice: number

  @IsNumber()
  postage: number

  @IsString()
  unitName: string

  @IsInt()
  stock: number

  @IsOptional()
  @IsInt()
  isShow?: number

  @IsOptional()
  @IsInt()
  isPostage?: number

  @IsOptional()
  @IsInt()
  giveIntegral?: number

  @IsOptional()
  @IsNumber()
  cost?: number

  @IsOptional()
  @IsInt()
  specType?: number

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttrDto)
  attrs?: AttrDto[]

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttrValueDto)
  attrValues?: AttrValueDto[]
}


