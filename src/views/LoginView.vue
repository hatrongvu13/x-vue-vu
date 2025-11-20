<template>
  <div class="auth-container">
    <div class="auth-box">
      <h1>Đăng nhập</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Chưa có tài khoản? <router-link to="/register">Đăng ký ngay</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const { login, user } = useAuth()

onMounted(() => {
  if (user.value) router.push('/')
})

const handleLogin = () => {
  if (login(email.value, password.value)) {
    router.push('/')
  } else {
    alert('Sai email hoặc mật khẩu!')
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
button:hover {
  background: #3498db;
}
</style>
