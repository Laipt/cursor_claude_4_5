import { IsInt, IsString } from 'class-validator'

export class UpdateRemarkDto {
  @IsInt()
  orderId: number

  @IsString()
  remark: string
}


