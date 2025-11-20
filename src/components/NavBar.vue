<template>
  <nav class="navbar">
    <!-- Bên trái: Trang chủ + CV nổi bật -->
    <div class="left">
      <router-link to="/" class="nav-link">Trang chủ</router-link>
      <router-link to="/cv" class="cv-btn">
        <i class="fas fa-file-alt"></i>
        CV của tôi
      </router-link>
    </div>

    <!-- Bên phải: Auth -->
    <div class="auth-links">
      <template v-if="user">
        <span class="user-greeting">
          <i class="fas fa-user-circle"></i>
          {{ user.name }}
        </span>
        <button @click="logout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
          Đăng xuất
        </button>
      </template>
      <template v-else>
        <router-link to="/login" class="nav-link">Đăng nhập</router-link>
        <!-- <router-link to="/register" class="nav-link">Đăng ký</router-link> -->
      </template>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '@/stores/auth'
const { user, logout } = useAuth()
</script>

<style scoped>
/* NỀN GRADIENT ĐỒNG BỘ VỚI CV HEADER */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 2.5rem;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  position: sticky;
  top: 0;
  z-index: 999;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  /* Quan trọng: Giữ layout ngang trên mọi kích thước */
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;         /* Đảm bảo chiều cao tối thiểu */
  flex-wrap: wrap;          /* Cho phép xuống dòng khi quá nhỏ */
  gap: 1rem;
}

.left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar a, .navbar span, .navbar button {
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* Link thường */
.nav-link {
  font-size: 1.1rem;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 3px;
  background: #a0e7ff;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  color: #a0e7ff;
  transform: translateY(-2px);
}

/* NÚT CV NỔI BẬT NHẤT - SIÊU ĐẸP */
.cv-btn {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white !important;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
  transition: all 0.4s ease;
}

.cv-btn i {
  font-size: 1.1rem;
}

.cv-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 15px 30px rgba(255, 107, 107, 0.6);
  background: linear-gradient(45deg, #ff5252, #ffb74d);
}

/* User greeting */
.user-greeting {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.95;
}

.user-greeting i {
  font-size: 1.3rem;
  color: #a0e7ff;
}

/* Nút đăng xuất */
.logout-btn {
  background: rgba(231, 76, 60, 0.9);
  border: none;
  padding: 10px 18px;
  border-radius: 50px;
  font-size: 0.95rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
}

.logout-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(231, 76, 60, 0.6);
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

@media (max-width: 868px) {
  .navbar {
    padding: 1rem 1.5rem;
    justify-content: center;     /* Căn giữa khi xuống dòng */
    text-align: center;
  }

  .left,
  .auth-links {
    flex: 1;
    justify-content: center;
  }

  .cv-btn {
    padding: 10px 20px;
    font-size: 1rem;
  }
}

/* RESPONSIVE - SIÊU MƯỢT */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
  }

  .left, .auth-links {
    width: 100%;
    justify-content: center;
  }

  .cv-btn {
    padding: 14px 28px;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .cv-btn {
    width: 80%;
    justify-content: center;
  }
}
</style>
