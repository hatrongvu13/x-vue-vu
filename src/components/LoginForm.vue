<template>
  <form @submit.prevent="handleLogin" class="form">
    <h3>Đăng nhập</h3>
    <div class="field">
      <label>Email</label>
      <input v-model="email" type="email" required />
    </div>
    <div class="field">
      <label>Mật khẩu</label>
      <input v-model="password" type="password" required />
    </div>
    <button type="submit" class="btn-submit">Đăng nhập</button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/utils/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()
const router = useRouter()

const handleLogin = () => {
  if (auth.login(email.value, password.value)) {
    router.push('/')
  } else {
    error.value = 'Đăng nhập thất bại. Vui lòng thử lại.'
  }
}
</script>

<style scoped>
.form { max-width: 400px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
.field { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; }
.btn-submit { width: 100%; padding: 0.75rem; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; }
.btn-submit:hover { background: #219653; }
.error { color: #e74c3c; margin-top: 1rem; }
</style>
