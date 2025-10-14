// App用户相关类型定义

export interface AppUser {
  uid: number
  account: string
  nickname: string
  avatar: string
  phone: string | null
  realName: string
  nowMoney: number
  integral: number
  experience: number
  level: number
  status: number
  isPromoter: number
  payCount: number
  spreadCount: number
  groupId: string
  tagId: string
  createTime: Date
  updateTime: Date
  lastLoginTime: Date | null
}

export interface QueryAppUserDto {
  page: number
  pageSize: number
  keyword?: string
  status?: number
  level?: number
  groupId?: string
  isPromoter?: number
  startTime?: string
  endTime?: string
}

export interface UpdateAppUserDto {
  uid: number
  nickname?: string
  realName?: string
  phone?: string
  status?: number
  groupId?: string
  tagId?: string
  mark?: string
}

export interface AdjustBalanceDto {
  uid: number
  type: 'money' | 'integral'
  action: 'add' | 'subtract'
  amount: number
  remark: string
}

export interface UserTag {
  id: number
  tagName: string
  createTime: Date
  updateTime: Date
}

export interface UserGroup {
  id: number
  groupName: string
  createTime: Date
  updateTime: Date
}

export interface AppUserListResponse {
  total: number
  list: AppUser[]
}


