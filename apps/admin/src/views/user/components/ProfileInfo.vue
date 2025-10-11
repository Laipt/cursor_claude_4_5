<template>
  <div class="profile-info">
    <!-- 头像 -->
    <div class="avatar-section">
      <el-avatar :size="100" :src="userInfo?.avatar">
        {{ userInfo?.nickname?.charAt(0) }}
      </el-avatar>
    </div>
    
    <!-- 用户信息 -->
    <el-descriptions :column="1" class="info-descriptions">
      <el-descriptions-item label="用户名">
        {{ userInfo?.username }}
      </el-descriptions-item>
      <el-descriptions-item label="昵称">
        {{ userInfo?.nickname }}
      </el-descriptions-item>
      <el-descriptions-item label="邮箱">
        {{ userInfo?.email || '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="手机号">
        {{ userInfo?.phone || '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag :type="userInfo?.status === 1 ? 'success' : 'danger'">
          {{ userInfo?.status === 1 ? '正常' : '禁用' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="角色">
        <el-tag 
          v-for="role in userInfo?.roles" 
          :key="role" 
          style="margin-right: 5px"
        >
          {{ role }}
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
</script>

<style lang="scss" scoped>
.profile-info {
  .avatar-section {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    padding: 20px 0;
  }
  
  .info-descriptions {
    margin-top: 20px;
  }
}
</style>

