<template>
  <div class="h-screen flex-col-center bg-gray-100">
    <div class="text-9xl font-bold text-gray-300 mb-8">404</div>
    <div class="text-2xl text-gray-600 mb-4">页面不存在</div>
    <div class="text-gray-500 mb-8">抱歉，您访问的页面不存在或已被删除</div>
    <el-button type="primary" @click="goHome">返回首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

