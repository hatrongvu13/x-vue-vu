<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>
        <i class="fas fa-tachometer-alt"></i>
        Dashboard Quản trị
      </h1>
      <div class="greeting">
        Xin chào,
        <strong>Admin</strong>
        👋
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="icon"><i class="fas fa-users"></i></div>
        <div class="info">
          <h3>{{ users.length }}</h3>
          <p>Tổng người dùng</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="icon"><i class="fas fa-eye"></i></div>
        <div class="info">
          <h3>1,247</h3>
          <p>Lượt truy cập</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="icon"><i class="fas fa-envelope"></i></div>
        <div class="info">
          <h3>{{ emails.length }}</h3>
          <p>Email nhận CV</p>
        </div>
      </div>
    </div>

    <!-- Danh sách User gần đây -->
    <div class="section">
      <h2>
        <i class="fas fa-users-cog"></i>
        Danh sách User
      </h2>
      <div class="table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Ngày đăng ký</th>
              <th>CV đã gửi</th>
            </tr>
          </thead>
          <tbody>
            <!-- Dữ liệu giả lập -->
            <tr v-for="u in users" :key="u.id">
              <td>{{ u.id }}</td>
              <td>
                <strong>{{ u.name }}</strong>
              </td>
              <td>{{ u.email }}</td>
              <td>
                <span :class="u.role === 'admin' ? 'badge-admin' : 'badge-user'">
                  {{ u.role }}
                </span>
              </td>
              <td>{{ formatDate(u.joined) }}</td>
              <td>{{ u.cvSent ? 'Có' : 'Chưa' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([
  {
    id: 1,
    name: 'Admin Pro',
    email: 'admin@yourdomain.com',
    role: 'admin',
    joined: '2024-01-15',
    cvSent: true
  },
  {
    id: 2,
    name: 'Lê Văn Nam',
    email: 'namle@gmail.com',
    role: 'user',
    joined: '2025-11-20',
    cvSent: true
  },
  {
    id: 3,
    name: 'Phạm Thị Hương',
    email: 'huongpham@company.com',
    role: 'user',
    joined: '2025-11-22',
    cvSent: false
  }
])

const emails = ref([
  /* dữ liệu như trang emails */
])

const formatDate = (date) => new Date(date).toLocaleDateString('vi-VN')
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
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.admin-header h1 {
  font-size: 2.2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}
.greeting {
  font-size: 1.2rem;
  color: #667eea;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 1.8rem;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.15);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.4s;
}

.stat-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 60px rgba(102, 126, 234, 0.25);
}

.stat-card .icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}

.stat-card:nth-child(1) .icon {
  background: linear-gradient(135deg, #667eea, #764ba2);
}
.stat-card:nth-child(2) .icon {
  background: linear-gradient(135deg, #feca57, #ff9ff3);
}
.stat-card:nth-child(3) .icon {
  background: linear-gradient(135deg, #ff6b6b, #feca57);
}

.stat-card h3 {
  font-size: 2.2rem;
  margin: 0;
  color: #2c3e50;
}
.stat-card p {
  margin: 0;
  color: #95a5a6;
  font-weight: 600;
}

.section h2 {
  font-size: 1.6rem;
  color: #2c3e50;
  margin: 2rem 0 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.table-container {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(102, 126, 234, 0.15);
}
.admin-table th {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1.2rem;
}
.admin-table td {
  padding: 1rem;
}

.badge-admin {
  background: #e74c3c;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
}
.badge-user {
  background: #27ae60;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
}
</style>
