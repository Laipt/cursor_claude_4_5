import { IsOptional, IsInt, IsString } from 'class-validator'

export class UpdateAppUserDto {
  @IsInt()
  uid: number

  @IsOptional()
  @IsString()
  nickname?: string

  @IsOptional()
  @IsString()
  realName?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsInt()
  status?: number

  @IsOptional()
  @IsString()
  groupId?: string

  @IsOptional()
  @IsString()
  tagId?: string

  @IsOptional()
  @IsString()
  mark?: string
}


