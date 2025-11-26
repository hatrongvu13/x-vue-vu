<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1><i class="fas fa-envelope"></i> Email nhận CV ({{ emails.length }})</h1>
      <button @click="refresh" class="btn-refresh">
        <i class="fas fa-sync-alt"></i> Làm mới
      </button>
    </div>

    <div class="table-container">
      <table class="admin-table">
        <thead>
        <tr>
          <th>STT</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Thời gian gửi</th>
          <th>Hành động</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(email, index) in emails" :key="email.id">
          <td>{{ index + 1 }}</td>
          <td>{{ email.name }}</td>
          <td><strong>{{ email.email }}</strong></td>
          <td>{{ email.phone || '—' }}</td>
          <td>{{ formatDate(email.createdAt) }}</td>
          <td>
            <button @click="copyEmail(email.email)" class="btn-copy" title="Copy email">
              <i class="fas fa-copy"></i>
            </button>
            <button @click="downloadCV(email)" class="btn-download" title="Tải CV">
              <i class="fas fa-file-download"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Giả lập dữ liệu (sau này lấy từ API)
const emails = ref([
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0901234567', createdAt: '2025-11-25T10:30:00' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@company.com', phone: '0987654321', createdAt: '2025-11-24T14:20:00' },
  // ... thêm dữ liệu
])

const formatDate = (date) => {
  return new Date(date).toLocaleString('vi-VN')
}

const copyEmail = (email) => {
  navigator.clipboard.writeText(email)
  alert('Đã copy: ' + email)
}

const downloadCV = (email) => {
  // Giả lập tải file
  alert(`Đang tải CV của ${email.name}...`)
}

const refresh = () => {
  alert('Đang làm mới dữ liệu...')
  // Gọi API ở đây
}
</script>

<style scoped>
.admin-container {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

.btn-refresh {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  transition: all 0.4s;
}

.btn-refresh:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 18px 40px rgba(255, 107, 107, 0.6);
}

.table-container {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(102, 126, 234, 0.15);
  backdrop-filter: blur(10px);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1.2rem 1rem;
  text-align: left;
  font-weight: 700;
}

.admin-table td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.admin-table tr:hover {
  background: rgba(102, 126, 234, 0.05);
}

.btn-copy, .btn-download {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 8px;
  margin: 0 4px;
  border-radius: 8px;
  transition: all 0.3s;
}

.btn-copy { color: #667eea; }
.btn-download { color: #27ae60; }

.btn-copy:hover { background: #667eea20; transform: scale(1.2); }
.btn-download:hover { background: #27ae6020; transform: scale(1.2); }

@media (max-width: 768px) {
  .admin-table, .admin-table thead, .admin-table tbody, .admin-table tr, .admin-table td {
    display: block;
  }
  .admin-table thead tr { display: none; }
  .admin-table tr { margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 12px; padding: 1rem; }
  .admin-table td {
    text-align: right;
    position: relative;
    padding-left: 50%;
  }
  .admin-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    font-weight: bold;
    color: #667eea;
  }
}
</style>
