<template>
  <el-tabs v-model="activeTab" @tab-change="handleTabChange">
    <el-tab-pane label="全部" :name="'all'" />
    <el-tab-pane label="待发货" :name="String(OrderStatusConst.PENDING_DELIVERY)" />
    <el-tab-pane label="待收货" :name="String(OrderStatusConst.PENDING_RECEIPT)" />
    <el-tab-pane label="已完成" :name="String(OrderStatusConst.COMPLETED)" />
    <el-tab-pane label="退款" :name="'refund'" />
  </el-tabs>

  <KTable row-key="id" :default-params="defaultParams">
    <template #query>
      <k-input label="关键词" prop="keyword" placeholder="订单号/手机号/姓名" />
      <k-select label="支付状态" prop="paid" :options="payStatusDict.options.value" />
    </template>

    <el-table-column prop="orderId" label="订单号" width="200" />
    <el-table-column label="用户信息" width="200">
      <template #default="{ row }">
        <div>{{ row.realName }}</div>
        <div class="phone">{{ row.userPhone }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="totalNum" label="商品数量" width="100" />
    <el-table-column prop="payPrice" label="实付金额" width="120">
      <template #default="{ row }">
        ¥{{ row.payPrice }}
      </template>
    </el-table-column>
    <k-table-dict label="支付状态" prop="paid" :dict-type="DictTypes.PAY_STATUS" width="100" />
    <k-table-dict label="订单状态" prop="status" :dict-type="DictTypes.ORDER_STATUS" width="100" />
    <k-table-date prop="createTime" label="下单时间" width="180" />
    <k-table-operations width="200">
      <template #default="{ row }">
        <el-button link type="primary" @click="openDetail(row)">详情</el-button>
        <el-button
          v-if="row.status === OrderStatusConst.PENDING_DELIVERY && row.paid === PayStatus.PAID"
          link
          type="success"
          @click="openDelivery('订单发货', { row })"
        >
          发货
        </el-button>
        <el-button
          v-if="row.refundStatus === RefundStatus.APPLYING"
          link
          type="warning"
          @click="openRefund('订单退款', { row })"
        >
          退款
        </el-button>
      </template>
    </k-table-operations>
  </KTable>

  <KDialogDelivery>
    <DeliveryForm />
  </KDialogDelivery>

  <KDialogRefund>
    <RefundForm />
  </KDialogRefund>
</template>

<script setup lang="ts">
import { DictTypes, OrderStatusConst, PayStatus, RefundStatus } from '@kk/shared'
import * as api from '@/api/order'
import DeliveryForm from './components/DeliveryForm.vue'
import RefundForm from './components/RefundForm.vue'

const payStatusDict = useDict(DictTypes.PAY_STATUS)

const activeTab = ref('all')
const defaultParams = ref<any>({})

const { KTable, refresh } = useTable(api.getOrderList)

const { KDialog: KDialogDelivery, open: openDelivery } = useDialog({ refresh })
const { KDialog: KDialogRefund, open: openRefund } = useDialog({ refresh })

const handleTabChange = (name: string | number) => {
  const tabName = String(name)
  if (tabName === 'all') {
    defaultParams.value = {}
  } else if (tabName === 'refund') {
    defaultParams.value = { refundStatus: RefundStatus.APPLYING }
  } else {
    defaultParams.value = { status: Number(tabName) }
  }
  refresh()
}

const openDetail = (row: any) => {
  // TODO: 打开订单详情
  console.log('查看订单详情:', row)
}
</script>

<style scoped lang="scss">
.phone {
  font-size: 12px;
  color: #999;
}
</style>

