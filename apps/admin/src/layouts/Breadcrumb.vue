<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item 
      v-for="(item, index) in breadcrumbs" 
      :key="item.path"
      :to="index === breadcrumbs.length - 1 ? '' : item.path"
    >
      {{ item.meta?.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  
  // 如果不是首页，添加首页到面包屑
  if (matched.length > 0 && matched[0].path !== '/home') {
    matched.unshift({
      path: '/home',
      meta: { title: '首页' }
    } as any)
  }
  
  return matched
})
</script>

