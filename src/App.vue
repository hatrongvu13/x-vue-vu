<template>
  <Navbar />
  <main class="main-content">
    <router-view />
    <!-- Trang chủ, CV, Login, Register... sẽ hiện ở đây -->
  </main>
</template>

<script setup>
import Navbar from '@/components/NavBar.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Arial, sans-serif;
  background: #f4f6f9;
}
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
}

.main-content {
  flex: 1;
  padding-top: 50px; /* Đẩy nội dung xuống dưới navbar cố định */
  padding-bottom: 4rem;
}

/* Đảm bảo mọi trang con đều căn giữa và có khoảng thở */
/*
.router-view,
.cv-page,
.home-page,
.auth-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  width: 100%;
  box-sizing: border-box;
}
*/
/* Trang CV và Trang chủ đẹp hơn, không bị dính */
.cv-page {
  margin: 2rem auto;
  padding: 2rem 1.5rem;
  animation: fadeIn 0.8s ease-out;
}

.home-page {
  margin: 3rem auto;
  text-align: center;
}

/* Hiệu ứng mờ dần khi vào trang */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile hoàn hảo */
@media (max-width: 768px) {
  .main-content {
    padding-top: 80px;
  }
  .cv-page {
    margin: 1rem auto;
    padding: 1rem;
  }
}
</style>
