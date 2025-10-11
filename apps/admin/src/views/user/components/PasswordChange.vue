<template>
  <KForm label-width="100px">
    <k-input label="旧密码" prop="oldPassword" type="password" required show-password />
    <k-input 
      label="新密码" 
      prop="newPassword" 
      type="password" 
      required 
      show-password 
      :rules="[{ min: 6, message: '密码长度至少6位', trigger: 'blur' }]"
    />
    <k-input 
      label="确认密码" 
      prop="confirmPassword" 
      type="password" 
      required 
      show-password 
      :rules="confirmPasswordRules"
    />
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="handleSubmit">
        修改密码
      </el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </KForm>
</template>

<script setup lang="ts">
import { changePassword } from '@/api/user'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import type { ChangePasswordForm } from '@kk/shared'

const userStore = useUserStore()
const router = useRouter()

const { KForm, model, loading, validate, reset } = useForm<ChangePasswordForm>({
  defaultValues: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
})

const confirmPasswordRules = [
  {
    validator: (rule, value, callback) => {
      if (value !== model.newPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  },
]

async function handleSubmit() {
  await validate(changePassword)
  reset()
  
  // 密码修改成功后，提示用户并跳转到登录页
  await ElMessageBox.alert('密码已修改成功，请重新登录', '提示', {
    confirmButtonText: '确定',
    type: 'success',
    callback: () => {
      userStore.resetState()
      router.push('/login')
    }
  })
}

function handleReset() {
  reset()
}
</script>

