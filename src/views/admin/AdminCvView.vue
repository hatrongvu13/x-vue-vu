<!-- src/views/AdminCV.vue -->
<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>
        <i class="fas fa-file-alt"></i>
        Quản lý CV cá nhân
      </h1>
      <div class="action-buttons">
        <button @click="saveCV" class="btn-save">
          <i class="fas fa-save"></i>
          Lưu thay đổi
        </button>
        <button @click="previewCV" class="btn-preview">
          <i class="fas fa-eye"></i>
          Xem trước CV
        </button>
      </div>
    </div>

    <!-- Tabs điều hướng -->
    <div class="cv-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="{ active: activeTab === tab.id }"
        class="tab-btn">
        <i :class="tab.icon"></i>
        {{ tab.label }}
      </button>
    </div>

    <!-- Nội dung theo tab -->
    <div class="cv-content">
      <!-- Thông tin cá nhân -->
      <div v-show="activeTab === 'info'" class="section-card">
        <h2>
          <i class="fas fa-user"></i>
          Thông tin cá nhân
        </h2>
        <div class="form-grid">
          <div class="form-group">
            <label>Họ và tên</label>
            <input v-model="cv.name" placeholder="Nguyễn Văn A" />
          </div>
          <div class="form-group">
            <label>Chức danh</label>
            <input v-model="cv.title" placeholder="Frontend Developer" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="cv.email" type="email" />
          </div>
          <div class="form-group">
            <label>Số điện thoại</label>
            <input v-model="cv.phone" />
          </div>
          <div class="form-group">
            <label>Website / GitHub</label>
            <input v-model="cv.website" placeholder="https://github.com/yourname" />
          </div>
          <div class="form-group">
            <label>Địa chỉ</label>
            <input v-model="cv.address" placeholder="TP. Hồ Chí Minh, Việt Nam" />
          </div>
        </div>
      </div>

      <!-- Giới thiệu bản thân -->
      <div v-show="activeTab === 'about'" class="section-card">
        <h2>
          <i class="fas fa-address-card"></i>
          Giới thiệu bản thân
        </h2>
        <textarea
          v-model="cv.about"
          rows="8"
          placeholder="Viết vài dòng giới thiệu nổi bật về bạn..."></textarea>
      </div>

      <!-- Kinh nghiệm làm việc -->
      <div v-show="activeTab === 'experience'" class="section-card">
        <h2>
          <i class="fas fa-briefcase"></i>
          Kinh nghiệm làm việc
        </h2>
        <div v-for="(exp, i) in cv.experience" :key="i" class="item-block">
          <div class="item-header">
            <input v-model="exp.company" placeholder="Tên công ty" />
            <button @click="cv.experience.splice(i, 1)" class="btn-delete">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <input v-model="exp.position" placeholder="Vị trí" />
          <div class="date-range">
            <input v-model="exp.from" type="month" />
            <span>→</span>
            <input v-model="exp.to" type="month" placeholder="Hiện tại" />
          </div>
          <textarea
            v-model="exp.description"
            rows="4"
            placeholder="Mô tả công việc, thành tựu..."></textarea>
        </div>
        <button @click="addExperience" class="btn-add">
          <i class="fas fa-plus"></i>
          Thêm kinh nghiệm
        </button>
      </div>

      <!-- Kỹ năng -->
      <div v-show="activeTab === 'skills'" class="section-card">
        <h2>
          <i class="fas fa-cogs"></i>
          Kỹ năng
        </h2>
        <div class="skills-grid">
          <div v-for="(skill, i) in cv.skills" :key="i" class="skill-item">
            <input v-model="skill.name" placeholder="Tên kỹ năng" />
            <div class="level-slider">
              <input type="range" v-model.number="skill.level" min="1" max="100" />
              <span>{{ skill.level }}%</span>
            </div>
            <button @click="cv.skills.splice(i, 1)" class="btn-delete-small">×</button>
          </div>
        </div>
        <button @click="addSkill" class="btn-add">
          <i class="fas fa-plus"></i>
          Thêm kỹ năng
        </button>
      </div>

      <!-- Học vấn -->
      <div v-show="activeTab === 'education'" class="section-card">
        <h2>
          <i class="fas fa-graduation-cap"></i>
          Học vấn
        </h2>
        <div v-for="(edu, i) in cv.education" :key="i" class="item-block">
          <input v-model="edu.school" placeholder="Trường học" />
          <input v-model="edu.degree" placeholder="Bằng cấp / Chuyên ngành" />
          <div class="date-range">
            <input v-model="edu.from" type="month" />
            <span>→</span>
            <input v-model="edu.to" type="month" />
          </div>
          <button @click="cv.education.splice(i, 1)" class="btn-delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <button @click="addEducation" class="btn-add">
          <i class="fas fa-plus"></i>
          Thêm học vấn
        </button>
      </div>
    </div>

    <!-- Thông báo lưu thành công -->
    <transition name="fade">
      <div v-if="saved" class="saved-notif">
        <i class="fas fa-check-circle"></i>
        Đã lưu CV thành công!
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Dữ liệu CV (sau này lưu vào localStorage hoặc API)
const cv = reactive({
  name: 'Trần Minh Quân',
  title: 'Senior Fullstack Developer',
  email: 'quan.tm@company.com',
  phone: '0908 123 456',
  website: 'https://github.com/minhquan',
  address: 'Quận 7, TP. Hồ Chí Minh',
  about: 'Đam mê lập trình, yêu thích Vue.js & Node.js. Có hơn 6 năm kinh nghiệm phát triển web, luôn học hỏi công nghệ mới và xây dựng sản phẩm chất lượng cao.',
  experience: [
    { company: 'FPT Software', position: 'Fullstack Developer', from: '2022-01', to: '', description: 'Phát triển hệ thống quản lý nhân sự với Vue 3 + Node.js' },
    { company: 'VNG Corporation', position: 'Frontend Engineer', from: '2020-06', to: '2021-12', description: 'Xây dựng giao diện game web & dashboard admin' }
  ],
  skills: [
    { name: 'Vue.js / Nuxt', level: 95 },
    { name: 'React / Next.js', level: 85 },
    { name: 'Node.js / Express', level: 90 },
    { name: 'TypeScript', level: 88 },
    { name: 'Tailwind CSS', level: 92 }
  ],
  education: [
    { school: 'ĐH Bách Khoa TP.HCM', degree: 'Kỹ sư Công nghệ Thông tin', from: '2015-09', to: '2019-06' }
  ]
})

