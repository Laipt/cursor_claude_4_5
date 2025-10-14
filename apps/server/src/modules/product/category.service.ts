import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getTree() {
    // 获取所有商品分类（type=1）
    const categories = await this.prisma.category.findMany({
      where: {
        type: 1,
        status: 1,
      },
      orderBy: { sort: 'asc' },
    })

    // 构建树形结构
    return this.buildTree(categories, 0)
  }

  async findAll() {
    return this.prisma.category.findMany({
      where: {
        type: 1,
        status: 1,
      },
      orderBy: { sort: 'asc' },
    })
  }

  async create(data: any) {
    const { name, pid = 0, sort = 99999 } = data

    // 获取父分类路径
    let path = '/0/'
    if (pid !== 0) {
      const parent = await this.prisma.category.findUnique({
        where: { id: pid },
      })
      if (parent) {
        path = `${parent.path}${pid}/`
      }
    }

    return this.prisma.category.create({
      data: {
        name,
        pid,
        path,
        type: 1, // 商品分类
        sort,
      },
    })
  }

  async update(id: number, data: any) {
    return this.prisma.category.update({
      where: { id },
      data,
    })
  }

  async delete(id: number) {
    return this.prisma.category.update({
      where: { id },
      data: { status: 0 },
    })
  }

  // 构建树形结构
  private buildTree(categories: any[], pid: number) {
    const tree: any[] = []

    categories.forEach((category) => {
      if (category.pid === pid) {
        const children = this.buildTree(categories, category.id)
        if (children.length > 0) {
          category.children = children
        }
        tree.push(category)
      }
    })

    return tree
  }
}


