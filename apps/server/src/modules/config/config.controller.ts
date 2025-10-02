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
import { ConfigService } from './config.service';
import { CreateConfigDto, UpdateConfigDto, ConfigQueryDto } from './dto/config.dto';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('list')
  @RequirePermissions('system:config:list')
  findAll(@Query() query: ConfigQueryDto) {
    return this.configService.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('system:config:query')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.configService.findOne(id);
  }

  @Post()
  @RequirePermissions('system:config:add')
  create(@Body() createConfigDto: CreateConfigDto) {
    return this.configService.create(createConfigDto);
  }

  @Put(':id')
  @RequirePermissions('system:config:edit')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateConfigDto: UpdateConfigDto) {
    return this.configService.update(id, updateConfigDto);
  }

  @Delete(':id')
  @RequirePermissions('system:config:remove')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.configService.remove(id);
  }
}

