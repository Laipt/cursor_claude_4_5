<template>
  <KForm label-width="100px">
    <k-input label="商品名称" prop="storeName" required />
    <k-input label="商品简介" prop="storeInfo" type="textarea" />
    <k-input-number label="价格" prop="price" :min="0" :precision="2" required />
    <k-input-number label="库存" prop="stock" :min="0" required />
    <k-tree-select label="分类" prop="cateId" :data="categoryTree" :props="{ label: 'name', value: 'id' }" />
    <k-radio label="状态" prop="isShow" :options="productStatusDict.options.value" />
    <el-form-item>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { DictTypes, ProductStatus } from '@kk/shared'
import { createProduct, updateProduct, getCategoryTree } from '@/api/product'

const productStatusDict = useDict(DictTypes.PRODUCT_STATUS)

const categoryTree = ref<any[]>([])
getCategoryTree().then((res) => {
  categoryTree.value = res.data.list
})

const { close, refresh, row } = inject<any>('_dialog').value
const { KForm, loading, validate } = useForm({
  defaultValues: {
    storeName: '',
    storeInfo: '',
    price: 0,
    stock: 0,
    cateId: '',
    isShow: ProductStatus.ON_SHELF,
    ...row,
  },
})

async function handleSubmit() {
  await validate((data) => {
    if (row?.id) {
      return updateProduct(row.id, data)
    }
    return createProduct(data)
  })
  close()
  refresh()
}
</script>


