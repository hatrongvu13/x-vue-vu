<template>
  <div class="cv-page">
    <!-- NÚT CHUYỂN NGÔN NGỮ -->
    <div class="language-switcher">
      <button @click="lang = 'vi'" :class="{ active: lang === 'vi' }">VI</button>
      <button @click="lang = 'en'" :class="{ active: lang === 'en' }">EN</button>
    </div>
    <!-- Nút chức năng (chỉ hiện khi đã login) -->
    <!--    <div v-if="isLoggedIn" class="cv-actions">-->
    <div class="cv-actions">
      <button v-if="isLoggedIn" @click="editMode = !editMode" class="btn-edit">
        {{
          editMode
            ? lang === 'vi'
              ? 'Xem trước'
              : 'Preview'
            : lang === 'vi'
              ? 'Chỉnh sửa CV'
              : 'Edit CV'
        }}
      </button>
      <button @click="exportPDF" class="btn-pdf">
        {{ lang === 'vi' ? 'Xuất PDF' : 'Download PDF' }}
      </button>
    </div>

    <!-- GHI CHÚ NỔI GÓC PHẢI DƯỚI - CHỈ HIỆN KHI CHƯA LOGIN -->
    <!--    <div v-if="!isLoggedIn" class="floating-note">-->
    <!--      <div class="note-content">-->
    <!--        <h4>Muốn tải CV đẹp (PDF)?</h4>-->
    <!--        <p>Đăng nhập hoặc để lại email để nhận ngay!</p>-->
    <!--        <div class="email-form">-->
    <!--          <input-->
    <!--            v-model="visitorEmail"-->
    <!--            type="email"-->
    <!--            placeholder="you@example.com"-->
    <!--            @keyup.enter="sendCVViaEmail"-->
    <!--          />-->
    <!--          <button @click="sendCVViaEmail">Gửi CV cho tôi</button>-->
    <!--        </div>-->
    <!--        <router-link to="/login" class="login-link">Đăng nhập ngay</router-link>-->
    <!--      </div>-->
    <!--      <button class="close-btn" @click="showNote = false">×</button>-->
    <!--    </div>-->
    <!-- POPUP GHI CHÚ + NÚT NHỎ KHI ĐÓNG -->
    <template v-if="!isLoggedIn">
      <!-- Popup lớn -->
      <transition name="fade">
        <div v-if="showNote" class="floating-note">
          <div class="note-content">
            <h4>{{ lang === 'vi' ? 'Muốn tải CV đẹp (PDF)?' : 'Want my beautiful CV (PDF)?' }}</h4>
            <p>
              {{
                lang === 'vi'
                  ? 'Đăng nhập hoặc để lại email để nhận ngay!'
                  : 'Log in or leave your email to get it!'
              }}
            </p>
            <div class="email-form">
              <input
                v-model="visitorEmail"
                type="email"
                placeholder="email@example.com"
                @keyup.enter="sendCVViaEmail"
              />
              <button @click="sendCVViaEmail">
                {{ lang === 'vi' ? 'Gửi cho tôi' : 'Send me' }}
              </button>
            </div>
            <router-link to="/login" class="login-link">{{
              lang === 'vi' ? 'Đăng nhập ngay' : 'Log in now'
            }}</router-link>
          </div>
          <button class="close-btn" @click="showNote = false" title="Thu nhỏ">X</button>
        </div>
      </transition>
      <transition name="fade">
        <div
          v-if="!showNote"
          class="mini-cv-button"
          @click="showNote = true"
          title="Mở lại form tải CV"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
            <path
              d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
            />
          </svg>
          <span>CV</span>
        </div>
      </transition>
    </template>

    <!-- Chế độ chỉnh sửa -->
    <div v-if="editMode && isLoggedIn" class="edit-form">
      <h2>Chỉnh sửa CV</h2>
      <textarea
        v-model="editableData.summary"
        rows="4"
        placeholder="Giới thiệu bản thân"
      ></textarea>
      <br /><br />

      <h3>
        {{ lang === 'vi' ? 'Kinh nghiệm làm việc' : 'Work Experience'
        }}{{ lang === 'vi' ? 'Kinh nghiệm làm việc' : 'Work Experience' }}
      </h3>
      <div v-for="(exp, i) in editableData.experience" :key="i" class="exp-item">
        <input v-model="exp.company" placeholder="Công ty" />
        <input v-model="exp.position" placeholder="Vị trí" />
        <input v-model="exp.duration" placeholder="Thời gian" />
        <textarea v-model="exp.description[0]" placeholder="Mô tả công việc"></textarea>
        <button @click="editableData.experience.splice(i, 1)" class="btn-del">Xóa</button>
      </div>
      <button @click="addExperience">+ Thêm kinh nghiệm</button>

      <button @click="saveCV" class="btn-save">Lưu CV</button>
    </div>

    <!-- Xem CV (bản đẹp) -->
    <div id="cv-print" class="cv-container" v-if="!editMode">
      <div class="cv-header">
        <div class="avatar">
          <img src="/images/IMG_1238.JPG" alt="Avatar" />
          <!-- Thay link trên bằng ảnh của bạn (dùng Imgur, Cloudinary, hoặc public/avatar.jpg) -->
        </div>

        <h1 class="name">{{ cv.name }}</h1>
        <h2 class="title">{{ cv.title }}</h2>

        <div class="contact-info">
          <a :href="'mailto:' + cv.email" class="contact-item">
            <i class="fas fa-envelope"></i>
            <span>{{ cv.email }}</span>
          </a>

          <a :href="'tel:' + cv.phone.replace(/\s/g,'')" class="contact-item">
            <i class="fas fa-phone"></i>
            <span>{{ cv.phone }}</span>
          </a>

          <div class="contact-item">
            <i class="fas fa-location-dot"></i>
            <span>{{ cv.location }}</span>
          </div>

          <a :href="cv.website" target="_blank" class="contact-item">
            <i class="fas fa-globe"></i>
            <span>{{ cv.website.replace('https://', '') }}</span>
          </a>
        </div>
      </div>

      <section class="section">
        <h3>{{ lang === 'vi' ? 'Giới thiệu' : 'About Me' }}</h3>
        <p>{{ cv.summary }}</p>
      </section>

      <section class="section">
        <h3>{{ lang === 'vi' ? 'Kinh nghiệm làm việc' : 'Work Experience' }}</h3>
        <div v-for="exp in cv.experience" :key="exp.company" class="job">
          <div class="job-header">
            <strong>{{ exp.position }}</strong> tại <strong>{{ exp.company }}</strong>
            <span class="duration">{{ exp.duration }}</span>
          </div>
          <ul>
            <li v-for="desc in exp.description" :key="desc">{{ desc }}</li>
          </ul>
        </div>
      </section>

      <section class="section">
        <h3>{{ lang === 'vi' ? 'Học vấn' : 'Education' }}</h3>
        <div v-for="edu in cv.education" :key="edu.school">
          <strong>{{ edu.school }}</strong> – {{ edu.major }}<br />
          <small>{{ edu.duration }} | GPA: {{ edu.gpa }}</small>
        </div>
      </section>

      <section class="section">
        <h3>{{ lang === 'vi' ? 'Kỹ năng' : 'Skills' }}</h3>
        <div class="skills">
          <span v-for="skill in cv.skills" :key="skill" class="skill-tag">{{ skill }}</span>
        </div>
      </section>

      <section class="section">
        <h3>{{ lang === 'vi' ? 'Ngoại ngữ' : 'Languages' }}</h3>
        <div v-for="lang in cv.languages" :key="lang.name">{{ lang.name }}: {{ lang.level }}</div>
      </section>

      <section class="section">
        <h3>{{ lang === 'vi' ? 'Dự án nổi bật' : 'Featured Projects' }}</h3>
        <div v-for="proj in cv.projects" :key="proj.id" class="project-item">
          <div class="project-header">
            <strong>{{ proj.title }}</strong>
            <span class="year">{{ proj.year }}</span>
          </div>
          <p class="short-desc">{{ proj.shortDesc }}</p>

          <div class="online-only">
            <router-link :to="`/project/${proj.id}`" class="btn-detail">
              {{ lang === 'vi' ? 'Xem chi tiết' : 'View Detail' }}
            </router-link>
            <a :href="proj.link" target="_blank" v-if="proj.link">Live Demo</a>
          </div>
          <div class="print-only">
            <p>
              <strong>{{ lang === 'vi' ? 'Mô tả chi tiết:' : 'Detailed Description:' }}</strong>
            </p>
            <div style="white-space: pre-line">{{ proj.fullDesc }}</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/stores/auth'
