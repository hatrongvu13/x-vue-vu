<template>
  <div class="auth-container">
    <div class="auth-box">
      <h1>Đăng ký</h1>
      <form @submit.prevent="handleRegister">
        <input v-model="name" placeholder="Họ tên (tùy chọn)" />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng ký ngay</button>
      </form>
      <p>Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const { register } = useAuth()

const handleRegister = () => {
  if (email.value && password.value) {
    register(email.value, password.value, name.value)
    router.push('/')
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.auth-box {
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}
input,
button {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
}
input {
  border: 1px solid #ddd;
}
button {
  background: #2980b9;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>
