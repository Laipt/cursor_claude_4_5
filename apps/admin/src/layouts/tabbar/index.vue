<template>
  <div class="tabbar-container">
    <el-tabs v-model="currentTab" type="card" @tab-remove="handleRemove" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tagsViewList"
        :key="item.path"
        :label="item.meta.title"
        :name="item.path"
        :closable="!['/', '/home'].includes(item.path!)"
      />
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { unionWith } from 'lodash-es'

const appStore = useAppStore()
const { tagsViewList } = storeToRefs(appStore)

const currentTab = ref('')

const route = useRoute()
watch(
  route,
  (val) => {
    tagsViewList.value = unionWith(unref(tagsViewList.value), [{ ...val }], (pre, cur) => pre.path === cur.path)
    currentTab.value = val.path
  },
  {
    immediate: true,
  },
)

const router = useRouter()
function handleClick(tab) {
  const name = tab.props.name
  if (name !== route.path) {
    router.push(name)
  }
}
function handleRemove(name) {
  if (name === route.path) {
    const index = tagsViewList.value.findIndex((item) => item.path === name)
    router.replace(tagsViewList.value[index - 1].path ?? '/')
  }
  tagsViewList.value = tagsViewList.value.filter((item) => item.path !== name)
}
</script>

<style lang="scss">
.tabbar-container {
  height: var(--tabbar-height);
  background-color: #fff;
  z-index: 99;

  .el-tabs--card > .el-tabs__header {
    border: none;
    margin: 0;
    .el-tabs__nav {
      border: none !important;
    }
    .el-tabs__item {
      margin-top: 8px;
      height: calc(var(--tabbar-height) - 12px);
      line-height: calc(var(--tabbar-height) - 14px);
      border-radius: 2px;
      font-size: 12px;
      border: 1px solid var(--el-border-color-light);
      background-color: var(--el-color-white);
      padding: 0 10px !important;
      font-weight: normal;
    }
    .el-tabs__item.is-active {
      color: var(--el-color-white);
      border: 1px solid var(--el-color-primary) !important;
      background-color: var(--el-color-primary);
      transition: background-color 0.2s linear;
    }
    // .el-tabs__item.is-active::before {
    //   content: "";
    //   width: 7px;
    //   height: 7px;
    //   display: inline-block;
    //   background-color: var(--el-color-white);
    //   border: 1px solid var(--el-color-primary-light-6);
    //   border-radius: 50%;
    //   margin-right: 5px;
    // }
    .el-tabs__item:hover {
      border: 1px solid var(--el-color-primary) !important;
    }
  }
  .el-tabs__item + .el-tabs__item {
    margin-left: 4px;
  }
}
</style>
