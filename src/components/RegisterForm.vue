<template>
  <form @submit.prevent="handleRegister" class="form">
    <h3>Đăng ký</h3>
    <div class="field">
      <label>Họ tên</label>
      <input v-model="name" type="text" required />
    </div>
    <div class="field">
      <label>Email</label>
      <input v-model="email" type="email" required />
    </div>
    <div class="field">
      <label>Mật khẩu</label>
      <input v-model="password" type="password" required />
    </div>
    <button type="submit" class="btn-submit">Đăng ký</button>
    <p v-if="success" class="success">Đăng ký thành công! Đang chuyển về trang chủ...</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/utils/auth'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const success = ref(false)
const auth = useAuthStore()
const router = useRouter()

const handleRegister = () => {
  if (auth.register(name.value, email.value, password.value)) {
    success.value = true
    setTimeout(() => router.push('/'), 1500)
  }
}
</script>

<style scoped>
.form { max-width: 400px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
.field { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; }
.btn-submit { width: 100%; padding: 0.75rem; background: #9b59b6; color: white; border: none; border-radius: 4px; cursor: pointer; }
.btn-submit:hover { background: #8e44ad; }
.success { color: #27ae60; margin-top: 1rem; }
</style>
