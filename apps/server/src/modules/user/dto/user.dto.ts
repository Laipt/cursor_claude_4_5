import { IsString, IsNotEmpty, IsOptional, IsEmail, IsInt, IsArray, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsInt()
  status: number;

  @IsArray()
  @Type(() => Number)
  roleIds: number[];
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsInt()
  status: number;

  @IsArray()
  @Type(() => Number)
  roleIds: number[];
}

export class UserQueryDto {
  @Type(() => Number)
  @IsInt()
  pageNum: number;

  @Type(() => Number)
  @IsInt()
  pageSize: number;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  status?: number;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class BatchDeleteDto {
  @IsArray()
  @Type(() => Number)
  userIds: number[];
}

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}

