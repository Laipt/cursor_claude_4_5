import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { DictService } from './dict.service';
import {
  CreateDictDto,
  UpdateDictDto,
  DictQueryDto,
  CreateDictDataDto,
  UpdateDictDataDto,
  DictDataQueryDto,
} from './dto/dict.dto';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) {}

  // 字典类型相关接口
  @Get('list')
  @RequirePermissions('system:dict:list')
  findAllDicts(@Query() query: DictQueryDto) {
    return this.dictService.findAllDicts(query);
  }

  @Post()
  @RequirePermissions('system:dict:add')
  createDict(@Body() createDictDto: CreateDictDto) {
    return this.dictService.createDict(createDictDto);
  }

  @Put(':id')
  @RequirePermissions('system:dict:edit')
  updateDict(@Param('id', ParseIntPipe) id: number, @Body() updateDictDto: UpdateDictDto) {
    return this.dictService.updateDict(id, updateDictDto);
  }

  @Delete(':id')
  @RequirePermissions('system:dict:remove')
  removeDict(@Param('id', ParseIntPipe) id: number) {
    return this.dictService.removeDict(id);
  }

  // 字典数据相关接口
  @Get('data/list')
  @RequirePermissions('system:dict:list')
  findAllDictData(@Query() query: DictDataQueryDto) {
    return this.dictService.findAllDictData(query);
  }

  // 根据字典类型获取字典数据（公开接口，用于前端获取字典选项）
  @Get('data/type/:dictType')
  getDictDataByType(@Param('dictType') dictType: string) {
    return this.dictService.getDictDataByType(dictType);
  }

  @Post('data')
  @RequirePermissions('system:dict:add')
  createDictData(@Body() createDictDataDto: CreateDictDataDto) {
    return this.dictService.createDictData(createDictDataDto);
  }

  @Put('data/:dictCode')
  @RequirePermissions('system:dict:edit')
  updateDictData(
    @Param('dictCode', ParseIntPipe) dictCode: number,
    @Body() updateDictDataDto: UpdateDictDataDto,
  ) {
    return this.dictService.updateDictData(dictCode, updateDictDataDto);
  }

  @Delete('data/:dictCode')
  @RequirePermissions('system:dict:remove')
  removeDictData(@Param('dictCode', ParseIntPipe) dictCode: number) {
    return this.dictService.removeDictData(dictCode);
  }
}

