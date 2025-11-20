<!--<template>-->
<!--  <div class="about-page">-->
<!--    <div class="about-container">-->

<!--      &lt;!&ndash; HERO SECTION &ndash;&gt;-->
<!--      <section class="hero">-->
<!--        <div class="hero-avatar">-->
<!--          <div class="avatar-glow">-->
<!--            <span>{{ user?.name?.[0] || 'L' }}</span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <h1>Xin chào, mình là <span class="highlight">{{ fullName }}</span></h1>-->
<!--        <p class="tagline">{{ tagline }}</p>-->
<!--        <div class="social-links">-->
<!--          <a :href="social.github" target="_blank"><i class="fab fa-github"></i></a>-->
<!--          <a :href="social.linkedin" target="_blank"><i class="fab fa-linkedin"></i></a>-->
<!--          <a :href="'mailto:' + social.email"><i class="fas fa-envelope"></i></a>-->
<!--          <a :href="social.telegram" target="_blank"><i class="fab fa-telegram"></i></a>-->
<!--        </div>-->
<!--      </section>-->

<!--      &lt;!&ndash; ABOUT ME &ndash;&gt;-->
<!--      <section class="section about-me">-->
<!--        <h2>Về bản thân tôi</h2>-->
<!--        <p class="bio">-->
<!--          Mình là một lập trình viên đam mê công nghệ, luôn tìm kiếm cơ hội để học hỏi và tạo ra những sản phẩm có giá trị.-->
<!--          Với hơn <strong>3 năm kinh nghiệm</strong> trong lĩnh vực phát triển web và ứng dụng, mình chuyên sâu về-->
<!--          <strong>Vue.js, Nuxt, Node.js, Java Spring Boot</strong> và các công nghệ hiện đại khác.-->
<!--        </p>-->
<!--        <p class="bio">-->
<!--          Mình thích làm việc trong môi trường năng động, sáng tạo, nơi có thể cùng team xây dựng những giải pháp-->
<!--          giúp cuộc sống dễ dàng hơn. Ngoài code, mình còn thích đọc sách, chơi game chiến thuật và uống cà phê-->
<!--        </p>-->
<!--      </section>-->

<!--      &lt;!&ndash; SKILLS &ndash;&gt;-->
<!--      <section class="section skills">-->
<!--        <h2>Kỹ năng & Công nghệ</h2>-->
<!--        <div class="skills-grid">-->
<!--          <div v-for="skill in skills" :key="skill.name" class="skill-item">-->
<!--            <div class="skill-icon" :style="{ background: skill.color }">-->
<!--              <i :class="skill.icon"></i>-->
<!--            </div>-->
<!--            <span>{{ skill.name }}</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->

<!--      &lt;!&ndash; EXPERIENCE TIMELINE &ndash;&gt;-->
<!--      <section class="section timeline">-->
<!--        <h2>Hành trình sự nghiệp</h2>-->
<!--        <div class="timeline-container">-->
<!--          <div v-for="(exp, i) in experiences" :key="i" class="timeline-item" :class="{ right: i % 2 === 1 }">-->
<!--            <div class="timeline-dot"></div>-->
<!--            <div class="timeline-content">-->
<!--              <div class="year">{{ exp.year }}</div>-->
<!--              <h3>{{ exp.title }}</h3>-->
<!--              <h4>{{ exp.company }}</h4>-->
<!--              <p>{{ exp.desc }}</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->

<!--      &lt;!&ndash; FUN FACTS &ndash;&gt;-->
<!--      <section class="section fun-facts">-->
<!--        <h2>Một vài con số vui</h2>-->
<!--        <div class="facts-grid">-->
<!--          <div class="fact">-->
<!--            <div class="number">{{ stats.projects }}</div>-->
<!--            <div class="label">Dự án hoàn thành</div>-->
<!--          </div>-->
<!--          <div class="fact">-->
<!--            <div class="number">{{ stats.cups }}</div>-->
<!--            <div class="label">Cốc cà phê đã uống</div>-->
<!--          </div>-->
<!--          <div class="fact">-->
<!--            <div class="number">{{ stats.lines }}</div>-->
<!--            <div class="label">Dòng code đã viết</div>-->
<!--          </div>-->
<!--          <div class="fact">-->
<!--            <div class="number">{{ stats.happy }}</div>-->
<!--            <div class="label">Khách hàng hài lòng</div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->

