// 字典 Mock 数据

import type { Dict, DictData } from '@/types/dict'

export const dicts: Dict[] = [
  {
    dictId: 1,
    dictName: '用户状态',
    dictType: 'user_status',
    status: 1,
    remark: '用户状态列表',
    createTime: '2024-01-01 00:00:00'
  },
  {
    dictId: 2,
    dictName: '系统状态',
    dictType: 'sys_status',
    status: 1,
    remark: '系统状态列表',
    createTime: '2024-01-01 00:00:00'
  },
  {
    dictId: 3,
    dictName: '性别',
    dictType: 'sys_gender',
    status: 1,
    remark: '性别列表',
    createTime: '2024-01-01 00:00:00'
  }
]

export const dictDataList: DictData[] = [
  {
    dictCode: 1,
    dictSort: 1,
    dictLabel: '正常',
    dictValue: '1',
    dictType: 'user_status',
    listClass: 'success',
    isDefault: 1,
    status: 1,
    createTime: '2024-01-01 00:00:00'
  },
  {
    dictCode: 2,
    dictSort: 2,
    dictLabel: '禁用',
    dictValue: '0',
    dictType: 'user_status',
    listClass: 'danger',
    isDefault: 0,
    status: 1,
    createTime: '2024-01-01 00:00:00'
  },
  {
    dictCode: 3,
    dictSort: 1,
    dictLabel: '启用',
    dictValue: '1',
    dictType: 'sys_status',
    listClass: 'success',
    isDefault: 1,
    status: 1,
    createTime: '2024-01-01 00:00:00'
  },
  {
    dictCode: 4,
    dictSort: 2,
    dictLabel: '停用',
    dictValue: '0',
    dictType: 'sys_status',
    listClass: 'danger',
    isDefault: 0,
    status: 1,
    createTime: '2024-01-01 00:00:00'
  },
  {
    dictCode: 5,
    dictSort: 1,
    dictLabel: '男',
    dictValue: '1',
    dictType: 'sys_gender',
    listClass: 'primary',
    isDefault: 0,
    status: 1,
    createTime: '2024-01-01 00:00:00'
  },
  {
    dictCode: 6,
    dictSort: 2,
    dictLabel: '女',
    dictValue: '2',
    dictType: 'sys_gender',
    listClass: 'danger',
    isDefault: 0,
    status: 1,
    createTime: '2024-01-01 00:00:00'
  }
]

