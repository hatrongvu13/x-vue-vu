// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CvView from '@/views/CvView.vue'
import ContactView from '@/views/ContactView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/cv', name: 'cv', component: CvView },
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/about', name: 'about', component: AboutView },
  ]
})

// Bảo vệ route: nếu chưa login mà vào trang cần login thì đẩy về /login
router.beforeEach((to, from, next) => {
  const { user } = useAuth()

  const publicPages = ['/login', '/register', '/', '/cv']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !user.value) {
    return next('/login')
  }
  next()
})

export default router
