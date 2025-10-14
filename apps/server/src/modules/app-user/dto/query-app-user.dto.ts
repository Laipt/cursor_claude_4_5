import { IsOptional, IsInt, IsString, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class QueryAppUserDto {
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
  level?: number

  @IsOptional()
  @IsString()
  groupId?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  isPromoter?: number

  @IsOptional()
  @IsString()
  startTime?: string

  @IsOptional()
  @IsString()
  endTime?: string
}


