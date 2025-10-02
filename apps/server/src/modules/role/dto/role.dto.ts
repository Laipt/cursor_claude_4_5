import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @IsString()
  @IsNotEmpty()
  roleKey: string;

  @IsInt()
  roleSort: number;

  @IsInt()
  status: number;

  @IsArray()
  @Type(() => Number)
  menuIds: number[];

  @IsString()
  @IsOptional()
  remark?: string;
}

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @IsString()
  @IsNotEmpty()
  roleKey: string;

  @IsInt()
  roleSort: number;

  @IsInt()
  status: number;

  @IsArray()
  @Type(() => Number)
  menuIds: number[];

  @IsString()
  @IsOptional()
  remark?: string;
}

export class RoleQueryDto {
  @Type(() => Number)
  @IsInt()
  pageNum: number;

  @Type(() => Number)
  @IsInt()
  pageSize: number;

  @IsString()
  @IsOptional()
  roleName?: string;

  @IsString()
  @IsOptional()
  roleKey?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  status?: number;
}

