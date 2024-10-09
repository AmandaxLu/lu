<template>
  <div class="member-dashboard container">
    <h2 class="dashboard-title">會員後台</h2>
    <el-card v-if="userInfo">
      <template #header>
        <div class="card-header">
          <span>歡迎回來，{{ userInfo.username }}</span>
        </div>
      </template>
      <div class="user-info">
        <p><strong>電子郵件：</strong> {{ userInfo.email }}</p>
        <p><strong>註冊日期：</strong> {{ userInfo.registrationDate }}</p>
      </div>
      <el-button type="primary" @click="logout">登出</el-button>
    </el-card>
    <el-form v-else :model="loginForm" label-width="120px" @submit.prevent="submitLogin">
      <el-form-item label="用戶名">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密碼">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登入</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const userInfo = ref(null)
const loginForm = reactive({
  username: '',
  password: ''
})

const submitLogin = () => {
  // 這裡應該發送登入請求到後端
  console.log('登入信息：', JSON.parse(JSON.stringify(loginForm)))
  // 模擬登入成功
  userInfo.value = {
    username: loginForm.username,
    email: 'user@example.com',
    registrationDate: '2023-05-01'
  }
  ElMessage.success('登入成功！')
}

const logout = () => {
  userInfo.value = null
  ElMessage.success('已登出')
}
</script>

<style scoped>
.member-dashboard {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-title {
  text-align: center;
  margin-bottom: 20px;
}

.user-info {
  margin-bottom: 20px;
}
</style>