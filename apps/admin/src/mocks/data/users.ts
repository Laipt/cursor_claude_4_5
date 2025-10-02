// 用户 Mock 数据

import type { User } from '@/types/user'

export const users: User[] = [
  {
    userId: 1,
    username: 'admin',
    nickname: '超级管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    status: 1,
    roleIds: [1],
    roles: ['admin'],
    permissions: ['*:*:*'],
    createTime: '2024-01-01 00:00:00'
  },
  {
    userId: 2,
    username: 'user',
    nickname: '普通用户',
    email: 'user@example.com',
    phone: '13800138001',
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
    status: 1,
    roleIds: [2],
    roles: ['common'],
    permissions: ['system:user:list'],
    createTime: '2024-01-02 00:00:00'
  },
  {
    userId: 3,
    username: 'test',
    nickname: '测试用户',
    email: 'test@example.com',
    phone: '13800138002',
    avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
    status: 1,
    roleIds: [2],
    roles: ['common'],
    permissions: ['system:user:list'],
    createTime: '2024-01-03 00:00:00'
  }
]

// 生成更多测试数据
for (let i = 4; i <= 20; i++) {
  users.push({
    userId: i,
    username: `user${i}`,
    nickname: `用户${i}`,
    email: `user${i}@example.com`,
    phone: `1380013800${i}`,
    avatar: `https://avatars.githubusercontent.com/u/${i}?v=4`,
    status: i % 5 === 0 ? 0 : 1,
    roleIds: [2],
    roles: ['common'],
    permissions: ['system:user:list'],
    createTime: `2024-01-${String(i).padStart(2, '0')} 00:00:00`
  })
}