const tabs = [
  { id: 'info', label: 'Thông tin', icon: 'fas fa-user' },
  { id: 'about', label: 'Giới thiệu', icon: 'fas fa-address-card' },
  { id: 'experience', label: 'Kinh nghiệm', icon: 'fas fa-briefcase' },
  { id: 'skills', label: 'Kỹ năng', icon: 'fas fa-cogs' },
  { id: 'education', label: 'Học vấn', icon: 'fas fa-graduation-cap' }
]

const activeTab = ref('info')
const saved = ref(false)

// Thêm mục mới
const addExperience = () => cv.experience.push({ company: '', position: '', from: '', to: '', description: '' })
const addSkill = () => cv.skills.push({ name: '', level: 70 })
const addEducation = () => cv.education.push({ school: '', degree: '', from: '', to: '' })

// Lưu CV
const saveCV = () => {
  // Gọi API thực tế ở đây: PUT /api/admin/cv
  localStorage.setItem('admin-cv-data', JSON.stringify(cv))
  saved.value = true
  setTimeout(() => saved.value = false, 3000)
}

// Xem trước CV (mở trang /cv công khai)
const previewCV = () => {
  window.open('/cv', '_blank')
}

// Load dữ liệu đã lưu khi mở trang
if (localStorage.getItem('admin-cv-data')) {{
  Object.assign(cv, JSON.parse(localStorage.getItem('admin-cv-data')))
}}
</script>

<style scoped>
.admin-container {
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}
.admin-header h1 {
  font-size: 2.2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}
.btn-save,
.btn-preview {
  padding: 12px 26px;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
  transition: all 0.4s;
  color: white;
}
.btn-save {
  background: linear-gradient(45deg, #27ae60, #2ecc71);
}
.btn-preview {
  background: linear-gradient(45deg, #667eea, #764ba2);
}
.btn-save:hover,
.btn-preview:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.3);
}

.cv-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  background: white;
  padding: 0.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
  overflow: hidden;
}
.tab-btn {
  flex: 1;
  min-width: 140px;
  padding: 14px 20px;
  background: none;
  border: none;
  font-weight: 600;
  color: #95a5a6;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.tab-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.section-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 50px rgba(102, 126, 234, 0.15);
  margin-bottom: 2rem;
}
.section-card h2 {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s;
  background: #f8f9fa;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
}

.item-block {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  position: relative;
}
.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.item-header input {
  font-weight: bold;
  font-size: 1.1rem;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}
.date-range input {
  width: 140px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
.skill-item {
  background: #f1f2f6;
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.level-slider {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.level-slider input[type='range'] {
  flex: 1;
}
.level-slider span {
  min-width: 50px;
  font-weight: bold;
  color: #667eea;
}

.btn-add {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.4s;
}
.btn-add:hover {
  transform: translateY(-4px);
}

.btn-delete,
.btn-delete-small {
  background: #e74c3c;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
}
.btn-delete-small {
  width: 28px;
  height: 28px;
  font-size: 1.2rem;
}

.saved-notif {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #27ae60;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(39, 174, 96, 0.4);
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 700;
  z-index: 9999;
  animation: slideUp 0.5s ease;
}
@keyframes slideUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
