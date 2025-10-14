import { IsOptional, IsInt, IsString, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class QueryOrderDto {
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
  @Type(() => Number)
  @IsInt()
  status?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  paid?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  refundStatus?: number

  @IsOptional()
  @IsString()
  payType?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  shippingType?: number

  @IsOptional()
  @IsString()
  startTime?: string

  @IsOptional()
  @IsString()
  endTime?: string
}


