<!-- src/views/AdminVisitors.vue -->
<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>
        <i class="fas fa-eye"></i>
        Lượt truy cập website
      </h1>
      <div class="stats-summary">
        <div class="stat-mini">
          <strong>{{ totalVisitors }}</strong>
          <span>Tổng lượt truy cập</span>
        </div>
        <div class="stat-mini today">
          <strong>{{ todayVisitors }}</strong>
          <span>Hôm nay</span>
        </div>
      </div>
    </div>

    <!-- Biểu đồ lượt truy cập 7 ngày gần nhất -->
    <div class="chart-card">
      <h2>
        <i class="fas fa-chart-line"></i>
        Thống kê 7 ngày gần đây
      </h2>
      <div class="chart-wrapper">
        <canvas ref="visitorChart"></canvas>
      </div>
    </div>

    <!-- Bộ lọc & Tìm kiếm -->
    <div class="filter-bar">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input v-model="searchQuery" placeholder="Tìm IP, quốc gia, trang..." />
      </div>
      <button @click="refreshData" class="btn-refresh">
        <i class="fas fa-sync-alt"></i>
        Làm mới
      </button>
    </div>

    <!-- Bảng danh sách truy cập -->
    <div class="table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>IP Address</th>
            <th>Quốc gia</th>
            <th>Trang truy cập</th>
            <th>Thiết bị</th>
            <th>Trình duyệt</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(visit, index) in paginatedVisitors" :key="visit.id">
            <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            <td>
              <code>{{ visit.ip }}</code>
              <button @click="copyIP(visit.ip)" class="btn-copy-mini" title="Copy IP">
                <i class="fas fa-copy"></i>
              </button>
            </td>
            <td>
              <span class="flag">{{ visit.country.flag }}</span>
              {{ visit.country.name }}
            </td>
            <td class="page-path">{{ visit.page }}</td>
            <td>
              <i :class="getDeviceIcon(visit.device)"></i>
              {{ visit.device }}
            </td>
            <td>{{ visit.browser }}</td>
            <td>{{ formatDateTime(visit.timestamp) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Phân trang -->
      <div class="pagination">
        <button @click="currentPage--" :disabled="currentPage === 1">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

// Dữ liệu giả lập (sau này lấy từ API)
const visitors = ref([
  {
    id: 1,
    ip: '113.172.12.45',
    country: { flag: 'VN', name: 'Việt Nam' },
    page: '/cv',
    device: 'Mobile',
    browser: 'Chrome',
    timestamp: '2025-11-27T14:32:10'
  },
  {
    id: 2,
    ip: '203.0.113.89',
    country: { flag: 'US', name: 'United States' },
    page: '/',
    device: 'Desktop',
    browser: 'Firefox',
    timestamp: '2025-11-27T13:15:22'
  },
  {
    id: 3,
    ip: '185.45.67.123',
    country: { flag: 'JP', name: 'Japan' },
    page: '/about',
    device: 'Tablet',
    browser: 'Safari',
    timestamp: '2025-11-27T12:08:45'
  }
  // ... thêm nhiều hơn để test phân trang
])

// Thêm 50 bản ghi giả để test
for (let i = 4; i <= 67; i++) {
  const countries = [
    { flag: 'VN', name: 'Việt Nam' },
    { flag: 'US', name: 'United States' },
    { flag: 'SG', name: 'Singapore' },
    { flag: 'JP', name: 'Japan' },
    { flag: 'KR', name: 'South Korea' }
  ]
  const pages = ['/', '/cv', '/about', '/contact']
  const devices = ['Mobile', 'Desktop', 'Tablet']
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge']

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

  visitors.value.push({
    id: i,
    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    country: random(countries),
    page: random(pages),
    device: random(devices),
    browser: random(browsers),
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString()
  })
}

const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 15

const totalVisitors = computed(() => visitors.value.length)
const todayVisitors = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return visitors.value.filter((v) => v.timestamp.startsWith(today)).length
})

