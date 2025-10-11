<template>
  <div class="login flex">
    <div class="m-auto">
      <div class="text-center mb-20px">
        <img src="/vite.svg" class="w-50px h-50px mb-10px" />
        <div class="text-20px font-bold mb-5px">{{ appName }}</div>
        <div class="text-14px text-bluegray">欢迎来到{{ appName }}</div>
      </div>
      <div class="bg-white rd-xl shadow-2xl py-40px px-20px w-350px">
        <k-form label-position="top">
          <k-input label="用户名" prop="username" required @keyup.enter="handleLogin" />
          <k-input label="密码" prop="password" show-password required @keyup.enter="handleLogin" />
          <el-button type="primary" class="w-full mt-10px" :loading="loading" @click="handleLogin">登录</el-button>
        </k-form>
      </div>
      <div class="text-center text-12px text-coolgray mt-30px">
        <div>© 2025 {{ appName }} v2.1.0</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { KForm, validate, loading } = useForm({
  defaultValues: {
    username: 'admin',
    password: 'admin123',
  },
})

const appName = import.meta.env.VITE_APP_NAME

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const handleLogin = async () => {
  await validate(userStore.loginAction)
  // 跳转到重定向地址或首页
  const redirect = (route.query.redirect as string) || '/'
  router.push(redirect)
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url(./img/bg.jpg);
  background-size: cover;
}
</style>
