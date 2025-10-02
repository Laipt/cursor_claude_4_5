import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum } from 'class-validator';

export enum MenuTypeEnum {
  DIRECTORY = 'M',
  MENU = 'C',
  BUTTON = 'F',
}

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  menuName: string;

  @IsInt()
  parentId: number;

  @IsInt()
  orderNum: number;

  @IsString()
  @IsOptional()
  path?: string;

  @IsString()
  @IsOptional()
  component?: string;

  @IsEnum(MenuTypeEnum)
  menuType: MenuTypeEnum;

  @IsInt()
  visible: number;

  @IsInt()
  status: number;

  @IsString()
  @IsOptional()
  perms?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  remark?: string;
}

export class UpdateMenuDto {
  @IsString()
  @IsNotEmpty()
  menuName: string;

  @IsInt()
  parentId: number;

  @IsInt()
  orderNum: number;

  @IsString()
  @IsOptional()
  path?: string;

  @IsString()
  @IsOptional()
  component?: string;

  @IsEnum(MenuTypeEnum)
  menuType: MenuTypeEnum;

  @IsInt()
  visible: number;

  @IsInt()
  status: number;

  @IsString()
  @IsOptional()
  perms?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  remark?: string;
}

