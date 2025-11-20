<template>
  <div class="project-detail container">
    <router-link to="/cv" class="back-btn">← Quay lại CV</router-link>

    <div class="project-card">
      <h1>{{ project.title }}</h1>
      <p class="year">{{ project.year }}</p>

      <div class="tech-stack">
        <span v-for="t in project.tech" :key="t" class="tech">{{ t }}</span>
      </div>

      <div class="links" v-if="project.link || project.github">
        <a :href="project.link" target="_blank" v-if="project.link">Xem website</a>
        <a :href="project.github" target="_blank" v-if="project.github">GitHub</a>
      </div>

      <div class="description">
        <h2>Mô tả chi tiết</h2>
        <p v-for="(line, i) in project.fullDesc.split('\n')" :key="i">{{ line || ' ' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import cvData from '@/data/cv-data.json'

const route = useRoute()
const router = useRouter()
const project = ref(null)

onMounted(() => {
  const id = route.params.id
  project.value = cvData.projects.find(p => p.id === id)
  if (!project.value) router.push('/cv')
})
</script>

<style scoped>
.container { max-width: 900px; margin: 2rem auto; padding: 1rem; }
.back-btn {
  display: inline-block;
  margin-bottom: 2rem;
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}
.project-card {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}
h1 { font-size: 2.5rem; color: #2c3e50; margin-bottom: 0.5rem; }
.year { color: #e67e22; font-weight: bold; font-size: 1.2rem; }
.tech-stack { margin: 20px 0; }
.tech {
  display: inline-block;
  background: #3498db;
  color: white;
  padding: 8px 16px;
  border-radius: 30px;
  margin: 5px;
  font-size: 0.9rem;
}
.links a {
  display: inline-block;
  background: #2c3e50;
  color: white;
  padding: 12px 24px;
  margin: 10px 10px 10px 0;
  text-decoration: none;
  border-radius: 8px;
}
.description {
  margin-top: 30px;
  line-height: 1.8;
  white-space: pre-line;
  font-size: 1.1rem;
}
</style>
