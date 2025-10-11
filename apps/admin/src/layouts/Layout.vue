<template>
  <div class="layout-container" style="--menu-width: 210px; --main-header-height: 45px; --tabbar-height: 40px">
    <MainHeader />
    <div class="layout-container__bottom">
      <Sidebar />
      <div class="layout-container__right">
        <Tabbar />
        <div class="layout-container__box">
          <el-scrollbar>
            <div style="padding: 0 15px">
              <router-view v-slot="{ Component, route }">
                <keep-alive :include="cachedViews">
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>
              </router-view>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './sidebar/index.vue'
import MainHeader from './header/index.vue'
import Tabbar from './tabbar/index.vue'

defineOptions({ name: 'MainLayout' })

const appStore = useAppStore()
const { cachedViews } = storeToRefs(appStore)
</script>

<style lang="scss">
.layout-container {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  background: #f2f5fa;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &__bottom {
    flex: 1;
    height: 0;
    display: flex;
  }
  &__right {
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: column;
  }
  &__box {
    flex: 1;
    height: 0;
    padding: 15px 0;
  }
  .el-drawer__body {
    padding: 0;
  }
}
</style>
