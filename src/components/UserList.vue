<template>
  <div class="user-list">
    <h3>Danh sách người dùng</h3>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Tên</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/utils/auth'
const auth = useAuthStore()
const { users } = auth
</script>

<style scoped>
.user-list { margin-top: 2rem; }
table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
th { background: #f8f9fa; font-weight: bold; }
tr:hover { background: #f1f3f5; }
</style>
