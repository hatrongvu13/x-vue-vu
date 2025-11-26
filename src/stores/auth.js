// src/stores/auth.js
import { ref } from 'vue'

const user = ref(null)

// Khôi phục từ localStorage khi reload trang
const saved = localStorage.getItem('user')
if (saved) user.value = JSON.parse(saved)

export const useAuth = () => {
  const login = (email) => {
    if (email) {
      user.value = { email, name: email.split('@')[0] || 'User' }
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  const register = (email, password, name = '') => {
    user.value = { email, name: name || email.split('@')[0] || 'User' }
    localStorage.setItem('user', JSON.stringify(user.value))
    return true
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    localStorage.clear()
  }

  return { user, login, register, logout }
}
