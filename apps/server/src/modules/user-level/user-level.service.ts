import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class UserLevelService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const { page = 1, pageSize = 10, keyword } = query
    const skip = (page - 1) * pageSize

    const where: any = {}
    if (keyword) {
      where.name = { contains: keyword }
    }

    const [list, total] = await Promise.all([
      this.prisma.userLevel.findMany({
        where,
        skip,
        take: Number(pageSize),
        orderBy: { level: 'asc' },
      }),
      this.prisma.userLevel.count({ where }),
    ])

    return { list, total }
  }

  async findOne(id: number) {
    return this.prisma.userLevel.findUnique({ where: { id } })
  }

  async create(data: any) {
    return this.prisma.userLevel.create({ data })
  }

  async update(id: number, data: any) {
    return this.prisma.userLevel.update({
      where: { id },
      data,
    })
  }

  async remove(id: number) {
    return this.prisma.userLevel.delete({ where: { id } })
  }
}

