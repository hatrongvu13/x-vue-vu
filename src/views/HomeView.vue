<!-- src/views/Home.vue -->
<template>
  <div class="home-page">
    <!-- HERO SECTION - Parallax + Animated Background -->
    <section class="hero">
      <div class="hero-bg">
        <div class="floating-shapes">
          <div v-for="n in 6" :key="n" class="shape" :style="{ '--i': n }"></div>
        </div>
      </div>

      <div class="hero-content">
        <h1 class="hero-title">
          <span class="line">Xin chào, tôi là</span>
          <span class="gradient-text name">{{ cv.name.vi }}</span>
          <span class="typing">{{ typedTitle }}</span>
        </h1>

        <p class="hero-subtitle">
          {{ cv.title.vi }} · {{ cv.about.vi.split('.')[0] }}...
        </p>

        <div class="hero-buttons">
          <router-link to="/cv" class="btn-primary">
            <i class="fas fa-file-alt"></i> Xem CV của tôi
          </router-link>
          <router-link to="/contact" class="btn-secondary">
            <i class="fas fa-envelope"></i> Liên hệ ngay
          </router-link>
        </div>

        <div class="scroll-hint">
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
    </section>

    <!-- SKILLS HIGHLIGHT -->
    <section class="skills-showcase">
      <div class="container">
        <h2 class="section-title">Kỹ năng nổi bật</h2>
        <div class="skills-grid">
          <div v-for="(skill, i) in topSkills" :key="i" class="skill-card" :style="{ '--delay': i * 0.1 + 's' }">
            <div class="skill-icon">{{ getSkillIcon(skill.name) }}</div>
            <h3>{{ skill.name }}</h3>
            <div class="skill-bar">
              <div class="fill" :style="{ width: skill.level + '%' }"></div>
            </div>
            <span class="level">{{ skill.level }}%</span>
          </div>
        </div>
      </div>
    </section>

    <!-- PROJECTS / WORKS -->
    <section class="projects">
      <div class="container">
        <h2 class="section-title">Dự án tiêu biểu</h2>
        <div class="projects-grid">
          <div v-for="project in projects" :key="project.id" class="project-card">
            <div class="project-thumb">
              <img :src="project.image" :alt="project.title" />
              <div class="overlay">
                <a :href="project.link" target="_blank" class="btn-view">
                  <i class="fas fa-external-link-alt"></i> Xem dự án
                </a>
              </div>
            </div>
            <h3>{{ project.title }}</h3>
            <p>{{ project.desc }}</p>
            <div class="tags">
              <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION -->
    <section class="cta">
      <div class="container">
        <h2>Sẵn sàng làm việc cùng bạn!</h2>
        <p>Hãy gửi email cho tôi, tôi sẽ phản hồi trong vòng 24h</p>
        <router-link to="/contact" class="btn-cta">
          <i class="fas fa-paper-plane"></i> Gửi tin nhắn ngay
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// Dữ liệu CV (dùng chung với AdminCV)
const cvData = localStorage.getItem('admin-cv-data-v2')
const cv = cvData ? JSON.parse(cvData) : {
  name: { vi: 'Hà Trọng Vũ' },
  title: { vi: 'Backend Developer' },
  about: { vi: 'Tôi là một lập trình viên đam mê xây dựng những sản phẩm tuyệt vời và hiệu năng' }
}

const typedTitle = ref('')
const fullTitle = cv.title.vi
let i = 0
const typeWriter = () => {
  if (i < fullTitle.length) {
    typedTitle.value += fullTitle.charAt(i)
    i++
    setTimeout(typeWriter, 100)
  }
}

onMounted(() => {
  setTimeout(typeWriter, 1000)
})

// Top skills
const topSkills = computed(() => {
  const skills = cv.skills || [
    { name: 'Java', level: 95 },
    { name: 'React / Next.js', level: 88 },
    { name: 'Node.js', level: 90 },
    { name: 'TypeScript', level: 92 }
  ]
  return skills.slice(0, 6)
})

const getSkillIcon = (name) => {
  const icons = {
    'Vue': 'V', 'React': 'R', 'Node': 'N', 'TypeScript': 'TS', 'Tailwind': 'T', 'Java': 'J',
  }

  return name.includes('Vue') ? 'V' :
    name.includes('React') ? 'R' :
      name.includes('Node') ? 'N' :
      name.includes('Java') ? 'J' :
        name.includes('TypeScript') ? 'TS' : 'Code'
}

