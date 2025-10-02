// 汇总所有 handlers

import { authHandlers } from './auth'
import { userHandlers } from './user'
import { roleHandlers } from './role'
import { menuHandlers } from './menu'
import { dictHandlers } from './dict'
import { configHandlers } from './config'

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...roleHandlers,
  ...menuHandlers,
  ...dictHandlers,
  ...configHandlers
]

