<template>
  <header class="h-16 bg-white border-b flex-between px-4">
    <!-- 左侧 -->
    <div class="flex items-center">
      <!-- 折叠按钮 -->
      <el-icon 
        class="text-xl cursor-pointer mr-4" 
        @click="toggleSidebar"
      >
        <Fold v-if="!collapsed" />
        <Expand v-else />
      </el-icon>

      <!-- 面包屑 -->
      <Breadcrumb />
    </div>

    <!-- 右侧 -->
    <div class="flex items-center">
      <!-- 用户信息 -->
      <el-dropdown>
        <div class="flex items-center cursor-pointer">
          <el-avatar 
            :src="userInfo?.avatar" 
            :size="32"
            class="mr-2"
          >
            {{ userInfo?.nickname?.charAt(0) }}
          </el-avatar>
          <span class="mr-2">{{ userInfo?.nickname }}</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleProfile">个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Fold, Expand, ArrowDown } from '@element-plus/icons-vue'
import Breadcrumb from './Breadcrumb.vue'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import { usePermissionStore } from '@/stores/permission'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const userInfo = computed(() => userStore.userInfo)
const collapsed = computed(() => appStore.sidebarCollapsed)

const toggleSidebar = () => {
  appStore.toggleSidebar()
}

const handleProfile = () => {
  ElMessage.info('个人中心功能待开发')
}

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    await userStore.logoutAction()
    permissionStore.resetState()
    appStore.resetState()
    
    ElMessage.success('退出成功')
    router.push('/login')
  } catch (error) {
    // 用户取消
  }
}
</script>