// Dự án mẫu
const projects = [
  { id: 1, title: 'E-Commerce Platform', desc: 'Hệ thống bán hàng đa kênh với Vue 3 + NestJS', image: '', link: '#', tags: ['Vue 3', 'NestJS', 'PostgreSQL'] },
  { id: 2, title: 'Dashboard Admin', desc: 'Giao diện quản trị hiện đại, responsive', image: '', link: '#', tags: ['React', 'Tailwind', 'Chart.js'] },
  { id: 3, title: 'Mobile App UI', desc: 'Thiết kế giao diện ứng dụng đặt đồ ăn', image: '', link: '#', tags: ['Figma', 'React Native'] }
]
</script>

<style scoped>
.home-page { overflow-x: hidden; }

/* HERO */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920') center/cover no-repeat;
  filter: brightness(0.4);
}

.floating-shapes {
  position: absolute;
  inset: 0;
}
.shape {
  position: absolute;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  animation: float 20s infinite linear;
}
.shape:nth-child(1) { width: 80px; height: 80px; top: 10%; left: 10%; animation-delay: calc(var(--i) * 2s); }
.shape:nth-child(2) { width: 120px; height: 120px; top: 20%; right: 10%; }
.shape:nth-child(3) { width: 60px; height: 60px; bottom: 20%; left: 20%; }
.shape:nth-child(4) { width: 100px; height: 100px; bottom: 10%; right: 30%; }
.shape:nth-child(5) { width: 90px; height: 90px; top: 50%; left: 5%; }
.shape:nth-child(6) { width: 70px; height: 70px; top: 70%; right: 15%; }

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-30px) rotate(10deg); }
}

.hero-content { position: relative; z-index: 2; padding: 2rem; max-width: 1000px; }
.hero-title { font-size: 4.5rem; font-weight: 900; line-height: 1.2; margin-bottom: 1rem; }
@media (max-width: 768px) { .hero-title { font-size: 3rem; } }

.line { display: block; font-size: 0.9em; opacity: 0.9; }
.name {
  display: block;
  font-size: 1.4em;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glow 3s ease-in-out infinite alternate;
}
@keyframes glow { from { filter: brightness(1); } to { filter: brightness(1.5); } }

.typing {
  display: block;
  font-size: 1.8rem;
  margin: 1rem 0;
  font-weight: 600;
  border-right: 4px solid #feca57;
  white-space: nowrap;
  overflow: hidden;
}

.hero-subtitle { font-size: 1.4rem; opacity: 0.9; margin: 1.5rem 0; }

.hero-buttons {
  margin: 3rem 0;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}
.btn-primary, .btn-secondary {
  padding: 16px 36px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.4s;
  display: flex;
  align-items: center;
  gap: 12px;
}
.btn-primary {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  box-shadow: 0 10px 30px rgba(255,107,107,0.4);
}
.btn-primary:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 20px 50px rgba(255,107,107,0.6);
}
.btn-secondary {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.3);
  color: white;
}
.btn-secondary:hover {
  background: white;
  color: #667eea;
}

.scroll-hint {
  position: absolute;
  bottom: 30px;
  animation: bounce 2s infinite;
}
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

/* SECTIONS */
.container { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem; }
.section-title {
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

/* SKILLS */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
.skill-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(102,126,234,0.15);
  text-align: center;
  animation: fadeUp 0.8s ease-out forwards;
  opacity: 0;
  animation-delay: var(--delay);
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
.skill-icon {
  width: 80px; height: 80px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  font-weight: bold;
}
.skill-bar {
  height: 10px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
}
.fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 10px;
  transition: width 2s ease;
}
.level { font-weight: bold; color: #667eea; }

/* PROJECTS */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
}
.project-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  transition: all 0.4s;
}
.project-card:hover { transform: translateY(-15px); }
.project-thumb {
  position: relative;
  overflow: hidden;
  height: 220px;
}
.project-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s;
}
.project-card:hover img { transform: scale(1.15); }
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(102,126,234,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s;
}
.project-card:hover .overlay { opacity: 1; }
.btn-view {
  background: white;
  color: #667eea;
  padding: 14px 30px;
  border-radius: 50px;
  font-weight: 700;
}
.project-card h3 { padding: 1.5rem 1.5rem 0.5rem; }
.project-card p { padding: 0 1.5rem; color: #666; }
.tags {
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.tags span {
  background: #667eea15;
  color: #667eea;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
}

/* CTA */
.cta {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-align: center;
  padding: 6rem 2rem;
}
.cta h2 { font-size: 3rem; margin-bottom: 1rem; }
.cta p { font-size: 1.3rem; opacity: 0.9; margin-bottom: 2rem; }
.btn-cta {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  padding: 18px 40px;
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: 700;
  box-shadow: 0 15px 40px rgba(255,107,107,0.4);
  transition: all 0.4s;
}
.btn-cta:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 25px 60px rgba(255,107,107,0.6);
}
</style>
