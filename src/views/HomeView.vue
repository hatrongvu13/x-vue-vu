<template>
  <div class="home container">
    <h1>Chào mừng đến với Vue Auth Demo</h1>

    <!-- Nội dung công khai -->
    <div class="card public">
      <h2>Nội dung công khai</h2>
      <p>Ai cũng xem được phần này!</p>
      <ul>
        <li>Học Vue 3 miễn phí</li>
        <li>Tài liệu tiếng Việt</li>
        <li>Cộng đồng thân thiện</li>
      </ul>
    </div>

    <!-- Nội dung riêng tư -->
    <div v-if="user" class="card private">
      <h2>Xin chào {{ user.name }}!</h2>
      <p>
        Đây là nội dung
        <strong>RIÊNG TƯ</strong>
        chỉ thành viên mới thấy được
      </p>
      <div class="secret">
        Mã giảm giá bí mật:
        <strong>VUE2025</strong>
      </div>
      <p>Email của bạn: {{ user.email }}</p>
    </div>

    <div v-else class="card">
      <p>Đăng nhập để xem nội dung riêng tư nhé!</p>
      <router-link to="/login" class="btn">Đăng nhập ngay</router-link>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '@/stores/auth'
const { user } = useAuth()
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
}
.card {
  background: white;
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.public {
  border-left: 6px solid #3498db;
}
.private {
  border-left: 6px solid #e67e22;
  background: #fef9e7;
}
.secret {
  background: #f1c40f;
  color: black;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.2rem;
  margin: 1rem 0;
}
.btn {
  display: inline-block;
  background: #27ae60;
  color: white;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
}
</style>
