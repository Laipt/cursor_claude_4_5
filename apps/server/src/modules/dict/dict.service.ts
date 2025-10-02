import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateDictDto,
  UpdateDictDto,
  DictQueryDto,
  CreateDictDataDto,
  UpdateDictDataDto,
  DictDataQueryDto,
} from './dto/dict.dto';
import { Dict, DictData, PageResult } from '@admin-system/shared';

@Injectable()
export class DictService {
  constructor(private prisma: PrismaService) {}

  // 字典类型相关方法
  async findAllDicts(query: DictQueryDto): Promise<PageResult<Dict>> {
    const { pageNum, pageSize, dictName, dictType, status } = query;
    const skip = (pageNum - 1) * pageSize;

    const where: any = {};
    if (dictName) {
      where.dictName = { contains: dictName };
    }
    if (dictType) {
      where.dictType = { contains: dictType };
    }
    if (status !== undefined && status !== null) {
      where.status = status;
    }

    const [dicts, total] = await Promise.all([
      this.prisma.dict.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createTime: 'desc' },
      }),
      this.prisma.dict.count({ where }),
    ]);

    const list = dicts.map(dict => ({
      dictId: dict.dictId,
      dictName: dict.dictName,
      dictType: dict.dictType,
      status: dict.status,
      remark: dict.remark,
      createTime: dict.createTime.toISOString(),
      updateTime: dict.updateTime.toISOString(),
    }));

    return {
      list,
      total,
      pageNum,
      pageSize,
    };
  }

  async createDict(createDictDto: CreateDictDto): Promise<Dict> {
    // 检查字典类型是否已存在
    const existingDict = await this.prisma.dict.findUnique({
      where: { dictType: createDictDto.dictType },
    });

    if (existingDict) {
      throw new BadRequestException('Dict type already exists');
    }

    const dict = await this.prisma.dict.create({
      data: createDictDto,
    });

    return {
      dictId: dict.dictId,
      dictName: dict.dictName,
      dictType: dict.dictType,
      status: dict.status,
      remark: dict.remark,
      createTime: dict.createTime.toISOString(),
      updateTime: dict.updateTime.toISOString(),
    };
  }

  async updateDict(dictId: number, updateDictDto: UpdateDictDto): Promise<Dict> {
    const existingDict = await this.prisma.dict.findUnique({
      where: { dictId },
    });

    if (!existingDict) {
      throw new NotFoundException('Dict not found');
    }

    // 检查字典类型是否被其他字典占用
    if (updateDictDto.dictType !== existingDict.dictType) {
      const dictWithSameType = await this.prisma.dict.findUnique({
        where: { dictType: updateDictDto.dictType },
      });

      if (dictWithSameType) {
        throw new BadRequestException('Dict type already exists');
      }
    }

    const dict = await this.prisma.dict.update({
      where: { dictId },
      data: updateDictDto,
    });

    return {
      dictId: dict.dictId,
      dictName: dict.dictName,
      dictType: dict.dictType,
      status: dict.status,
      remark: dict.remark,
      createTime: dict.createTime.toISOString(),
      updateTime: dict.updateTime.toISOString(),
    };
  }

  async removeDict(dictId: number): Promise<void> {
    const dict = await this.prisma.dict.findUnique({
      where: { dictId },
    });

    if (!dict) {
      throw new NotFoundException('Dict not found');
    }

    // 检查是否有字典数据
    const dictDataCount = await this.prisma.dictData.count({
      where: { dictType: dict.dictType },
    });

    if (dictDataCount > 0) {
      throw new BadRequestException('Cannot delete dict type with existing data');
    }

    await this.prisma.dict.delete({
      where: { dictId },
    });
  }

  // 字典数据相关方法
  async findAllDictData(query: DictDataQueryDto): Promise<PageResult<DictData>> {
    const { pageNum, pageSize, dictType, dictLabel, status } = query;
    const skip = (pageNum - 1) * pageSize;

    const where: any = { dictType };
    if (dictLabel) {
      where.dictLabel = { contains: dictLabel };
    }
    if (status !== undefined && status !== null) {
      where.status = status;
    }

    const [dictDataList, total] = await Promise.all([
      this.prisma.dictData.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { dictSort: 'asc' },
      }),
      this.prisma.dictData.count({ where }),
    ]);

    const list = dictDataList.map(data => ({
      dictCode: data.dictCode,
      dictSort: data.dictSort,
      dictLabel: data.dictLabel,
      dictValue: data.dictValue,
      dictType: data.dictType,
      cssClass: data.cssClass,
      listClass: data.listClass,
      isDefault: data.isDefault,
      status: data.status,
      remark: data.remark,
      createTime: data.createTime.toISOString(),
      updateTime: data.updateTime.toISOString(),
    }));

    return {
      list,
      total,
      pageNum,
      pageSize,
    };
  }

  async createDictData(createDictDataDto: CreateDictDataDto): Promise<DictData> {
    const dictData = await this.prisma.dictData.create({
      data: createDictDataDto,
    });

    return {
      dictCode: dictData.dictCode,
      dictSort: dictData.dictSort,
      dictLabel: dictData.dictLabel,
      dictValue: dictData.dictValue,
      dictType: dictData.dictType,
      cssClass: dictData.cssClass,
      listClass: dictData.listClass,
      isDefault: dictData.isDefault,
      status: dictData.status,
      remark: dictData.remark,
      createTime: dictData.createTime.toISOString(),
      updateTime: dictData.updateTime.toISOString(),
    };
  }

  async updateDictData(dictCode: number, updateDictDataDto: UpdateDictDataDto): Promise<DictData> {
    const existingDictData = await this.prisma.dictData.findUnique({
      where: { dictCode },
    });

    if (!existingDictData) {
      throw new NotFoundException('Dict data not found');
    }

    const dictData = await this.prisma.dictData.update({
      where: { dictCode },
      data: updateDictDataDto,
    });

    return {
      dictCode: dictData.dictCode,
      dictSort: dictData.dictSort,
      dictLabel: dictData.dictLabel,
      dictValue: dictData.dictValue,
      dictType: dictData.dictType,
      cssClass: dictData.cssClass,
      listClass: dictData.listClass,
      isDefault: dictData.isDefault,
      status: dictData.status,
      remark: dictData.remark,
      createTime: dictData.createTime.toISOString(),
      updateTime: dictData.updateTime.toISOString(),
    };
  }

  async removeDictData(dictCode: number): Promise<void> {
    const dictData = await this.prisma.dictData.findUnique({
      where: { dictCode },
    });

    if (!dictData) {
      throw new NotFoundException('Dict data not found');
    }

    await this.prisma.dictData.delete({
      where: { dictCode },
    });
  }
}

