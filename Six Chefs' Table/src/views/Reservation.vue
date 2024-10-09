<template>
  <div class="reservation container">
    <h2 class="reservation-title">預約訂位</h2>
    <el-form :model="reservationForm" label-width="120px">
      <el-form-item label="預約日期">
        <el-date-picker
          v-model="reservationForm.date"
          type="date"
          placeholder="選擇日期"
          :disabledDate="disabledDate"
          @change="updateAvailableSeats"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="用餐時段">
        <el-radio-group v-model="reservationForm.mealType" @change="updateAvailableSeats">
          <el-radio :value="'lunch'">午餐</el-radio>
          <el-radio :value="'dinner'">晚餐</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="reservationForm.date && reservationForm.mealType">
        <span>剩餘座位: {{ availableSeats }}</span>
      </el-form-item>
      <el-form-item label="預約時間" v-if="reservationForm.mealType">
        <el-select v-model="reservationForm.time" placeholder="選擇時間">
          <el-option
            v-for="time in availableTimes"
            :key="time"
            :label="time"
            :value="time"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人數">
        <el-input-number 
          v-model="reservationForm.people" 
          :min="1" 
          :max="Math.max(1, availableSeats)"
          :disabled="availableSeats === 0"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitReservation" :disabled="!canReserve">提交預約</el-button>
      </el-form-item>
    </el-form>
  </div>
  <Login v-if="loginDialogVisible" v-model="loginDialogVisible" @login-success="handleLoginSuccess" :reservation-data="reservationForm" />
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import Login from '../components/Login.vue'

const isLoggedIn = ref(false)
const loginDialogVisible = ref(false)
const userInfo = ref(null)

const reservationForm = reactive({
  date: '',
  mealType: '',
  time: '',
  people: 1
})

const mealTimes = {
  lunch: ['11:00', '12:00'],
  dinner: ['17:00', '18:00']
}

const availableTimes = computed(() => {
  return reservationForm.mealType ? mealTimes[reservationForm.mealType] : []
})

const totalSeats = {
  lunch: 50,
  dinner: 70
}

const availableSeats = ref(0)

// 模擬的預訂數據
const mockReservations = {
  '2023-05-20': { lunch: 20, dinner: 30 },
  '2023-05-21': { lunch: 15, dinner: 25 },
  '2023-05-22': { lunch: 10, dinner: 40 },
}

const canReserve = computed(() => {
  return reservationForm.date && reservationForm.mealType && reservationForm.time && reservationForm.people <= availableSeats.value && availableSeats.value > 0
})

const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7 // 禁用今天之前的日期
}

const updateAvailableSeats = () => {
  if (!reservationForm.date || !reservationForm.mealType) {
    availableSeats.value = 0
    return
  }

  const formattedDate = new Date(reservationForm.date).toISOString().split('T')[0]
  const reservationsForDate = mockReservations[formattedDate]

  if (reservationsForDate) {
    const reservedSeats = reservationsForDate[reservationForm.mealType] || 0
    availableSeats.value = Math.max(0, totalSeats[reservationForm.mealType] - reservedSeats)
  } else {
    availableSeats.value = totalSeats[reservationForm.mealType]
  }

  // 確保預訂人數不超過可用座位數
  reservationForm.people = Math.min(reservationForm.people, Math.max(1, availableSeats.value))
}

const submitReservation = () => {
  if (!canReserve.value) {
    ElMessage.error('請填寫所有必要信息，並確保預訂人數不超過可用座位數')
    return
  }
  
  loginDialogVisible.value = true
}

const handleLoginSuccess = (user) => {
  isLoggedIn.value = true
  userInfo.value = user
  ElMessage.success(`歡迎回來，${user.name}！`)
  finalizeReservation()
}

const finalizeReservation = () => {
  console.log('預約信息：', JSON.parse(JSON.stringify({ ...reservationForm, ...userInfo.value })))
  ElMessage.success('預約成功！')
  
  // 更新模擬的預訂數據
  const formattedDate = new Date(reservationForm.date).toISOString().split('T')[0]
  if (!mockReservations[formattedDate]) {
    mockReservations[formattedDate] = { lunch: 0, dinner: 0 }
  }
  mockReservations[formattedDate][reservationForm.mealType] += reservationForm.people
  
  // 更新可用座位數
  updateAvailableSeats()
  
  // 重置表單
  Object.assign(reservationForm, {
    date: '',
    mealType: '',
    time: '',
    people: 1
  })
}

// 監聽日期和用餐時段的變化
watch([() => reservationForm.date, () => reservationForm.mealType], () => {
  updateAvailableSeats()
})

onMounted(() => {
  updateAvailableSeats()
})

onUnmounted(() => {
  // 清理工作（如果需要）
})
</script>

<style scoped>
.reservation {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.reservation-title {
  text-align: center;
  margin-bottom: 20px;
}
</style>