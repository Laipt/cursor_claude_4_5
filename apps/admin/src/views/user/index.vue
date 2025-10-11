<template>
  <div class="profile-container">
    <el-row :gutter="20">
      <!-- 左侧：个人信息展示 -->
      <el-col :span="8">
        <el-card>
          <template #header>
            <span>个人信息</span>
          </template>
          <ProfileInfo />
        </el-card>
      </el-col>
      
      <!-- 右侧：Tab切换（修改资料、修改密码） -->
      <el-col :span="16">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="修改资料" name="edit">
              <ProfileEdit />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="password">
              <PasswordChange />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProfileInfo from './components/ProfileInfo.vue'
import ProfileEdit from './components/ProfileEdit.vue'
import PasswordChange from './components/PasswordChange.vue'

const activeTab = ref('edit')
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 20px;
}
</style>

