<template>
  <div class="home">
    <h2>Chào mừng đến trang chủ</h2>

    <div v-if="!auth.user" class="auth-actions">
      <p>Vui lòng đăng nhập hoặc đăng ký để xem nội dung quản lý.</p>
      <div class="buttons">
        <router-link to="/login" class="btn">Đăng nhập</router-link>
        <router-link to="/register" class="btn">Đăng ký</router-link>
      </div>
    </div>

    <div v-else>
      <UserList />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/utils/auth.js'
import UserList from '@/components/UserList.vue'

const auth = useAuthStore()
</script>

<style scoped>
.home { text-align: center; }
.auth-actions p { margin: 1.5rem 0; color: #555; }
.buttons { display: flex; gap: 1rem; justify-content: center; }
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
}
.btn:hover { background: #2980b9; }
</style>
