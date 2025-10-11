<template>
  <div class="layout-header">
    <div style="display: flex; align-items: center">
      <div class="side-header">{{ appName }}</div>
      <el-icon v-if="!showSidebar" size="24" color="#606266" @click="sidebarCollapsed = !sidebarCollapsed">
        <Fold v-if="sidebarCollapsed" />
        <Expand v-else />
      </el-icon>
    </div>
    <div style="padding: 0 20px">
      <el-dropdown @command="handleCommand">
        <el-button link>
          {{ userInfo?.nickname }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="info">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LayoutHeader' })

const appStore = useAppStore()
const { sidebarCollapsed, showSidebar } = storeToRefs(appStore)

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)


const appName = import.meta.env.VITE_APP_NAME
const router = useRouter()

function handleCommand(command) {
  switch (command) {
    case 'logout':
      userStore.logoutAction()
      window.location.href = '/'
      break
    case 'info':
      router.push('/user/profile')
      break
    default:
      break
  }
}
</script>

<style lang="scss">
.side-header {
  display: flex;
  min-width: var(--menu-width);
  height: var(--main-header-height);
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  color: var(--el-color-primary);
  font-weight: bold;
  &__logo {
    width: 30px;
    height: 30px;
  }
}
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--main-header-height);
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 21, 41, 0.12);
  z-index: 100;
}
</style>
