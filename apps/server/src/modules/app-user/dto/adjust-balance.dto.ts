import { IsInt, IsString, IsIn, IsNumber, Min } from 'class-validator'

export class AdjustBalanceDto {
  @IsInt()
  uid: number

  @IsString()
  @IsIn(['money', 'integral'])
  type: 'money' | 'integral'

  @IsString()
  @IsIn(['add', 'subtract'])
  action: 'add' | 'subtract'

  @IsNumber()
  @Min(0)
  amount: number

  @IsString()
  remark: string
}


