import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class UserTagService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const { page = 1, pageSize = 10, keyword } = query
    const skip = (page - 1) * pageSize

    const where: any = {}
    if (keyword) {
      where.tagName = { contains: keyword }
    }

    const [list, total] = await Promise.all([
      this.prisma.userTag.findMany({
        where,
        skip,
        take: Number(pageSize),
        orderBy: { createTime: 'desc' },
      }),
      this.prisma.userTag.count({ where }),
    ])

    return { list, total }
  }

  async findOne(id: number) {
    return this.prisma.userTag.findUnique({ where: { id } })
  }

  async create(data: any) {
    return this.prisma.userTag.create({ data })
  }

  async update(id: number, data: any) {
    return this.prisma.userTag.update({
      where: { id },
      data,
    })
  }

  async remove(id: number) {
    return this.prisma.userTag.delete({ where: { id } })
  }
}