<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, onMounted } from 'vue'-->
<!--import { useAuth } from '@/stores/auth'-->

<!--const { user } = useAuth()-->

<!--const fullName = 'Lê Thành Vinh' // Thay bằng tên bạn-->
<!--const tagline = 'Full-Stack Developer | Java & Vue.js Enthusiast | Coffee Addict'-->

<!--const social = {-->
<!--  github: 'https://github.com/yourusername',-->
<!--  linkedin: 'https://linkedin.com/in/yourusername',-->
<!--  email: 'your.email@gmail.com',-->
<!--  telegram: 'https://t.me/yourusername'-->
<!--}-->

<!--const skills = [-->
<!--  { name: 'Vue.js / Nuxt', icon: 'fab fa-vuejs', color: 'linear-gradient(135deg, #42b883, #35495e)' },-->
<!--  { name: 'Java Spring', icon: 'fab fa-java', color: 'linear-gradient(135deg, #5382a1, #355b7a)' },-->
<!--  { name: 'Node.js', icon: 'fab fa-node-js', color: 'linear-gradient(135deg, #68a063, #3c873a)' },-->
<!--  { name: 'React', icon: 'fab fa-react', color: 'linear-gradient(135deg, #61dafb, #00b4d8)' },-->
<!--  { name: 'Docker', icon: 'fab fa-docker', color: 'linear-gradient(135deg, #2496ed, #0db7ed)' },-->
<!--  { name: 'Git', icon: 'fab fa-git-alt', color: 'linear-gradient(135deg, #f05032, #de350b)' },-->
<!--  { name: 'PostgreSQL', icon: 'fas fa-database', color: 'linear-gradient(135deg, #336791, #1f4e6e)' },-->
<!--  { name: 'Figma', icon: 'fab fa-figma', color: 'linear-gradient(135deg, #f24e1e, #a259ff)' }-->
<!--]-->

<!--const experiences = [-->
<!--  { year: '2024 - nay', title: 'Senior Full-Stack Developer', company: 'Công ty XYZ', desc: 'Phát triển hệ thống quản lý lớn với Vue 3 + Spring Boot + Microservices' },-->
<!--  { year: '2023 - 2024', title: 'Full-Stack Developer', company: 'Startup ABC', desc: 'Xây dựng nền tảng thương mại điện tử từ đầu đến cuối' },-->
<!--  { year: '2021 - 2023', title: 'Frontend Developer', company: 'Công ty DEF', desc: 'Chuyên sâu Vue.js, tối ưu hiệu suất và trải nghiệm người dùng' },-->
<!--  { year: '2020', title: 'Tốt nghiệp ĐH Bách Khoa', company: 'Đà Nẵng', desc: 'Chuyên ngành Kỹ thuật Phần mềm - GPA 3.6/4.0' }-->
<!--]-->