const filteredVisitors = computed(() => {
  if (!searchQuery.value) return visitors.value
  const q = searchQuery.value.toLowerCase()
  return visitors.value.filter(
    (v) =>
      v.ip.includes(q) ||
      v.country.name.toLowerCase().includes(q) ||
      v.page.includes(q) ||
      v.device.toLowerCase().includes(q)
  )
})

const paginatedVisitors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredVisitors.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredVisitors.value.length / itemsPerPage))

// Biểu đồ
const visitorChart = ref(null)
let chartInstance = null

const initChart = () => {
  if (!visitorChart.value) return

  const last7Days = Array(7)
    .fill(0)
    .map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date.toISOString().split('T')[0]
    })

  const counts = last7Days.map(
    (day) => visitors.value.filter((v) => v.timestamp.startsWith(day)).length
  )

  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(visitorChart.value, {
    type: 'line',
    data: {
      labels: last7Days.map((d) =>
        new Date(d).toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric' })
      ),
      datasets: [
        {
          label: 'Lượt truy cập',
          data: counts,
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.2)',
          borderWidth: 4,
          pointBackgroundColor: '#667eea',
          pointRadius: 6,
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
        x: { grid: { display: false } }
      }
    }
  })
}

const formatDateTime = (date) => new Date(date).toLocaleString('vi-VN')
const getDeviceIcon = (device) => {
  return device === 'Mobile'
    ? 'fas fa-mobile-alt'
    : device === 'Tablet'
      ? 'fas fa-tablet-alt'
      : 'fas fa-desktop'
}

const copyIP = (ip) => {
  navigator.clipboard.writeText(ip)
  alert('Đã copy IP: ' + ip)
}

const refreshData = () => {
  alert('Đã làm mới dữ liệu truy cập!')
  // Gọi API thực tế ở đây
}

onMounted(() => {
  setTimeout(initChart, 300) // Đợi DOM render
})

watch(currentPage, () => window.scrollTo(0, 0))
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
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}
.admin-header h1 {
  font-size: 2.2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

.stats-summary {
  display: flex;
  gap: 2rem;
}
.stat-mini {
  text-align: center;
}
.stat-mini strong {
  display: block;
  font-size: 2rem;
  color: #667eea;
  font-weight: 800;
}
.stat-mini span {
  color: #7f8c8d;
  font-size: 0.9rem;
}
.stat-mini.today strong {
  color: #27ae60;
}

.chart-card {
  background: white;
  border-radius: 20px;
  padding: 1.8rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 50px rgba(102, 126, 234, 0.15);
}
.chart-card h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.chart-wrapper {
  height: 300px;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.search-box {
  position: relative;
  max-width: 400px;
  flex: 1;
}
.search-box i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
}
.search-box input {
  width: 100%;
  padding: 14px 16px 14px 50px;
  border: none;
  border-radius: 50px;
  background: white;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
  font-size: 1rem;
}
.search-box input:focus {
  outline: none;
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.25);
}

.btn-refresh {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  border: none;
  padding: 12px 26px;
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
}
.admin-table th {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1.2rem 1rem;
}
.admin-table td {
  padding: 1rem;
  vertical-align: middle;
}
.admin-table tr:hover {
  background: rgba(102, 126, 234, 0.05);
}

code {
  background: #f1f2f6;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.9rem;
}
.flag {
  font-size: 1.3rem;
  margin-right: 6px;
}
.page-path {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-copy-mini {
  background: none;
  border: none;
  color: #667eea;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 8px;
  opacity: 0.7;
}
.btn-copy-mini:hover {
  opacity: 1;
  transform: scale(1.3);
}

.pagination {
  padding: 1.5rem;
  text-align: center;
  background: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.pagination button {
  background: #667eea;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}
.pagination button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}
.pagination button:hover:not(:disabled) {
  background: #764ba2;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .stats-summary {
    flex-direction: column;
    align-items: flex-start;
  }
  .filter-bar {
    flex-direction: column;
  }
  .search-box {
    max-width: 100%;
  }
}
</style>
