import  {defineStore } from 'pinia'
import api from '@/api/index.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    users: [],
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: state => !!state.user && !!state.token,
  },
  actions: {
    async login({ username, password }) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/user/login', { username, password })
        const { token } = res.data

        this.token = token
        this.user = username
        localStorage.setItem('token', token)
        return true
      } catch (error) {
        this.error = error
        this.loading = false
      }
    },
    async register({ username, password, email, fullName }) {
      this.loading = true
      this.error = null
      try  {
        const res = await api.post('/user/register', { username, password, email, fullName })
        const { token } = res.data
        this.token = token
        localStorage.setItem('token', token)
        return true
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },

    async logout() {

    }
  }
})