import cvData from '@/data/cv-data.json'
import html2pdf from 'html2pdf.js'

const { user } = useAuth()
const isLoggedIn = computed(() => !!user.value)

const lang = ref('vi')
const cv = computed(() => cvData[lang.value])
const editableData = ref({ ...cvData[lang.value] })
const editMode = ref(false)
const visitorEmail = ref('')
const showNote = ref(true)

// Load CV đã lưu từ localStorage (nếu có)
onMounted(() => {
  const saved = localStorage.getItem('my-cv-data')
  if (saved) {
    Object.assign(cv.value, JSON.parse(saved))
    Object.assign(editableData.value, JSON.parse(saved))
  }
})

const addExperience = () => {
  editableData.value.experience.push({
    company: '',
    position: '',
    duration: '',
    description: [''],
  })
}

const saveCV = () => {
  localStorage.setItem('my-cv-data', JSON.stringify(editableData.value))
  Object.assign(cv.value, editableData.value)
  editMode.value = false
  alert('Đã lưu CV thành công!')
}

const exportPDF = () => {
  const element = document.getElementById('cv-print')
  const filename =
    lang.value === 'vi'
      ? `${cvData.vi.name.replace(/\s/g, '_')}_LTV_JAVA.pdf`
      : `${cvData.en.name.replace(/\s/g, '_')}_JAVA_DEVELOPER.pdf`

  const opt = {
    margin: 0.7,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  }
  html2pdf()
    // .set({ margin: 1, filename: filename, html2canvas: { scale: 2 } })
    .set(opt)
    .from(element)
    .save()
}

