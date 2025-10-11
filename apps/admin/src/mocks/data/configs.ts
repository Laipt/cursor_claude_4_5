// 配置 Mock 数据

import type { Config } from '@kk/shared'

export const configs: Config[] = [
  {
    configId: 1,
    configName: '系统名称',
    configKey: 'sys.name',
    configValue: '后台管理系统',
    configType: 'system',
    remark: '系统名称配置',
    createTime: '2024-01-01 00:00:00'
  },
  {
    configId: 2,
    configName: '系统版本',
    configKey: 'sys.version',
    configValue: '1.0.0',
    configType: 'system',
    remark: '系统版本号',
    createTime: '2024-01-01 00:00:00'
  },
  {
    configId: 3,
    configName: '登录超时时间',
    configKey: 'sys.timeout',
    configValue: '30',
    configType: 'system',
    remark: '登录超时时间(分钟)',
    createTime: '2024-01-01 00:00:00'
  },
  {
    configId: 4,
    configName: '初始密码',
    configKey: 'sys.user.initPassword',
    configValue: '123456',
    configType: 'system',
    remark: '用户初始密码',
    createTime: '2024-01-01 00:00:00'
  }
]

