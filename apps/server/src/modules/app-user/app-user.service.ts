import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { QueryAppUserDto } from './dto/query-app-user.dto'
import { UpdateAppUserDto } from './dto/update-app-user.dto'
import { AdjustBalanceDto } from './dto/adjust-balance.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class AppUserService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryAppUserDto) {
    const { page, pageSize, keyword, status, level, groupId, isPromoter, startTime, endTime } = query

    const where: Prisma.AppUserWhereInput = {}

    // 关键词搜索（昵称、手机号、真实姓名）
    if (keyword) {
      where.OR = [
        { nickname: { contains: keyword } },
        { phone: { contains: keyword } },
        { realName: { contains: keyword } },
      ]
    }

    // 状态筛选
    if (status !== undefined) {
      where.status = status
    }

    // 等级筛选
    if (level !== undefined) {
      where.level = level
    }

    // 分组筛选
    if (groupId) {
      where.groupId = { contains: groupId }
    }

    // 推广员筛选
    if (isPromoter !== undefined) {
      where.isPromoter = isPromoter
    }

    // 时间范围筛选
    if (startTime && endTime) {
      where.createTime = {
        gte: new Date(startTime),
        lte: new Date(endTime),
      }
    }

    // 查询总数
    const total = await this.prisma.appUser.count({ where })

    // 分页查询
    const list = await this.prisma.appUser.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createTime: 'desc' },
      select: {
        uid: true,
        account: true,
        nickname: true,
        avatar: true,
        phone: true,
        realName: true,
        nowMoney: true,
        integral: true,
        experience: true,
        level: true,
        status: true,
        isPromoter: true,
        payCount: true,
        spreadCount: true,
        groupId: true,
        tagId: true,
        createTime: true,
        updateTime: true,
        lastLoginTime: true,
      },
    })

    return {
      total,
      list,
    }
  }

  async findOne(uid: number) {
    return this.prisma.appUser.findUnique({
      where: { uid },
    })
  }

  async update(updateDto: UpdateAppUserDto) {
    const { uid, ...data } = updateDto

    return this.prisma.appUser.update({
      where: { uid },
      data,
    })
  }

  async updateStatus(uid: number, status: number) {
    return this.prisma.appUser.update({
      where: { uid },
      data: { status },
    })
  }

  async adjustBalance(adjustDto: AdjustBalanceDto) {
    const { uid, type, action, amount, remark } = adjustDto

    const user = await this.prisma.appUser.findUnique({
      where: { uid },
    })

    if (!user) {
      throw new Error('用户不存在')
    }

    let updateData: any = {}

    if (type === 'money') {
      const currentMoney = Number(user.nowMoney)
      const newMoney = action === 'add' ? currentMoney + amount : currentMoney - amount

      if (newMoney < 0) {
        throw new Error('余额不足')
      }

      updateData.nowMoney = newMoney
    } else if (type === 'integral') {
      const currentIntegral = user.integral
      const newIntegral = action === 'add' ? currentIntegral + amount : currentIntegral - amount

      if (newIntegral < 0) {
        throw new Error('积分不足')
      }

      updateData.integral = newIntegral
    }

    // 更新用户余额/积分
    return this.prisma.appUser.update({
      where: { uid },
      data: updateData,
    })
  }

  // 获取用户标签列表
  async getTags() {
    return this.prisma.userTag.findMany({
      orderBy: { createTime: 'desc' },
    })
  }

  // 获取用户分组列表
  async getGroups() {
    return this.prisma.userGroup.findMany({
      orderBy: { createTime: 'desc' },
    })
  }

  // 创建用户标签
  async createTag(tagName: string) {
    return this.prisma.userTag.create({
      data: { tagName },
    })
  }

  // 创建用户分组
  async createGroup(groupName: string) {
    return this.prisma.userGroup.create({
      data: { groupName },
    })
  }
}


