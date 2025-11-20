<template>
  <div class="cv-page">
    <div class="cv-topbar">
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
    </div>

    <!-- POPUP TẢI CV KHI CHƯA LOGIN - HIỆU ỨNG SIÊU MƯỢT -->
    <template v-if="!isLoggedIn">
      <!-- Popup lớn: hiện từ dưới lên, đóng thì lặn xuống + rung nhẹ -->
      <transition
        name="slide-fade"
        @enter="onEnter"
        @leave="onLeave"
        mode="out-in"
      >
        <div v-if="showNote" class="floating-note">
          <div class="note-content">
            <h4>{{ lang === 'vi' ? 'Muốn tải CV đẹp (PDF)?' : 'Want my CV (PDF)?' }}</h4>
            <p>{{ lang === 'vi' ? 'Đăng nhập hoặc để lại email để nhận ngay!' : 'Log in or leave your email!' }}</p>
            <div class="email-form">
              <input v-model="visitorEmail" type="email" placeholder="email@example.com" @keyup.enter="sendCVViaEmail" />
              <button @click="sendCVViaEmail">{{ lang === 'vi' ? 'Gửi cho tôi' : 'Send me' }}</button>
            </div>
            <router-link to="/login" class="login-link">
              {{ lang === 'vi' ? 'Đăng nhập ngay' : 'Log in now' }}
            </router-link>
          </div>
          <button class="close-btn" @click="showNote = false" title="Thu nhỏ">X</button>
        </div>
      </transition>

      <!-- Nút nhỏ: hiện từ dưới lên mượt -->
      <transition name="bounce">
        <div v-if="!showNote" class="mini-cv-button" @click="showNote = true" title="Mở lại form tải CV">
          <i class="fas fa-file-pdf"></i>
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

          <a :href="'tel:' + cv.phone.replace(/\s/g, '')" class="contact-item">
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
  html2pdf().set(opt).from(element).save()
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
  position: relative;
}
/* THANH CHỨC NĂNG CỐ ĐỊNH TRÊN CÙNG - KHÔNG BỊ ĐÈ NỮA */
.cv-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0 10px;
}

/* NÚT XUẤT PDF + CHỈNH SỬA */
.cv-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.btn-edit,
.btn-pdf,
.btn-save {
  padding: 12px 24px;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}
.btn-edit {
  background: linear-gradient(45deg, #f39c12, #e67e22);
  color: white;
}
.btn-pdf {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
}
.btn-save {
  background: #27ae60;
  color: white;
  font-size: 1.1rem;
}

.btn-edit:hover,
.btn-pdf:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
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

.cv-header h2.title {
  font-size: 1.75rem; /* to hơn một chút */
  font-weight: 700; /* đậm hơn */
  margin: 12px 0 20px;
  color: #ffffff; /* trắng tinh để nổi bật nhất */
  text-shadow:
    0 2px 8px rgba(0, 0, 0, 0.4),
    /* bóng đen nhẹ */ 0 0 15px rgba(255, 255, 255, 0.6); /* viền sáng nhẹ */
  letter-spacing: 1.2px;
  opacity: 1;
  background: linear-gradient(90deg, #a0e7ff, #e0f7fa); /* hiệu ứng gradient chữ */
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* chữ trong suốt, hiện gradient */
  padding: 0 4px;
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
/* HIỆU ỨNG ĐÓNG POPUP SIÊU MƯỢT + RUNG NHẸ */
.slide-fade-enter-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-enter-from {
  transform: translateY(100px) scale(0.9);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(120px) scale(0.95);
  opacity: 0;
  filter: blur(4px);
}

/* Rung nhẹ khi bắt đầu đóng (cực chất!) */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}

/* Nút nhỏ hiện lên với bounce */
.bounce-enter-active {
  animation: bounceIn 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.bounce-leave-active {
  animation: bounceIn 0.5s reverse;
}

@keyframes bounceIn {
  0% {
    transform: translateY(100px) scale(0.3);
    opacity: 0;
  }
  50% {
    transform: translateY(-20px) scale(1.1);
  }
  70% {
    transform: translateY(0) scale(0.95);
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Nút nhỏ đẹp hơn + icon Font Awesome */
.mini-cv-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(231, 76, 60, 0.6);
  cursor: pointer;
  z-index: 999;
  font-weight: bold;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  border: 4px solid rgba(255,255,255,0.2);
}

.mini-cv-button i {
  font-size: 1.6rem;
  margin-bottom: 4px;
}

.mini-cv-button:hover {
  transform: translateY(-8px) scale(1.1) !important;
  box-shadow: 0 20px 40px rgba(231, 76, 60, 0.7);
}

/* Mobile */
@media (max-width: 480px) {
  .mini-cv-button {
    width: 62px;
    height: 62px;
    bottom: 20px;
    right: 20px;
  }
  .mini-cv-button i { font-size: 1.4rem; }
}

.language-switcher {
  background: white;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  display: inline-flex;
}

.language-switcher button {
  padding: 11px 22px;
  border: none;
  background: #ecf0f1;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.language-switcher button.active {
  background: #667eea;
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%);
  border-radius: 20px 20px 0 0;
  pointer-events: none;
}

.avatar {
  width: 140px;
  height: 140px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 6px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 1.6rem;
  margin: 0.5rem 0 1.8rem;
  opacity: 0.95;
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

/* Mobile: xếp chồng đẹp */
@media (max-width: 768px) {
  .cv-topbar {
    flex-direction: column;
    align-items: stretch;
  }
  .language-switcher {
    order: 2;
    justify-content: center;
  }
  .cv-actions {
    order: 1;
    justify-content: center;
  }
}

/* Responsive */
@media (max-width: 640px) {
  .name {
    font-size: 2.2rem;
  }
  .title {
    font-size: 1.4rem;
  }
  .avatar {
    width: 110px;
    height: 110px;
  }
  .contact-info {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
