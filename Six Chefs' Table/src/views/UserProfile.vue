<template>
  <div class="user-profile container">
    <h2>會員資料</h2>
    <el-form :model="userForm" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="userForm.name"></el-input>
      </el-form-item>
      <el-form-item label="電子郵件" prop="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item label="電話" prop="phone">
        <el-input v-model="userForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="新密碼" prop="newPassword">
        <el-input v-model="userForm.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="確認新密碼" prop="confirmNewPassword">
        <el-input v-model="userForm.confirmNewPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">更新資料</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const formRef = ref(null)

const userForm = reactive({
  name: '',
  email: '',
  phone: '',
  newPassword: '',
  confirmNewPassword: ''
})

onMounted(() => {
  if (userStore.user) {
    userForm.name = userStore.user.name
    userForm.email = userStore.user.email
    userForm.phone = userStore.user.phone
  }
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== userForm.newPassword) {
    callback(new Error('兩次輸入的密碼不一致'))
  } else {
    callback()
  }
}

const rules = reactive({
  name: [
    { required: true, message: '請輸入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '請輸入電子郵件', trigger: 'blur' },
    { type: 'email', message: '請輸入有效的電子郵件地址', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '請輸入電話號碼', trigger: 'blur' },
    { pattern: /^[0-9-]+$/, message: '請輸入有效的電話號碼', trigger: 'blur' }
  ],
  newPassword: [
    { min: 6, message: '密碼長度至少為6個字符', trigger: 'blur' }
  ],
  confirmNewPassword: [
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
})

const submitForm = () => {
  if (!formRef.value) return
  
  formRef.value.validate((valid) => {
    if (valid) {
      // 這裡應該發送請求到後端更新用戶資料
      const updatedUser = {
        name: userForm.name,
        email: userForm.email,
        phone: userForm.phone
      }
      if (userForm.newPassword) {
        updatedUser.password = userForm.newPassword
      }
      console.log('更新用戶資料', updatedUser)
      userStore.updateUser(updatedUser)
      ElMessage.success('用戶資料更新成功')
      userForm.newPassword = ''
      userForm.confirmNewPassword = ''
    } else {
      console.log('表單驗證失敗')
      return false
    }
  })
}
</script>

<style scoped>
.user-profile {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}
</style>