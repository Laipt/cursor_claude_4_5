import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class UserGroupService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const { page = 1, pageSize = 10, keyword } = query
    const skip = (page - 1) * pageSize

    const where: any = {}
    if (keyword) {
      where.groupName = { contains: keyword }
    }

    const [list, total] = await Promise.all([
      this.prisma.userGroup.findMany({
        where,
        skip,
        take: Number(pageSize),
        orderBy: { createTime: 'desc' },
      }),
      this.prisma.userGroup.count({ where }),
    ])

    return { list, total }
  }

  async findOne(id: number) {
    return this.prisma.userGroup.findUnique({ where: { id } })
  }

  async create(data: any) {
    return this.prisma.userGroup.create({ data })
  }

  async update(id: number, data: any) {
    return this.prisma.userGroup.update({
      where: { id },
      data,
    })
  }

  async remove(id: number) {
    return this.prisma.userGroup.delete({ where: { id } })
  }
}

