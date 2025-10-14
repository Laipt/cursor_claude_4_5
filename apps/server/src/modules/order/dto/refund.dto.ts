import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class RefundDto {
  @IsInt()
  orderId: number

  @IsNumber()
  @Min(0)
  refundPrice: number

  @IsOptional()
  @IsString()
  refundReason?: string
}


