<template>
  <div class="auth-container">
    <div class="auth-box">
      <!-- Avatar tròn gradient + chữ cái đầu (đồng bộ CV) -->
      <div class="logo">
        <div class="avatar-placeholder">
          <span class="initial">V</span>
        </div>
      </div>

      <h1>Đăng ký tài khoản</h1>
      <p class="subtitle">Tạo tài khoản để tải CV và quản lý hồ sơ cá nhân</p>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="input-group">
          <i class="fas fa-user"></i>
          <input
            v-model="name"
            type="text"
            placeholder="Họ và tên (tùy chọn)"
            autocomplete="name"
          />
        </div>

        <div class="input-group">
          <i class="fas fa-envelope"></i>
          <input
            v-model="email"
            type="email"
            placeholder="email@example.com"
            required
            autocomplete="email"
          />
        </div>

        <div class="input-group">
          <i class="fas fa-lock"></i>
          <input
            v-model="password"
            type="password"
            placeholder="Mật khẩu (tối thiểu 6 ký tự)"
            required
            minlength="6"
            autocomplete="new-password"
          />
        </div>

        <button type="submit" class="btn-register" :disabled="loading">
          <span v-if="!loading">
            <i class="fas fa-user-plus"></i> Đăng ký ngay
          </span>
          <span v-else>Đang tạo tài khoản...</span>
        </button>
      </form>

      <div class="extra-links">
        <p>
          Đã có tài khoản?
          <router-link to="/login" class="link-login">Đăng nhập ngay</router-link>
        </p>
        <router-link to="/" class="link-home">
          <i class="fas fa-home"></i> Quay về trang chủ
        </router-link>
      </div>
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
const loading = ref(false)
const router = useRouter()
const { register } = useAuth()

const handleRegister = async () => {
  if (!email.value || !password.value) {
    alert('Vui lòng nhập đầy đủ email và mật khẩu!')
    return
  }
  if (password.value.length < 6) {
    alert('Mật khẩu phải có ít nhất 6 ký tự!')
    return
  }

  loading.value = true
  setTimeout(() => {
    register(email.value, password.value, name.value || 'Người dùng mới')
    router.push('/')
    loading.value = false
  }, 800)
}
</script>

<style scoped>
/* HOÀN TOÀN ĐỒNG BỘ VỚI LOGIN + CV + NAVBAR */
.auth-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
}

.auth-container::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: repeating-conic-gradient(from 30deg, transparent 0%, rgba(255,255,255,0.03) 10%, transparent 20%);
  animation: rotate 35s linear infinite;
  opacity: 0.3;
  pointer-events: none;
}
@keyframes rotate { to { transform: rotate(360deg); } }

.auth-box {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
  width: 100%;
  max-width: 440px;
  text-align: center;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.logo { margin-bottom: 1.5rem; }

.avatar-placeholder {
  width: 110px;
  height: 110px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.6rem;
  font-weight: 900;
  color: white;
  box-shadow: 0 12px 35px rgba(255, 107, 107, 0.45);
  border: 6px solid rgba(255,255,255,0.3);
  animation: pulse 4s infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0.5rem 0;
  font-weight: 800;
}

.subtitle {
  color: #7f8c8d;
  margin-bottom: 2.2rem;
  font-size: 1.02rem;
  line-height: 1.5;
}

.register-form { margin: 2rem 0; }

.input-group {
  position: relative;
  margin: 1.3rem 0;
}

.input-group i {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  font-size: 1.15rem;
  z-index: 2;
}

.input-group input {
  width: 100%;
  padding: 17px 17px 17px 52px;
  border: 2px solid #e8ecf4;
  border-radius: 16px;
  font-size: 1rem;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 5px rgba(102, 126, 234, 0.18);
  transform: translateY(-2px);
}

.btn-register {
  width: 100%;
  padding: 18px;
  margin: 2rem 0 1rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.btn-register:hover:not(:disabled) {
  transform: translateY(-5px);
  box-shadow: 0 18px 40px rgba(102, 126, 234, 0.5);
}

.btn-register:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.extra-links {
  margin-top: 2rem;
  font-size: 0.98rem;
  color: #95a5a6;
}

.link-login {
  color: #667eea;
  font-weight: 700;
  text-decoration: none;
}

.link-login:hover {
  color: #764ba2;
  text-decoration: underline;
}

.link-home {
  display: block;
  margin-top: 1.8rem;
  color: #bdc3c7;
  text-decoration: none;
  font-size: 0.92rem;
  transition: color 0.3s;
}

.link-home:hover {
  color: #667eea;
}

/* Responsive */
@media (max-width: 480px) {
  .auth-box {
    padding: 2.5rem 2rem;
    border-radius: 20px;
  }
  h1 { font-size: 2.2rem; }
  .avatar-placeholder { width: 95px; height: 95px; font-size: 3rem; }
  .btn-register { padding: 16px; font-size: 1.1rem; }
}
</style>
