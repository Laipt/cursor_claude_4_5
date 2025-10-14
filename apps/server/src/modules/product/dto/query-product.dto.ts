import { IsOptional, IsInt, IsString, IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class QueryProductDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 20

  @IsOptional()
  @IsString()
  keyword?: string

  @IsOptional()
  @IsString()
  cateId?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  isShow?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  isHot?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  isBest?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  isNew?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceMin?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceMax?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  stockMin?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  stockMax?: number
}


