<template>
  <div class="contact-page">
    <div class="contact-container">
      <!-- Header -->
      <div class="contact-header">
        <div class="avatar-large">
          <span>{{ user?.name?.[0] || 'L' }}</span>
        </div>
        <h1>Liên hệ với tôi</h1>
        <p class="subtitle">Rất vui được kết nối và trao đổi cùng bạn!</p>
      </div>

      <!-- Thông tin liên hệ nhanh -->
      <div class="contact-grid">
        <a :href="'mailto:' + info.email" class="contact-card">
          <div class="icon-circle email">
            <i class="fas fa-envelope"></i>
          </div>
          <strong>Email</strong>
          <span>{{ info.email }}</span>
        </a>

        <a :href="'tel:' + info.phone" class="contact-card">
          <div class="icon-circle phone">
            <i class="fas fa-phone"></i>
          </div>
          <strong>Điện thoại</strong>
          <span>{{ info.phone }}</span>
        </a>

        <a :href="info.linkedin" target="_blank" class="contact-card">
          <div class="icon-circle linkedin">
            <i class="fab fa-linkedin"></i>
          </div>
          <strong>LinkedIn</strong>
<!--          <span>{{info.linkedin}}</span>-->
        </a>

        <a :href="info.github" target="_blank" class="contact-card">
          <div class="icon-circle github">
            <i class="fab fa-github"></i>
          </div>
          <strong>GitHub</strong>
<!--          <span>{{info.github}}</span>-->
        </a>

        <a :href="info.facebook" target="_blank" class="contact-card">
          <div class="icon-circle facebook">
            <i class="fab fa-facebook"></i>
          </div>
          <strong>Facebook</strong>
<!--          <span>{{info.facebook}}</span>-->
        </a>
      </div>

      <!-- Form liên hệ -->
      <div class="contact-form">
        <h2>Gửi tin nhắn trực tiếp</h2>
        <form @submit.prevent="sendMessage">
          <div class="form-group">
            <input v-model="form.name" type="text" placeholder="Họ và tên" required />
          </div>
          <div class="form-group">
            <input v-model="form.email" type="email" placeholder="Email của bạn" required />
          </div>
          <div class="form-group">
            <input v-model="form.subject" type="text" placeholder="Chủ đề" required />
          </div>
          <div class="form-group">
            <textarea
              v-model="form.message"
              rows="6"
              placeholder="Nội dung tin nhắn..."
              required></textarea>
          </div>
          <button type="submit" class="btn-send" :disabled="sending">
            <span v-if="!sending">
              <i class="fas fa-paper-plane"></i>
              Gửi tin nhắn
            </span>
            <span v-else>Đang gửi...</span>
          </button>
        </form>

        <div v-if="sentSuccess" class="success-msg">
          <i class="fas fa-check-circle"></i>
          Cảm ơn bạn! Tin nhắn đã được gửi thành công. Mình sẽ phản hồi sớm nhất!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuth } from '@/stores/auth'

const { user } = useAuth()

// Thông tin liên hệ (bạn sửa lại cho đúng)
const info = reactive({
  email: 'hatrongvu13@gmail.com',
  phone: '+84 943 561 685',
  linkedin: 'https://linkedin.com/in/vũ-hà-873078190/',
  github: 'https://github.com/hatrongvu13',
  facebook: 'https://facebook.com/iamhatrongvu',
})

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const sending = ref(false)
const sentSuccess = ref(false)

const sendMessage = () => {
  if (!form.name || !form.email || !form.message) return

  sending.value = true
  sentSuccess.value = false

  // Giả lập gửi mail (sau này dùng EmailJS, Formspree, hoặc backend)
  setTimeout(() => {
    console.log('Tin nhắn đã gửi:', form)
    sending.value = false
    sentSuccess.value = true
    Object.assign(form, { name: '', email: '', subject: '', message: '' })

    setTimeout(() => {
      sentSuccess.value = false
    }, 8000)
  }, 1200)
}

onMounted(() => {
  if (user.value?.name) form.name = user.value.name
  if (user.value?.email) form.email = user.value.email
})
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  /*background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);*/
  padding: 100px 1rem 4rem;
  display: flex;
  justify-content: center;
}

.contact-container {
  max-width: 900px;
  width: 100%;
  background: white;
  border-radius: 28px;
  box-shadow: 0 25px 70px rgba(102, 126, 234, 0.4);
  overflow: hidden;
  animation: fadeUp 0.8s ease-out;
}

.contact-header {
  text-align: center;
  padding: 3rem 2rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
.avatar-large {
  width: 110px;
  height: 110px;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.2rem;
  font-weight: 900;
  color: white;
  margin: 0 auto 1.5rem;
  box-shadow: 0 12px 35px rgba(255, 107, 107, 0.5);
  border: 6px solid rgba(255, 255, 255, 0.3);
}
.contact-header h1 {
  font-size: 2.6rem;
  margin: 0.5rem 0;
  font-weight: 800;
}
.subtitle {
  font-size: 1.1rem;
  opacity: 0.95;
  margin-top: 0.5rem;
}

/* Grid thông tin liên hệ */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 3rem 2rem 2rem;
  background: #f8f9fa;
}
.contact-card {
  background: white;
  padding: 1.8rem 1.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  text-decoration: none;
  color: #2c3e50;
}
.contact-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
.icon-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.8rem;
  color: white;
}
.icon-circle.email {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
}
.icon-circle.phone {
  background: linear-gradient(45deg, #667eea, #764ba2);
}
.icon-circle.linkedin {
  background: linear-gradient(45deg, #0077b5, #00a0dc);
}
.icon-circle.github {
  background: linear-gradient(45deg, #333, #444);
}

.icon-circle.facebook {
  background: linear-gradient(45deg, #5f7bfa, #2147d6);
}

.contact-card strong {
  display: block;
  margin: 0.8rem 0 0.4rem;
  font-size: 1.1rem;
  color: #3498db;
}
.contact-card span {
  font-size: 0.95rem;
  color: #7f8c8d;
}

/* Form liên hệ */
.contact-form {
  padding: 3rem 2.5rem;
  background: white;
}
.contact-form h2 {
  text-align: center;
  font-size: 1.9rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  font-size: 1rem;
  background: #f8f9fa;
  transition: all 0.3s;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 5px rgba(102, 126, 234, 0.15);
}
.btn-send {
  width: 100%;
  padding: 18px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.btn-send:hover:not(:disabled) {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.5);
}
.btn-send:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-msg {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #d4edda;
  color: #155724;
  border-radius: 16px;
  text-align: center;
  font-size: 1.1rem;
  border: 1px solid #c3e6cb;
  animation: fadeIn 0.6s;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-header {
    padding: 2.5rem 1.5rem 1.5rem;
  }
  .contact-header h1 {
    font-size: 2.2rem;
  }
  .avatar-large {
    width: 90px;
    height: 90px;
    font-size: 2.6rem;
  }
  .contact-grid {
    grid-template-columns: 1fr 1fr;
    padding: 2rem 1.5rem;
  }
  .contact-form {
    padding: 2.5rem 1.5rem;
  }
}
@media (max-width: 480px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
