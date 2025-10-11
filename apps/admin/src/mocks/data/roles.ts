// 角色 Mock 数据

import type { Role } from '@kk/shared'

export const roles: Role[] = [
  {
    roleId: 1,
    roleName: '超级管理员',
    roleKey: 'admin',
    roleSort: 1,
    status: 1,
    menuIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    remark: '超级管理员',
    createTime: '2024-01-01 00:00:00'
  },
  {
    roleId: 2,
    roleName: '普通角色',
    roleKey: 'common',
    roleSort: 2,
    status: 1,
    menuIds: [1, 2, 3],
    remark: '普通角色',
    createTime: '2024-01-02 00:00:00'
  },
  {
    roleId: 3,
    roleName: '访客角色',
    roleKey: 'guest',
    roleSort: 3,
    status: 1,
    menuIds: [1],
    remark: '访客角色',
    createTime: '2024-01-03 00:00:00'
  }
]

