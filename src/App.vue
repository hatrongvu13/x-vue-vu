<template>
  <div class="app">
    <header class="header">
      <h1>Quản lý người dùng</h1>
      <nav>
        <router-link to="/">Trang chủ</router-link>
        <template v-if="!auth.user">
          <router-link to="/login">Đăng nhập</router-link>
          <router-link to="/register">Đăng ký</router-link>
        </template>
        <template v-else>
          <span>Xin chào, {{ auth.user.name }}</span>
          <button @click="auth.logout" class="btn-logout">Đăng xuất</button>
        </template>
      </nav>
    </header>

    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from './utils/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

auth.logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Arial, sans-serif; background: #f4f6f9; }

.app { min-height: 100vh; display: flex; flex-direction: column; }
.header {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header a, .header span, .header button {
  color: white;
  text-decoration: none;
  margin-left: 1rem;
  font-size: 1rem;
}
.btn-logout {
  background: #e74c3c;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.container {
  flex: 1;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
</style>
