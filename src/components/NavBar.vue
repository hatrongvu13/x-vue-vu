<template>
  <nav class="navbar has-shadow">
    <!-- LEFT: Logo + Trang chủ + CV -->
    <div class="nav-left">
      <router-link to="/" class="logo-link">
        <div class="logo-avatar">
          <span>{{ 'V' }}</span>
        </div>
      </router-link>

      <div class="main-links">
        <router-link to="/" class="nav-link home-link">
          <i class="fas fa-home"></i>
          Trang chủ
        </router-link>
      </div>
    </div>

    <!-- CENTER: Search bar (ẩn trên mobile) -->
    <div class="search-bar">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Tìm kiếm dự án, kỹ năng..." />
    </div>

    <!-- RIGHT: Auth + Menu -->
    <div class="nav-right">
      <router-link to="/cv" class="cv-btn">
        <i class="fas fa-file-alt"></i>
        CV của tôi
      </router-link>
      <!-- Khi đã đăng nhập -->
      <template v-if="user">
        <div class="user-info">
          <span class="greeting">
            Xin chào,
            <strong>{{ user.name }}</strong>
          </span>
          <div class="avatar-circle" @click="toggleMenu">
            <span>{{ user.name[0] }}</span>
          </div>
        </div>

        <!-- Dropdown Menu -->
        <transition name="slide">
          <div v-if="menuOpen" class="dropdown-menu">
            <router-link to="/about" class="menu-item">
              <i class="fas fa-user"></i>
              Giới thiệu
            </router-link>
            <router-link to="/contact" class="menu-item">
              <i class="fas fa-envelope"></i>
              Liên hệ
            </router-link>
            <div class="menu-divider"></div>

            <!-- Chỉ admin mới thấy -->
            <template v-if="isAdmin">
              <router-link to="/dashboard" class="menu-item admin">
                <i class="fas fa-tachometer-alt"></i>
                Dashboard
              </router-link>
              <router-link to="/admin/visitors" class="menu-item admin">
                <i class="fas fa-eye"></i>
                Lượt truy cập ({{ visitorCount }})
              </router-link>
              <router-link to="/admin/emails" class="menu-item admin">
                <i class="fas fa-users"></i>
                Email nhận CV ({{ emailListCount }})
              </router-link>
              <router-link to="/admin/cv" class="menu-item admin">
                <i class="fas fa-file-alt"></i>
                Quản lý CV
              </router-link>
              <div class="menu-divider"></div>
            </template>

            <button @click="handleLogout" class="menu-item logout">
              <i class="fas fa-sign-out-alt"></i>
              Đăng xuất
            </button>
          </div>
        </transition>
      </template>

      <!-- Khi chưa đăng nhập -->
      <template v-else>
        <router-link to="/login" class="login-btn">
          <i class="fas fa-sign-in-alt"></i>
          Đăng nhập
        </router-link>
      </template>

      <!-- Hamburger cho mobile -->
      <button
        class="hamburger"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :class="{ active: mobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="fade">
      <div v-if="mobileMenuOpen" class="mobile-overlay" @click="mobileMenuOpen = false">
        <div class="mobile-menu" @click.stop>
          <router-link to="/" @click="mobileMenuOpen = false">Trang chủ</router-link>
          <router-link to="/cv" @click="mobileMenuOpen = false">CV của tôi</router-link>
          <router-link to="/about" @click="mobileMenuOpen = false">Giới thiệu</router-link>
          <router-link to="/contact" @click="mobileMenuOpen = false">Liên hệ</router-link>

          <div class="mobile-auth" v-if="!user">
            <router-link to="/login" @click="mobileMenuOpen = false">Đăng nhập</router-link>
          </div>

          <template v-if="user">
            <div class="mobile-user">Xin chào, {{ user.name }}</div>
            <button @click="(handleLogout(), (mobileMenuOpen = false))" class="mobile-logout">
              Đăng xuất
            </button>
          </template>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '@/stores/auth'
import { useRouter } from 'vue-router'

const { user, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/')
}

const menuOpen = ref(false)
const mobileMenuOpen = ref(false)

// Giả lập dữ liệu (sau này lấy từ API)
const visitorCount = ref(1247)
const emailListCount = ref(89)

// Giả sử admin có email chứa 'admin' hoặc role
const isAdmin = computed(() => user.value?.email?.includes('admin') || user.value?.role === 'admin')

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// Đóng menu khi click ngoài
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-right')) menuOpen.value = false
})
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
.navbar.has-shadow {
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.35) !important;
}
/* LEFT */
.nav-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.logo-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 900;
  color: white;
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
  border: 3px solid rgba(255, 255, 255, 0.3);
}
.home-link {
  font-size: 1.35rem !important;
  font-weight: 800 !important;
  color: #a0e7ff !important;
  letter-spacing: 0.5px;
}
.home-link::after {
  background: #fff;
  height: 4px;
}

