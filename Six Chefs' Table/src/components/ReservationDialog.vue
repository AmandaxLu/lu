<template>
  <el-dialog
    title="預約訂位"
    v-model="dialogVisible"
    width="500px"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" @submit.prevent="submitForm">
      <el-form-item label="電子郵件" prop="email">
        <el-input v-model="form.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="確認密碼" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="電話" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <!-- 其他預約相關的表單項 -->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">確認預約</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const formRef = ref(null)

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone: '',
  // 其他預約相關的表單數據
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error('兩次輸入的密碼不一致'))
  } else {
    callback()
  }
}

const rules = reactive({
  email: [
    { required: true, message: '請輸入電子郵件', trigger: 'blur' },
    { type: 'email', message: '請輸入有效的電子郵件地址', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, message: '密碼長度至少為6個字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '請確認密碼', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  name: [
    { required: true, message: '請輸入姓名', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '請輸入電話號碼', trigger: 'blur' },
    { pattern: /^[0-9-]+$/, message: '請輸入有效的電話號碼', trigger: 'blur' }
  ],
  // 其他預約相關的驗證規則
})

const submitForm = () => {
  if (!formRef.value) return
  
  formRef.value.validate((valid) => {
    if (valid) {
      // 在這裡處理預約表單提交邏輯
      console.log('預約表單提交', form)
      ElMessage.success('預約成功')
      dialogVisible.value = false
    } else {
      console.log('表單驗證失敗')
      return false
    }
  })
}

// 暴露方法以供父組件調用
defineExpose({
  openDialog: () => {
    dialogVisible.value = true
  }
})
</script>