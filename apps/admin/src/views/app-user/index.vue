<template>
  <KTable row-key="uid">
    <template #query>
      <k-input label="关键词" prop="keyword" placeholder="昵称/手机号/姓名" />
      <k-select label="状态" prop="status" :options="userStatusDict.options.value" />
      <k-input-number label="等级" prop="level" :min="0" />
    </template>

    <template #actions>
      <el-button type="primary" @click="openEdit('新增用户')">新增用户</el-button>
    </template>

    <el-table-column prop="uid" label="ID" width="80" />
    <el-table-column label="用户信息" width="250">
      <template #default="{ row }">
        <div class="user-info">
          <el-avatar :src="row.avatar" />
          <div class="info">
            <div>{{ row.nickname }}</div>
            <div class="phone">{{ row.phone }}</div>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="nowMoney" label="余额" width="100">
      <template #default="{ row }">
        ¥{{ row.nowMoney }}
      </template>
    </el-table-column>
    <el-table-column prop="integral" label="积分" width="100" />
    <el-table-column prop="level" label="等级" width="80" />
    <el-table-column prop="payCount" label="购买次数" width="100" />
    <k-table-dict label="状态" prop="status" :dict-type="DictTypes.APP_USER_STATUS" width="100" />
    <k-table-date prop="createTime" label="注册时间" width="180" />
    <k-table-operations width="280">
      <template #default="{ row }">
        <el-button link type="primary" @click="openEdit('编辑用户', { row })">编辑</el-button>
        <k-async-button
          link
          :type="row.status === AppUserStatus.NORMAL ? 'warning' : 'success'"
          :action="() => handleToggleStatus(row)"
        >
          {{ row.status === AppUserStatus.NORMAL ? '禁用' : '启用' }}
        </k-async-button>
        <el-button link type="primary" @click="openBalance('调整余额/积分', { row })">
          调整余额
        </el-button>
      </template>
    </k-table-operations>
  </KTable>

  <KDialog>
    <EditForm />
  </KDialog>

  <KDialogBalance>
    <AdjustBalanceForm />
  </KDialogBalance>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { DictTypes, AppUserStatus } from '@kk/shared'
import * as api from '@/api/app-user'
import EditForm from './components/EditForm.vue'
import AdjustBalanceForm from './components/AdjustBalanceForm.vue'

const userStatusDict = useDict(DictTypes.APP_USER_STATUS)

const { KTable, refresh } = useTable(api.getAppUserList)

const { KDialog, open: openEdit } = useDialog({ refresh })
const { KDialog: KDialogBalance, open: openBalance } = useDialog({ refresh })

const handleToggleStatus = async (row: any) => {
  const action = row.status === AppUserStatus.NORMAL ? '禁用' : '启用'
  const newStatus = row.status === AppUserStatus.NORMAL ? AppUserStatus.DISABLED : AppUserStatus.NORMAL
  await ElMessageBox.confirm(`确认${action}该用户吗？`, '提示', { type: 'warning' })
  await api.updateAppUserStatus(row.uid, newStatus)
  refresh()
}
</script>

<style scoped lang="scss">
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;

  .info {
    flex: 1;

    .phone {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>

