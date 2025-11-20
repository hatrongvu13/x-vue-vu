<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar">
    <!-- Bên trái: Logo + Trang chủ + CV -->
    <div class="left">
      <router-link to="/">Trang chủ</router-link>
      <router-link class="cv-link" to="/cv">
        CV của tôi
      </router-link>
    </div>

    <!-- Bên phải: Đăng nhập / Đăng ký hoặc Xin chào + Đăng xuất -->
    <div class="auth-links">
      <template v-if="user">
        <span>Xin chào {{ user.name }}!</span>
        <button @click="logout">Đăng xuất</button>
      </template>
      <template v-else>
        <router-link to="/login">Đăng nhập</router-link>
<!--        <router-link to="/register">Đăng ký</router-link>-->
      </template>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '@/stores/auth'

const { user, logout } = useAuth()

</script>

<style scoped>
.navbar {
  background: #2c3e50;
  padding: 1rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.left {
  display: flex;
  align-items: center;
  gap: 25px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.navbar a:hover {
  color: #1abc9c;
}

/* Đặc biệt làm nổi bật link CV */
.cv-link {
  background: #e67e22;
  padding: 8px 16px;
  border-radius: 30px;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.cv-link:hover {
  background: #d35400;
  color: white !important;
}

.navbar button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.navbar button:hover {
  background: #c0392b;
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Responsive cho mobile */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    text-align: center;
  }

  .left, .auth-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
