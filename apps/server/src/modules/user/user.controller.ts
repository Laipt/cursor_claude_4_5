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
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserQueryDto, ResetPasswordDto, BatchDeleteDto } from './dto/user.dto';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @RequirePermissions('system:user:list')
  findAll(@Query() query: UserQueryDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @RequirePermissions('system:user:query')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  @RequirePermissions('system:user:add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @RequirePermissions('system:user:edit')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @RequirePermissions('system:user:remove')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  @Delete('batch')
  @RequirePermissions('system:user:remove')
  batchRemove(@Body() batchDeleteDto: BatchDeleteDto) {
    return this.userService.batchRemove(batchDeleteDto.userIds);
  }

  @Put(':id/password')
  @RequirePermissions('system:user:resetPwd')
  resetPassword(@Param('id', ParseIntPipe) id: number, @Body() resetPasswordDto: ResetPasswordDto) {
    return this.userService.resetPassword(id, resetPasswordDto);
  }
}