/* CV BUTTON */
.cv-btn {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  padding: 12px 26px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.05rem;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  transition: all 0.4s;
  display: flex;
  align-items: center;
  gap: 10px;
}
.cv-btn:hover {
  transform: translateY(-5px) scale(1.07);
  box-shadow: 0 18px 40px rgba(255, 107, 107, 0.6);
  background: linear-gradient(45deg, #ff5252, #ffb74d);
}

/* SEARCH BAR */
.search-bar {
  position: relative;
  max-width: 320px;
  flex: 1;
  margin: 0 2rem;
}
.search-bar i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0e7ff;
}
.search-bar input {
  width: 100%;
  padding: 12px 16px 12px 46px;
  border: none;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 0.95rem;
}
.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
.search-bar input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.25);
}

/* RIGHT */
.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}
.greeting {
  font-size: 0.95rem;
  opacity: 0.9;
}
.avatar-circle {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #a0e7ff, #667eea);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: white;
  font-size: 1.1rem;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  transition: 0.3s;
}
.avatar-circle:hover {
  transform: scale(1.1);
}

/* === DROPDOWN MENU - ĐỒNG BỘ HOÀN HẢO VỚI TOÀN BỘ GIAO DIỆN === */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  min-width: 280px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(102, 126, 234, 0.35);
  overflow: hidden;
  border: 1px solid rgba(102, 126, 234, 0.15);
  backdrop-filter: blur(15px);
  animation: dropdownAppear 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 1000;
}

@keyframes dropdownAppear {
  from {
    opacity: 0;
    transform: translateY(-15px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Mỗi item trong menu */
.menu-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 24px;
  color: #2c3e50;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 1rem;
  position: relative;
}

.menu-item i {
  font-size: 1.2rem;
  width: 26px;
  text-align: center;
  color: #667eea;
}

/* Hover đẹp như nút CV */
.menu-item:hover {
  background: linear-gradient(135deg, #667eea15, #764ba215);
  color: #667eea;
  padding-left: 32px;
  transform: translateX(4px);
}

.menu-item:hover i {
  color: #667eea;
  transform: scale(1.2);
}

/* Item admin và logout nổi bật hơn */
.menu-item.admin {
  color: #e74c3c;
  font-weight: 700;
}
.menu-item.admin i {
  color: #e74c3c;
}
.menu-item.admin:hover {
  background: rgba(231, 76, 60, 0.1);
  color: #c0392b;
}

/* ĐĂNG XUẤT – NỔI BẬT, ĐỒNG BỘ VỚI NÚT CV */
.menu-item.logout {
  margin: 12px 20px 16px;
  padding: 16px 20px !important;
  background: linear-gradient(45deg, #ff6b6b, #feca57) !important;
  color: white !important;
  border-radius: 16px;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  transition: all 0.4s ease;
  border: none !important;
  position: relative;
  overflow: hidden;
}

.menu-item.logout i {
  color: white !important;
  font-size: 1.3rem;
  transition: all 0.3s ease;
}

/* Hiệu ứng hover bay lên + bóng to hơn (giống nút CV) */
.menu-item.logout:hover {
  transform: translateY(-6px) scale(1.05);
  box-shadow: 0 20px 40px rgba(255, 107, 107, 0.6);
  background: linear-gradient(45deg, #ff5252, #ffb74d) !important;
}

/* Hiệu ứng sóng nhẹ khi hover (cực sang!) */
.menu-item.logout::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition:
    width 0.6s,
    height 0.6s;
  z-index: 0;
}
.menu-item.logout:hover::before {
  width: 300px;
  height: 300px;
}

/* Đảm bảo chữ và icon nằm trên sóng */
.menu-item.logout > * {
  position: relative;
  z-index: 1;
}

/* Xóa viền trên cũ (không cần nữa vì đã có margin + background riêng) */
.menu-item.logout {
  border-top: none !important;
}

/* Đường kẻ phân cách */
.menu-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #ddd, transparent);
  margin: 10px 20px;
}

/* Hiệu ứng mũi tên nhỏ chỉ lên avatar (rất sang!) */
.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -8px;
  right: 18px;
  width: 16px;
  height: 16px;
  background: white;
  border: 1px solid rgba(102, 126, 234, 0.15);
  transform: rotate(45deg);
  border-bottom: none;
  border-right: none;
  box-shadow: -3px -3px 10px rgba(0, 0, 0, 0.05);
  z-index: -1;
}

/* LOGIN BUTTON */
.login-btn {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 22px;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  transition: 0.3s;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.login-btn:hover {
  background: white;
  color: #667eea;
}

/* HAMBURGER */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
}
.hamburger span {
  width: 28px;
  height: 3px;
  background: white;
  border-radius: 3px;
  transition: 0.3s;
}
.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}
.hamburger.active span:nth-child(2) {
  opacity: 0;
}
.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* MOBILE MENU */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mobile-menu {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}
.mobile-menu a,
.mobile-menu button {
  display: block;
  padding: 1rem;
  font-size: 1.2rem;
  color: #2c3e50;
  text-decoration: none;
}
.mobile-user {
  padding: 1rem;
  font-weight: bold;
  color: #667eea;
}
.mobile-logout {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .search-bar {
    display: none;
  }
}
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }
  .main-links {
    display: none;
  }
  .hamburger {
    display: flex;
  }
  .nav-right {
    gap: 1rem;
  }
}
@media (max-width: 480px) {
  .cv-btn {
    padding: 10px 20px;
    font-size: 1rem;
  }
}
</style>
