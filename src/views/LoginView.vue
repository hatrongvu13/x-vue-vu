<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="logo">
        <div class="avatar-placeholder">
          <span class="initial">{{ firstLetter }}</span>
        </div>
      </div>

      <h1>Đăng nhập</h1>
      <p class="subtitle">Chào mừng trở lại! Vui lòng nhập thông tin</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <i class="fas fa-envelope"></i>
          <input
            v-model="email"
            type="email"
            placeholder="email@example.com"
            required
            autocomplete="email" />
        </div>

        <div class="input-group">
          <i class="fas fa-lock"></i>
          <input
            v-model="password"
            type="password"
            placeholder="Mật khẩu"
            required
            autocomplete="current-password" />
        </div>

        <button type="submit" class="btn-login">
          <span v-if="!loading">Đăng nhập</span>
          <span v-else>Đang đăng nhập...</span>
        </button>
      </form>

      <div class="extra-links">
        <p>
          Chưa có tài khoản?
          <router-link to="/register" class="link-register">Đăng ký ngay</router-link>
        </p>
        <router-link to="/" class="link-home">
          <i class="fas fa-home"></i>
          Quay về trang chủ
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'
import api from '@/api/index.js'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const { login, user } = useAuth()

// Lấy chữ cái đầu tên (nếu có user) hoặc mặc định
const firstLetter = computed(() => {
  return user.value?.name?.charAt(0).toUpperCase() || 'V'
})

onMounted(() => {
  if (user.value) router.push('/')
})

const handleLogin = async () => {
  if (!email.value || !password.value) return
  try {
    loading.value = true
    const response = await api.post('/user/login', { email: email.value, password: password.value })
    console.log(response)
    const { data } = response
    if (data && data.token) {
      login(email.value, password.value)
      localStorage.setItem('accessToken', data.token)
      await router.push('/')
    }
  } catch (error) {
    alert(error.response.data.error || 'Login failed');
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
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

/* Hiệu ứng nền nhẹ */
.auth-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: repeating-conic-gradient(
    from 30deg,
    transparent 0%,
    rgba(255, 255, 255, 0.03) 10%,
    transparent 20%
  );
  animation: rotate 30s linear infinite;
  pointer-events: none;
  opacity: 0.3;
}
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.auth-box {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
  width: 100%;
  max-width: 420px;
  text-align: center;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.logo {
  margin-bottom: 1.5rem;
}
.avatar-placeholder {
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.2rem;
  font-weight: 900;
  color: white;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
  border: 5px solid rgba(255, 255, 255, 0.3);
}

h1 {
  font-size: 2.4rem;
  color: #2c3e50;
  margin: 0.5rem 0;
  font-weight: 800;
}

.subtitle {
  color: #7f8c8d;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.login-form {
  margin: 2rem 0;
}

.input-group {
  position: relative;
  margin: 1.2rem 0;
}

.input-group i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  font-size: 1.1rem;
  z-index: 2;
}

.input-group input {
  width: 100%;
  padding: 16px 16px 16px 50px;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  font-size: 1rem;
  transition: all 0.3s;
  background: #f8f9fa;
}

.input-group input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
}

.btn-login {
  width: 100%;
  padding: 16px;
  margin: 1.5rem 0;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-login:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.5);
}

.btn-login:active {
  transform: translateY(-1px);
}

.extra-links {
  margin-top: 2rem;
  font-size: 0.95rem;
  color: #7f8c8d;
}

.link-register {
  color: #667eea;
  font-weight: 700;
  text-decoration: none;
}

.link-register:hover {
  color: #764ba2;
  text-decoration: underline;
}

.link-home {
  display: block;
  margin-top: 1.5rem;
  color: #95a5a6;
  text-decoration: none;
  font-size: 0.9rem;
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
  h1 {
    font-size: 2.1rem;
  }
  .avatar-placeholder {
    width: 90px;
    height: 90px;
    font-size: 2.8rem;
  }
}
</style>
