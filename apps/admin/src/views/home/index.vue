<template>
  <div class="p-4">
    <el-card>
      <template #header>
        <div class="flex-between">
          <span class="text-lg font-bold">欢迎使用后台管理系统</span>
        </div>
      </template>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- 统计卡片 -->
          <div class="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg">
            <div class="text-3xl font-bold mb-2">1,234</div>
            <div class="text-sm opacity-90">总用户数</div>
          </div>

          <div class="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-lg">
            <div class="text-3xl font-bold mb-2">56</div>
            <div class="text-sm opacity-90">今日访问</div>
          </div>

          <div class="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white p-6 rounded-lg">
            <div class="text-3xl font-bold mb-2">789</div>
            <div class="text-sm opacity-90">订单数量</div>
          </div>

          <div class="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-lg">
            <div class="text-3xl font-bold mb-2">¥12,345</div>
            <div class="text-sm opacity-90">总销售额</div>
          </div>
        </div>

        <!-- 用户信息 -->
        <el-card>
          <template #header>
            <span class="font-bold">用户信息</span>
          </template>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="用户名">{{ userInfo?.username }}</el-descriptions-item>
            <el-descriptions-item label="昵称">{{ userInfo?.nickname }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ userInfo?.email || '-' }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{ userInfo?.phone || '-' }}</el-descriptions-item>
            <el-descriptions-item label="角色">
              <el-tag v-for="role in userInfo?.roles" :key="role" class="mr-2">
                {{ role }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="状态">
              <el-tag :type="statusDict.getTagType(userInfo?.status || 0)">
                {{ statusDict.getLabel(userInfo?.status || 0) }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <!-- 快捷操作 -->
        <el-card>
          <template #header>
            <span class="font-bold">快捷操作</span>
          </template>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <el-button type="primary" @click="$router.push('/system/user')">用户管理</el-button>
            <el-button type="success" @click="$router.push('/system/role')">角色管理</el-button>
            <el-button type="warning" @click="$router.push('/system/menu')">菜单管理</el-button>
            <el-button type="info" @click="$router.push('/system/dict')">字典管理</el-button>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { DictTypes } from '@admin-system/shared'
import { useDict } from '@/composables/useDict'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

// 使用字典
const statusDict = useDict(DictTypes.USER_STATUS)
</script>

