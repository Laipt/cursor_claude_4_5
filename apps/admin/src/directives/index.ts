// 指令入口

import { App } from 'vue'
import permission from './permission'

export function setupDirectives(app: App) {
  app.directive('permission', permission)
}

export default setupDirectives

