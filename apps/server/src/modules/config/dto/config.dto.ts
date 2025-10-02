import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConfigDto {
  @IsString()
  @IsNotEmpty()
  configName: string;

  @IsString()
  @IsNotEmpty()
  configKey: string;

  @IsString()
  @IsNotEmpty()
  configValue: string;

  @IsString()
  @IsNotEmpty()
  configType: string;

  @IsString()
  @IsOptional()
  remark?: string;
}

export class UpdateConfigDto {
  @IsString()
  @IsNotEmpty()
  configName: string;

  @IsString()
  @IsNotEmpty()
  configKey: string;

  @IsString()
  @IsNotEmpty()
  configValue: string;

  @IsString()
  @IsNotEmpty()
  configType: string;

  @IsString()
  @IsOptional()
  remark?: string;
}

export class ConfigQueryDto {
  @Type(() => Number)
  @IsInt()
  pageNum: number;

  @Type(() => Number)
  @IsInt()
  pageSize: number;

  @IsString()
  @IsOptional()
  configName?: string;

  @IsString()
  @IsOptional()
  configKey?: string;

  @IsString()
  @IsOptional()
  configType?: string;
}

