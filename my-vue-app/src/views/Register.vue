<template>
  <div class="register container">
    <h2 class="register-title">會員註冊</h2>
    <el-form :model="registerForm" label-width="120px" @submit.prevent="submitRegister">
      <el-form-item label="用戶名">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="電子郵件">
        <el-input v-model="registerForm.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="密碼">
        <el-input v-model="registerForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="確認密碼">
        <el-input v-model="registerForm.confirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">註冊</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const submitRegister = () => {
  if (registerForm.password !== registerForm.confirmPassword) {
    ElMessage.error('密碼不匹配')
    return
  }
  // 這裡應該發送註冊請求到後端
  console.log('註冊信息：', JSON.parse(JSON.stringify(registerForm)))
  ElMessage.success('註冊成功！')
}
</script>

<style scoped>
.register {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.register-title {
  text-align: center;
  margin-bottom: 20px;
}
</style>