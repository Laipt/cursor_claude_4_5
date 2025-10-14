import { IsInt, IsString, IsIn } from 'class-validator'

export class DeliveryDto {
  @IsInt()
  orderId: number

  @IsString()
  deliveryName: string

  @IsString()
  deliveryId: string

  @IsString()
  @IsIn(['express', 'send', 'fictitious'])
  deliveryType: 'express' | 'send' | 'fictitious'
}