const sendCVViaEmail = () => {
  if (!visitorEmail.value) {
    alert('Vui lòng nhập email!')
    return
  }
  alert(
    `Cảm ơn! CV sẽ được gửi đến: ${visitorEmail.value}\n(Chức năng gửi mail thật sẽ làm sau nhé)`,
  )
  visitorEmail.value = ''
}
</script>

<style scoped>
.cv-page {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
}
.cv-actions {
  text-align: right;
  margin-bottom: 1rem;
}
.btn-edit,
.btn-pdf,
.btn-save {
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.btn-edit {
  background: #f39c12;
  color: white;
}
.btn-pdf {
  background: #e74c3c;
  color: white;
}
.btn-save {
  background: #27ae60;
  color: white;
  font-size: 1.1rem;
}

.cv-container {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  line-height: 1.6;
  color: #2c3e50;
}
.cv-header h1 {
  font-size: 2.8rem;
  color: #2c3e50;
}
.cv-header h2 {
  font-size: 1.6rem;
  color: #3498db;
  margin: 10px 0;
}

.section {
  margin: 30px 0;
}
.section h3 {
  color: #3498db;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
  margin-bottom: 15px;
  font-size: 1.4rem;
}

.job-header {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  margin-bottom: 8px;
}
.duration {
  color: #95a5a6;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.skill-tag {
  background: #3498db;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin: 5px;
}

/* Form chỉnh sửa */
.edit-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}
.edit-form textarea,
.edit-form input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.exp-item {
  border: 1px solid #eee;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  background: white;
}
.btn-del {
  background: #e74c3c;
  color: white;
  padding: 5px 10px;
}

.project-item {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #ddd;
}
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.year {
  color: #e67e22;
  font-weight: bold;
}
.short-desc {
  margin: 10px 0;
  font-style: italic;
  color: #555;
}
.btn-detail {
  display: inline-block;
  background: #3498db;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-top: 10px;
}

/* Ẩn khi xem web, hiện khi in */
.online-only {
  display: block;
}
.print-only {
  display: none;
}

/* Hiện chi tiết khi in PDF */
@media print {
  .online-only {
    display: none !important;
  }
  .print-only {
    display: block !important;
  }
  .cv-actions {
    display: none !important;
  }
  body {
    background: white;
  }
}

/* GHI CHÚ NỔI MỚI */
.floating-note {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 340px;
  z-index: 1000;
  animation: floatIn 0.6s ease-out;
}

.note-content h4 {
  margin: 0 0 8px 0;
  font-size: 1.3rem;
}
.note-content p {
  margin: 8px 0;
  font-size: 0.95rem;
  opacity: 0.9;
}

.email-form {
  display: flex;
  margin: 12px 0;
  gap: 8px;
}
.email-form input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
}
.email-form button {
  background: #fff;
  color: #667eea;
  border: none;
  padding: 0 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.login-link {
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #fff;
  text-decoration: underline;
  font-weight: bold;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 1.4rem;
  cursor: pointer;
}

@keyframes floatIn {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 480px) {
  .floating-note {
    left: 10px;
    right: 10px;
    bottom: 10px;
    max-width: none;
  }
}
/* NÚT NHỎ KHI ĐÓNG POPUP */
.mini-cv-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(231, 76, 60, 0.5);
  cursor: pointer;
  z-index: 999;
  font-weight: bold;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.mini-cv-button:hover {
  transform: scale(1.15);
  box-shadow: 0 12px 35px rgba(231, 76, 60, 0.7);
}

/* Hiệu ứng fade mượt */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s,
    transform 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.language-switcher {
  position: absolute;
  top: 80px;
  right: 20px;
  background: white;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.language-switcher button {
  padding: 10px 20px;
  border: none;
  background: #ecf0f1;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.language-switcher button.active {
  background: #3498db;
  color: white;
}

.language-switcher button:hover:not(.active) {
  background: #bdc3c7;
}

.cv-header {
  text-align: center;
  padding: 2.5rem 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px 20px 0 0;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.cv-header::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(45deg,
  rgba(255,255,255,0.1) 0%,
  rgba(255,255,255,0) 50%
  );
  border-radius: 20px 20px 0 0;
  pointer-events: none;
}

.avatar {
  width: 140px;
  height: 140px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 6px solid rgba(255,255,255,0.3);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  background: white;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  font-size: 2.8rem;
  margin: 0.5rem 0;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.title {
  font-size: 1.6rem;
  margin: 0.5rem 0 1.5rem;
  opacity: 0.95;
  font-weight: 400;
  letter-spacing: 1px;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  font-size: 0.95rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  opacity: 0.9;
  transition: all 0.3s;
}

.contact-item:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.contact-item i {
  font-size: 19px;
  width: 22px;
  text-align: center;
  color: #a0e7ff;
}

/* Responsive */
@media (max-width: 640px) {
  .name { font-size: 2.2rem; }
  .title { font-size: 1.4rem; }
  .avatar { width: 110px; height: 110px; }
  .contact-info { flex-direction: column; gap: 0.8rem; }
}
</style>