<!--const stats = {-->
<!--  projects: '50+',-->
<!--  cups: '1.247',-->
<!--  lines: '250.000+',-->
<!--  happy: '100%'-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.about-page {-->
<!--  min-height: 100vh;-->
<!--  /*background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);*/-->
<!--  padding: 100px 1rem 5rem;-->
<!--  color: white;-->
<!--}-->

<!--.about-container {-->
<!--  max-width: 1100px;-->
<!--  margin: 0 auto;-->
<!--  background: rgba(255, 255, 255, 0.95);-->
<!--  border-radius: 30px;-->
<!--  overflow: hidden;-->
<!--  box-shadow: 0 30px 80px rgba(102, 126, 234, 0.5);-->
<!--  backdrop-filter: blur(15px);-->
<!--  animation: fadeUp 1s ease-out;-->
<!--}-->

<!--/* HERO */-->
<!--.hero {-->
<!--  text-align: center;-->
<!--  padding: 4rem 2rem 3rem;-->
<!--  background: linear-gradient(135deg, #667eea, #764ba2);-->
<!--  color: white;-->
<!--}-->
<!--.hero-avatar {-->
<!--  width: 160px; height: 160px;-->
<!--  margin: 0 auto 2rem;-->
<!--  position: relative;-->
<!--}-->
<!--.avatar-glow {-->
<!--  width: 100%; height: 100%;-->
<!--  background: linear-gradient(135deg, #ff6b6b, #feca57);-->
<!--  border-radius: 50%;-->
<!--  display: flex; align-items: center; justify-content: center;-->
<!--  font-size: 4.5rem; font-weight: 900;-->
<!--  box-shadow: 0 20px 50px rgba(255,107,107,0.6);-->
<!--  border: 8px solid rgba(255,255,255,0.3);-->
<!--  animation: float 6s ease-in-out infinite;-->
<!--}-->
<!--@keyframes float {-->
<!--  0%, 100% { transform: translateY(0); }-->
<!--  50% { transform: translateY(-20px); }-->
<!--}-->
<!--.hero h1 {-->
<!--  font-size: 3.2rem;-->
<!--  margin: 0.5rem 0;-->
<!--  font-weight: 800;-->
<!--}-->
<!--.highlight {-->
<!--  background: linear-gradient(120deg, #a0e7ff, #e0f7fa);-->
<!--  -webkit-background-clip: text;-->
<!--  background-clip: text;-->
<!--  -webkit-text-fill-color: transparent;-->
<!--}-->
<!--.tagline {-->
<!--  font-size: 1.4rem;-->
<!--  opacity: 0.95;-->
<!--  margin: 1rem 0 2rem;-->
<!--}-->
<!--.social-links a {-->
<!--  display: inline-flex;-->
<!--  width: 50px; height: 50px;-->
<!--  background: rgba(255,255,255,0.2);-->
<!--  border-radius: 50%;-->
<!--  align-items: center; justify-content: center;-->
<!--  font-size: 1.4rem;-->
<!--  margin: 0 10px;-->
<!--  transition: all 0.4s;-->
<!--  backdrop-filter: blur(10px);-->
<!--}-->
<!--.social-links a:hover {-->
<!--  transform: translateY(-8px) scale(1.1);-->
<!--  background: white;-->
<!--  color: #667eea !important;-->
<!--  box-shadow: 0 15px 30px rgba(0,0,0,0.3);-->
<!--}-->

<!--/* SECTION */-->
<!--.section {-->
<!--  padding: 4rem 3rem;-->
<!--  color: #2c3e50;-->
<!--}-->
<!--.section h2 {-->
<!--  font-size: 2.3rem;-->
<!--  text-align: center;-->
<!--  margin-bottom: 3rem;-->
<!--  position: relative;-->
<!--}-->
<!--.section h2::after {-->
<!--  content: '';-->
<!--  width: 80px;-->
<!--  height: 4px;-->
<!--  background: linear-gradient(90deg, #667eea, #764ba2);-->
<!--  position: absolute;-->
<!--  bottom: -12px;-->
<!--  left: 50%;-->
<!--  transform: translateX(-50%);-->
<!--  border-radius: 2px;-->
<!--}-->
<!--.bio {-->
<!--  font-size: 1.15rem;-->
<!--  line-height: 1.9;-->
<!--  text-align: center;-->
<!--  max-width: 800px;-->
<!--  margin: 0 auto 1.5rem;-->
<!--}-->

<!--/* SKILLS GRID */-->
<!--.skills-grid {-->
<!--  display: grid;-->
<!--  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));-->
<!--  gap: 2rem;-->
<!--  max-width: 800px;-->
<!--  margin: 0 auto;-->
<!--}-->
<!--.skill-item {-->
<!--  text-align: center;-->
<!--  transition: all 0.4s;-->
<!--}-->
<!--.skill-item:hover {-->
<!--  transform: translateY(-12px);-->
<!--}-->
<!--.skill-icon {-->
<!--  width: 80px; height: 80px;-->
<!--  margin: 0 auto 1rem;-->
<!--  border-radius: 50%;-->
<!--  display: flex; align-items: center; justify-content: center;-->
<!--  font-size: 2rem;-->
<!--  color: white;-->
<!--  box-shadow: 0 10px 30px rgba(0,0,0,0.2);-->
<!--}-->
<!--.skill-item span {-->
<!--  font-weight: 600;-->
<!--  font-size: 1rem;-->
<!--}-->

<!--/* TIMELINE */-->
<!--.timeline-container {-->
<!--  max-width: 900px;-->
<!--  margin: 0 auto;-->
<!--  position: relative;-->
<!--}-->
<!--.timeline-container::before {-->
<!--  content: '';-->
<!--  position: absolute;-->
<!--  width: 4px;-->
<!--  background: linear-gradient(to bottom, #667eea, #764ba2);-->
<!--  top: 0; bottom: 0; left: 50%;-->
<!--  transform: translateX(-50%);-->
<!--  border-radius: 2px;-->
<!--}-->
<!--.timeline-item {-->
<!--  margin: 4rem 0;-->
<!--  position: relative;-->
<!--}-->
<!--.timeline-dot {-->
<!--  width: 20px; height: 20px;-->
<!--  background: white;-->
<!--  border: 5px solid #667eea;-->
<!--  border-radius: 50%;-->
<!--  position: absolute;-->
<!--  top: 10px;-->
<!--  left: 50%;-->
<!--  transform: translateX(-50%);-->
<!--  z-index: 1;-->
<!--}-->
<!--.timeline-content {-->
<!--  width: 45%;-->
<!--  background: white;-->
<!--  padding: 2rem;-->
<!--  border-radius: 20px;-->
<!--  box-shadow: 0 15px 40px rgba(0,0,0,0.1);-->
<!--  position: relative;-->
<!--}-->
<!--.timeline-item.right .timeline-content {-->
<!--  margin-left: auto;-->
<!--}-->
<!--.year {-->
<!--  font-size: 0.9rem;-->
<!--  color: #667eea;-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 0.5rem;-->
<!--}-->
<!--.timeline-content h3 {-->
<!--  font-size: 1.4rem;-->
<!--  margin: 0.5rem 0;-->
<!--  color: #2c3e50;-->
<!--}-->
<!--.timeline-content h4 {-->
<!--  color: #667eea;-->
<!--  font-weight: 600;-->
<!--  margin-bottom: 0.8rem;-->
<!--}-->

<!--/* FUN FACTS */-->
<!--.fun-facts {-->
<!--  background: linear-gradient(135deg, #667eea, #764ba2);-->
<!--  color: white;-->
<!--}-->
<!--.facts-grid {-->
<!--  display: grid;-->
<!--  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));-->
<!--  gap: 2rem;-->
<!--  max-width: 900px;-->
<!--  margin: 0 auto;-->
<!--}-->
<!--.fact {-->
<!--  text-align: center;-->
<!--}-->
<!--.number {-->
<!--  font-size: 3.5rem;-->
<!--  font-weight: 900;-->
<!--  margin-bottom: 0.5rem;-->
<!--}-->
<!--.label {-->
<!--  font-size: 1.1rem;-->
<!--  opacity: 0.9;-->
<!--}-->

<!--/* RESPONSIVE */-->
<!--@media (max-width: 768px) {-->
<!--  .hero h1 { font-size: 2.5rem; }-->
<!--  .hero-avatar { width: 130px; height: 130px; }-->
<!--  .avatar-glow { font-size: 3.5rem; }-->
<!--  .section { padding: 3rem 1.5rem; }-->
<!--  .timeline-container::before { left: 30px; }-->
<!--  .timeline-content { width: calc(100% - 80px); margin-left: 60px !important; }-->
<!--  .timeline-item.right .timeline-content { margin-left: 60px !important; }-->
<!--}-->
<!--</style>-->
<template>
  <div class="about-page">
    <!-- HERO + ABOUT CONTAINER LIỀN MẠCH KHÍT -->
    <div class="hero-wrapper">
      <!-- HERO – gradient kéo dài xuống dưới container -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-avatar">
            <div class="avatar-glow">
              <span>{{ user?.name?.[0] || 'L' }}</span>
            </div>
          </div>
          <h1>Xin chào, mình là <span class="highlight">{{ fullName }}</span></h1>
          <p class="tagline">{{ tagline }}</p>
          <div class="social-links">
            <a :href="social.github" target="_blank"><i class="fab fa-github"></i></a>
            <a :href="social.linkedin" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a :href="'mailto:' + social.email"><i class="fas fa-envelope"></i></a>
            <a :href="social.telegram" target="_blank"><i class="fab fa-telegram"></i></a>
          </div>
        </div>
      </section>

      <!-- ABOUT CONTAINER – bo tròn, chồng sát lên hero -->
      <div class="about-container">
        <!-- ABOUT ME -->
        <section class="section about-me">
          <h2>Về bản thân tôi</h2>
          <p class="bio">
            Mình là một lập trình viên đam mê công nghệ, luôn tìm kiếm cơ hội để học hỏi và tạo ra những sản phẩm có giá trị.
            Với hơn <strong>3 năm kinh nghiệm</strong> trong lĩnh vực phát triển web và ứng dụng, mình chuyên sâu về
            <strong>Vue.js, Nuxt, Node.js, Java Spring Boot</strong> và các công nghệ hiện đại khác.
          </p>
          <p class="bio">
            Mình thích làm việc trong môi trường năng động, sáng tạo, nơi có thể cùng team xây dựng những giải pháp
            giúp cuộc sống dễ dàng hơn. Ngoài code, mình còn thích đọc sách, chơi game chiến thuật và uống cà phê
          </p>
        </section>

        <!-- SKILLS -->
        <section class="section skills">
          <h2>Kỹ năng & Công nghệ</h2>
          <div class="skills-grid">
            <div v-for="skill in skills" :key="skill.name" class="skill-item">
              <div class="skill-icon" :style="{ background: skill.color }">
                <i :class="skill.icon"></i>
              </div>
              <span>{{ skill.name }}</span>
            </div>
          </div>
        </section>

        <!-- EXPERIENCE TIMELINE -->
        <section class="section timeline">
          <h2>Hành trình sự nghiệp</h2>
          <div class="timeline-container">
            <div v-for="(exp, i) in experiences" :key="i" class="timeline-item" :class="{ right: i % 2 === 1 }">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="year">{{ exp.year }}</div>
                <h3>{{ exp.title }}</h3>
                <h4>{{ exp.company }}</h4>
                <p>{{ exp.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- FUN FACTS -->
        <section class="section fun-facts">
          <h2>Một vài con số vui</h2>
          <div class="facts-grid">
            <div class="fact">
              <div class="number">{{ stats.projects }}</div>
              <div class="label">Dự án hoàn thành</div>
            </div>
            <div class="fact">
              <div class="number">{{ stats.cups }}</div>
              <div class="label">Cốc cà phê đã uống</div>
            </div>
            <div class="fact">
              <div class="number">{{ stats.lines }}</div>
              <div class="label">Dòng code đã viết</div>
            </div>
            <div class="fact">
              <div class="number">{{ stats.happy }}</div>
              <div class="label">Khách hàng hài lòng</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '@/stores/auth'
const { user } = useAuth()

const fullName = 'Lê Thành Vinh'
const tagline = 'Full-Stack Developer | Java & Vue.js Enthusiast | Coffee Addict'

const social = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  email: 'your.email@gmail.com',
  telegram: 'https://t.me/yourusername'
}

const skills = [
  { name: 'Vue.js / Nuxt', icon: 'fab fa-vuejs', color: 'linear-gradient(135deg, #42b883, #35495e)' },
  { name: 'Java Spring', icon: 'fab fa-java', color: 'linear-gradient(135deg, #5382a1, #355b7a)' },
  { name: 'Node.js', icon: 'fab fa-node-js', color: 'linear-gradient(135deg, #68a063, #3c873a)' },
  { name: 'React', icon: 'fab fa-react', color: 'linear-gradient(135deg, #61dafb, #00b4d8)' },
  { name: 'Docker', icon: 'fab fa-docker', color: 'linear-gradient(135deg, #2496ed, #0db7ed)' },
  { name: 'Git', icon: 'fab fa-git-alt', color: 'linear-gradient(135deg, #f05032, #de350b)' },
  { name: 'PostgreSQL', icon: 'fas fa-database', color: 'linear-gradient(135deg, #336791, #1f4e6e)' },
  { name: 'Figma', icon: 'fab fa-figma', color: 'linear-gradient(135deg, #f24e1e, #a259ff)' }
]

const experiences = [
  { year: '2024 - nay', title: 'Senior Full-Stack Developer', company: 'Công ty XYZ', desc: 'Phát triển hệ thống quản lý lớn với Vue 3 + Spring Boot + Microservices' },
  { year: '2023 - 2024', title: 'Full-Stack Developer', company: 'Startup ABC', desc: 'Xây dựng nền tảng thương mại điện tử từ đầu đến cuối' },
  { year: '2021 - 2023', title: 'Frontend Developer', company: 'Công ty DEF', desc: 'Chuyên sâu Vue.js, tối ưu hiệu suất và trải nghiệm người dùng' },
  { year: '2020', title: 'Tốt nghiệp ĐH Bách Khoa', company: 'Đà Nẵng', desc: 'Chuyên ngành Kỹ thuật Phần mềm - GPA 3.6/4.0' }
]

const stats = { projects: '50+', cups: '1.247', lines: '250.000+', happy: '100%' }
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding: 0;
  background: #f5f7fa;
}

/* Bọc hero + container để chồng khít */
.hero-wrapper {
  position: relative;
  width: 100%;
}

/* HERO – gradient kéo dài xuống dưới */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 5rem 2rem 8rem;   /* Padding dưới lớn để che phần bo tròn */
  position: relative;
  z-index: 1;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 3;
}

/* ABOUT CONTAINER – chồng sát lên hero, bo tròn 30px */
.about-container {
  position: relative;
  max-width: 1100px;
  margin: -6rem auto 4rem;           /* ÂM MARGIN: kéo lên chồng khít hero */
  background: rgba(255, 255, 255, 0.98);
  border-radius: 30px;
  box-shadow: 0 30px 80px rgba(102, 126, 234, 0.5);
  backdrop-filter: blur(20px);
  z-index: 2;
  overflow: hidden;
}

/* Avatar + hiệu ứng */
.hero-avatar {
  width: 160px; height: 160px;
  margin: 0 auto 2rem;
  position: relative;
}
.avatar-glow {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 4.5rem; font-weight: 900; color: white;
  box-shadow: 0 20px 50px rgba(255,107,107,0.6);
  border: 8px solid rgba(255,255,255,0.3);
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.hero h1 { font-size: 3.2rem; margin: 0.5rem 0; font-weight: 800; }
.highlight {
  background: linear-gradient(120deg, #a0e7ff, #e0f7fa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.tagline { font-size: 1.4rem; opacity: 0.95; margin: 1rem 0 2rem; }

.social-links a {
  display: inline-flex; width: 50px; height: 50px;
  background: rgba(255,255,255,0.2); border-radius: 50%;
  align-items: center; justify-content: center;
  font-size: 1.4rem; margin: 0 10px;
  transition: all 0.4s; backdrop-filter: blur(10px);
}
.social-links a:hover {
  transform: translateY(-8px) scale(1.1);
  background: white; color: #667eea !important;
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
}

/* Các section bên trong giữ nguyên đẹp */
.section { padding: 4rem 3rem; color: #2c3e50; }
.section h2 {
  font-size: 2.3rem; text-align: center; margin-bottom: 3rem; position: relative;
}
.section h2::after {
  content: ''; width: 80px; height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  position: absolute; bottom: -12px; left: 50%;
  transform: translateX(-50%); border-radius: 2px;
}
.bio { font-size: 1.15rem; line-height: 1.9; text-align: center; max-width: 800px; margin: 0 auto 1.5rem; }

/* Skills, Timeline, Fun Facts giữ nguyên */
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 2rem; max-width: 800px; margin: 0 auto; }
.skill-item:hover { transform: translateY(-12px); }
.skill-icon { width: 80px; height: 80px; margin: 0 auto 1rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: white; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }

.timeline-container::before { content: ''; position: absolute; width: 4px; background: linear-gradient(to bottom, #667eea, #764ba2); top: 0; bottom: 0; left: 50%; transform: translateX(-50%); border-radius: 2px; }
.timeline-content { width: 45%; background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
.timeline-item.right .timeline-content { margin-left: auto; }

.fun-facts { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
.facts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 2rem; max-width: 900px; margin: 0 auto; }
.number { font-size: 3.5rem; font-weight: 900; }

/* Responsive */
@media (max-width: 768px) {
  .hero { padding: 4rem 1.5rem 7rem; }
  .about-container { margin: -4rem auto 3rem; border-radius: 24px; }
  .hero h1 { font-size: 2.5rem; }
  .hero-avatar { width: 130px; height: 130px; }
  .avatar-glow { font-size: 3.5rem; }
  .section { padding: 3rem 1.5rem; }
}
</style>
