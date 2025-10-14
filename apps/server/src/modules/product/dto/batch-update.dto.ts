import { IsArray, IsString, IsIn, IsOptional } from 'class-validator'

export class BatchUpdateProductDto {
  @IsArray()
  ids: number[]

  @IsString()
  @IsIn(['show', 'hide', 'delete', 'category'])
  action: 'show' | 'hide' | 'delete' | 'category'

  @IsOptional()
  value?: any
}


