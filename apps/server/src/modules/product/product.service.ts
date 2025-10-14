import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { QueryProductDto } from './dto/query-product.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { BatchUpdateProductDto } from './dto/batch-update.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryProductDto) {
    const {
      page,
      pageSize,
      keyword,
      cateId,
      isShow,
      isHot,
      isBest,
      isNew,
      priceMin,
      priceMax,
      stockMin,
      stockMax,
    } = query

    const where: Prisma.ProductWhereInput = {
      isDel: 0, // 未删除
    }

    // 关键词搜索
    if (keyword) {
      where.OR = [
        { storeName: { contains: keyword } },
        { keyword: { contains: keyword } },
      ]
    }

    // 分类筛选
    if (cateId) {
      where.cateId = { contains: cateId }
    }

    // 状态筛选
    if (isShow !== undefined) {
      where.isShow = isShow
    }

    if (isHot !== undefined) {
      where.isHot = isHot
    }

    if (isBest !== undefined) {
      where.isBest = isBest
    }

    if (isNew !== undefined) {
      where.isNew = isNew
    }

    // 价格范围
    if (priceMin !== undefined || priceMax !== undefined) {
      where.price = {}
      if (priceMin !== undefined) {
        where.price.gte = priceMin
      }
      if (priceMax !== undefined) {
        where.price.lte = priceMax
      }
    }

    // 库存范围
    if (stockMin !== undefined || stockMax !== undefined) {
      where.stock = {}
      if (stockMin !== undefined) {
        where.stock.gte = stockMin
      }
      if (stockMax !== undefined) {
        where.stock.lte = stockMax
      }
    }

    const total = await this.prisma.product.count({ where })

    const list = await this.prisma.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { addTime: 'desc' },
    })

    return {
      total,
      list,
    }
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        attrs: {
          where: { isDel: 0 },
        },
        attrValues: {
          where: { isDel: 0 },
        },
      },
    })

    return product
  }

  async create(createDto: CreateProductDto) {
    const { attrs, attrValues, ...productData } = createDto

    const product = await this.prisma.product.create({
      data: {
        ...productData,
        addTime: Math.floor(Date.now() / 1000),
      },
    })

    // 如果有规格，创建规格数据
    if (attrs && attrs.length > 0) {
      await this.prisma.productAttr.createMany({
        data: attrs.map((attr) => ({
          productId: product.id,
          attrName: attr.attrName,
          attrValues: attr.attrValues,
          type: 0,
        })),
      })
    }

    // 如果有SKU，创建SKU数据
    if (attrValues && attrValues.length > 0) {
      await this.prisma.productAttrValue.createMany({
        data: attrValues.map((attrValue) => ({
          productId: product.id,
          ...attrValue,
          unique: this.generateUnique(),
        })),
      })
    }

    return product
  }

  async update(updateDto: UpdateProductDto) {
    const { id, attrs, attrValues, ...productData } = updateDto

    // 更新商品基本信息
    const product = await this.prisma.product.update({
      where: { id },
      data: productData,
    })

    // 如果有规格更新
    if (attrs) {
      // 标记旧规格为删除
      await this.prisma.productAttr.updateMany({
        where: { productId: id },
        data: { isDel: 1 },
      })

      // 创建新规格
      await this.prisma.productAttr.createMany({
        data: attrs.map((attr) => ({
          productId: id,
          attrName: attr.attrName,
          attrValues: attr.attrValues,
          type: 0,
        })),
      })
    }

    // 如果有SKU更新
    if (attrValues) {
      // 标记旧SKU为删除
      await this.prisma.productAttrValue.updateMany({
        where: { productId: id },
        data: { isDel: 1 },
      })

      // 创建新SKU
      await this.prisma.productAttrValue.createMany({
        data: attrValues.map((attrValue) => ({
          productId: id,
          ...attrValue,
          unique: this.generateUnique(),
        })),
      })
    }

    return product
  }

  async delete(id: number) {
    return this.prisma.product.update({
      where: { id },
      data: { isDel: 1 },
    })
  }

  async updateStatus(id: number, isShow: number) {
    return this.prisma.product.update({
      where: { id },
      data: { isShow },
    })
  }

  async batchUpdate(batchDto: BatchUpdateProductDto) {
    const { ids, action, value } = batchDto

    switch (action) {
      case 'show':
        return this.prisma.product.updateMany({
          where: { id: { in: ids } },
          data: { isShow: 1 },
        })
      case 'hide':
        return this.prisma.product.updateMany({
          where: { id: { in: ids } },
          data: { isShow: 0 },
        })
      case 'delete':
        return this.prisma.product.updateMany({
          where: { id: { in: ids } },
          data: { isDel: 1 },
        })
      case 'category':
        return this.prisma.product.updateMany({
          where: { id: { in: ids } },
          data: { cateId: value },
        })
      default:
        throw new Error('Invalid action')
    }
  }

  // 生成唯一标识
  private generateUnique(): string {
    return Math.random().toString(36).substring(2, 10)
  }
}


