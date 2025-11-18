<script>
import { auth } from '@/utils/auth'

export default {
  setup() {
    return { auth }
  },
}
</script>

<template>
  <nav class="navbar">
    <router-link to="/">Trang chủ</router-link>
    <span v-if="auth.isLoggedIn()">
      <router-link to="/dashboard">Dashboard</router-link>
      <a href="#" @click.prevent="auth.logout">Đăng xuất</a>
    </span>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 1rem;
  background: #333;
  color: white;
  text-align: center;
}
.navbar a {
  color: white;
  margin: 0 1rem;
  text-decoration: none;
}
</style>
