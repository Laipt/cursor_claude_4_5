import { ElMessage } from 'element-plus'

export const toastSuccess = (res) => {
  ElMessage.success('操作成功')
  return res
}
