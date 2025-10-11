<template>
  <KForm label-width="100px">
    <k-input label="昵称" prop="nickname" required />
    <k-input label="邮箱" prop="email" />
    <k-input label="手机号" prop="phone" />
    <k-input label="头像URL" prop="avatar" />
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="handleSubmit">
        保存修改
      </el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { updateProfile } from '@/api/user'
import { useUserStore } from '@/stores/user'
import type { ProfileForm } from '@kk/shared'

const userStore = useUserStore()

const { KForm, model, loading, validate, reset } = useForm<ProfileForm>({
  defaultValues: {
    nickname: userStore.userInfo?.nickname || '',
    email: userStore.userInfo?.email || '',
    phone: userStore.userInfo?.phone || '',
    avatar: userStore.userInfo?.avatar || '',
  },
})

async function handleSubmit() {
  await validate(updateProfile)
  await userStore.getUserInfoAction()
}

function handleReset() {
  reset()
}
</script>

