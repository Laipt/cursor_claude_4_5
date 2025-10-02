import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateConfigDto, UpdateConfigDto, ConfigQueryDto } from './dto/config.dto';
import { Config, PageResult } from '@admin-system/shared';

@Injectable()
export class ConfigService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ConfigQueryDto): Promise<PageResult<Config>> {
    const { pageNum, pageSize, configName, configKey, configType } = query;
    const skip = (pageNum - 1) * pageSize;

    const where: any = {};
    if (configName) {
      where.configName = { contains: configName };
    }
    if (configKey) {
      where.configKey = { contains: configKey };
    }
    if (configType) {
      where.configType = configType;
    }

    const [configs, total] = await Promise.all([
      this.prisma.config.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createTime: 'desc' },
      }),
      this.prisma.config.count({ where }),
    ]);

    const list = configs.map(config => ({
      configId: config.configId,
      configName: config.configName,
      configKey: config.configKey,
      configValue: config.configValue,
      configType: config.configType,
      remark: config.remark,
      createTime: config.createTime.toISOString(),
      updateTime: config.updateTime.toISOString(),
    }));

    return {
      list,
      total,
      pageNum,
      pageSize,
    };
  }

  async findOne(configId: number): Promise<Config> {
    const config = await this.prisma.config.findUnique({
      where: { configId },
    });

    if (!config) {
      throw new NotFoundException('Config not found');
    }

    return {
      configId: config.configId,
      configName: config.configName,
      configKey: config.configKey,
      configValue: config.configValue,
      configType: config.configType,
      remark: config.remark,
      createTime: config.createTime.toISOString(),
      updateTime: config.updateTime.toISOString(),
    };
  }

  async create(createConfigDto: CreateConfigDto): Promise<Config> {
    // 检查配置键是否已存在
    const existingConfig = await this.prisma.config.findUnique({
      where: { configKey: createConfigDto.configKey },
    });

    if (existingConfig) {
      throw new BadRequestException('Config key already exists');
    }

    const config = await this.prisma.config.create({
      data: createConfigDto,
    });

    return {
      configId: config.configId,
      configName: config.configName,
      configKey: config.configKey,
      configValue: config.configValue,
      configType: config.configType,
      remark: config.remark,
      createTime: config.createTime.toISOString(),
      updateTime: config.updateTime.toISOString(),
    };
  }

  async update(configId: number, updateConfigDto: UpdateConfigDto): Promise<Config> {
    const existingConfig = await this.prisma.config.findUnique({
      where: { configId },
    });

    if (!existingConfig) {
      throw new NotFoundException('Config not found');
    }

    // 检查配置键是否被其他配置占用
    if (updateConfigDto.configKey !== existingConfig.configKey) {
      const configWithSameKey = await this.prisma.config.findUnique({
        where: { configKey: updateConfigDto.configKey },
      });

      if (configWithSameKey) {
        throw new BadRequestException('Config key already exists');
      }
    }

    const config = await this.prisma.config.update({
      where: { configId },
      data: updateConfigDto,
    });

    return {
      configId: config.configId,
      configName: config.configName,
      configKey: config.configKey,
      configValue: config.configValue,
      configType: config.configType,
      remark: config.remark,
      createTime: config.createTime.toISOString(),
      updateTime: config.updateTime.toISOString(),
    };
  }

  async remove(configId: number): Promise<void> {
    const config = await this.prisma.config.findUnique({
      where: { configId },
    });

    if (!config) {
      throw new NotFoundException('Config not found');
    }

    await this.prisma.config.delete({
      where: { configId },
    });
  }
}

