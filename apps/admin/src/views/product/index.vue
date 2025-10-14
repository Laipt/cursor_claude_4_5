<template>
  <KTable show-selection row-key="id">
    <template #query>
      <k-input label="关键词" prop="keyword" placeholder="商品名称/关键词" />
      <k-tree-select label="分类" prop="cateId" :data="categoryTree" :props="{ label: 'name', value: 'id' }" />
      <k-select label="状态" prop="isShow" :options="productStatusDict.options.value" />
    </template>

    <template #actions>
      <el-button type="primary" @click="open('新增商品')">新增商品</el-button>
      <el-button :disabled="!selectedRows.length" type="success" @click="handleBatchShow">批量上架</el-button>
    </template>

    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column label="商品信息" width="300">
      <template #default="{ row }">
        <div class="product-info">
          <el-image :src="row.image" style="width: 60px; height: 60px" fit="cover" />
          <div class="info">
            <div class="name">{{ row.storeName }}</div>
            <div class="desc">{{ row.storeInfo }}</div>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="price" label="价格" width="100">
      <template #default="{ row }">
        ¥{{ row.price }}
      </template>
    </el-table-column>
    <el-table-column prop="stock" label="库存" width="100" />
    <el-table-column prop="sales" label="销量" width="100" />
    <k-table-dict label="状态" prop="isShow" :dict-type="DictTypes.PRODUCT_STATUS" width="100" />
    <k-table-operations width="200">
      <template #default="{ row }">
        <el-button link type="primary" @click="open('编辑商品', { row })">编辑</el-button>
        <k-async-button
          link
          :type="row.isShow === ProductStatus.ON_SHELF ? 'warning' : 'success'"
          :action="() => handleToggleStatus(row)"
        >
          {{ row.isShow === ProductStatus.ON_SHELF ? '下架' : '上架' }}
        </k-async-button>
        <k-async-button link type="danger" :action="() => handleDelete(row)">删除</k-async-button>
      </template>
    </k-table-operations>
  </KTable>

  <KDialog>
    <EditForm />
  </KDialog>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { DictTypes, ProductStatus } from '@kk/shared'
import * as api from '@/api/product'
import EditForm from './components/EditForm.vue'

const productStatusDict = useDict(DictTypes.PRODUCT_STATUS)

const categoryTree = ref<any[]>([])
api.getCategoryTree().then((res) => {
  categoryTree.value = res.data.list
})

const { KTable, refresh, selectedRows } = useTable(api.getProductList)

const { KDialog, open } = useDialog({ refresh })

const handleToggleStatus = async (row: any) => {
  const action = row.isShow === ProductStatus.ON_SHELF ? '下架' : '上架'
  const newStatus = row.isShow === ProductStatus.ON_SHELF ? ProductStatus.OFF_SHELF : ProductStatus.ON_SHELF
  await ElMessageBox.confirm(`确认${action}该商品吗？`, '提示', { type: 'warning' })
  await api.updateProductStatus(row.id, newStatus)
  refresh()
}

const handleDelete = async (row: any) => {
  await ElMessageBox.confirm('确认删除该商品吗？', '提示', { type: 'warning' })
  await api.deleteProduct(row.id)
  refresh()
}

const handleBatchShow = async () => {
  await ElMessageBox.confirm(`确认批量上架 ${selectedRows.value.length} 个商品吗？`, '提示')
  await api.batchUpdateProduct({
    ids: selectedRows.value.map((item) => item.id),
    action: 'show',
  })
  refresh()
}
</script>

<style scoped lang="scss">
.product-info {
  display: flex;
  gap: 10px;

  .info {
    flex: 1;

    .name {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .desc {
      font-size: 12px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

