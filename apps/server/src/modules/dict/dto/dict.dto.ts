import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDictDto {
  @IsString()
  @IsNotEmpty()
  dictName: string;

  @IsString()
  @IsNotEmpty()
  dictType: string;

  @IsInt()
  status: number;

  @IsString()
  @IsOptional()
  remark?: string;
}

export class UpdateDictDto {
  @IsString()
  @IsNotEmpty()
  dictName: string;

  @IsString()
  @IsNotEmpty()
  dictType: string;

  @IsInt()
  status: number;

  @IsString()
  @IsOptional()
  remark?: string;
}

export class DictQueryDto {
  @Type(() => Number)
  @IsInt()
  pageNum: number;

  @Type(() => Number)
  @IsInt()
  pageSize: number;

  @IsString()
  @IsOptional()
  dictName?: string;

  @IsString()
  @IsOptional()
  dictType?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  status?: number;
}

export class CreateDictDataDto {
  @IsInt()
  dictSort: number;

  @IsString()
  @IsNotEmpty()
  dictLabel: string;

  @IsString()
  @IsNotEmpty()
  dictValue: string;

  @IsString()
  @IsNotEmpty()
  dictType: string;

  @IsString()
  @IsOptional()
  cssClass?: string;

  @IsString()
  @IsOptional()
  listClass?: string;

  @IsInt()
  isDefault: number;

  @IsInt()
  status: number;

  @IsString()
  @IsOptional()
  remark?: string;
}

export class UpdateDictDataDto {
  @IsInt()
  dictSort: number;

  @IsString()
  @IsNotEmpty()
  dictLabel: string;

  @IsString()
  @IsNotEmpty()
  dictValue: string;

  @IsString()
  @IsNotEmpty()
  dictType: string;

  @IsString()
  @IsOptional()
  cssClass?: string;

  @IsString()
  @IsOptional()
  listClass?: string;

  @IsInt()
  isDefault: number;

  @IsInt()
  status: number;

  @IsString()
  @IsOptional()
  remark?: string;
}

export class DictDataQueryDto {
  @Type(() => Number)
  @IsInt()
  pageNum: number;

  @Type(() => Number)
  @IsInt()
  pageSize: number;

  @IsString()
  @IsNotEmpty()
  dictType: string;

  @IsString()
  @IsOptional()
  dictLabel?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  status?: number;
}

