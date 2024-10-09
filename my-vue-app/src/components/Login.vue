<template>
  <el-dialog
    :title="isLogin ? '登入' : '註冊'"
    v-model="dialogVisible"
    width="400px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="80px"
      @submit.prevent
    >
      <el-form-item label="電子郵件" prop="email">
        <el-input v-model="form.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <template v-if="!isLogin">
        <el-form-item label="確認密碼" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="電話" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">{{
          isLogin ? "登入" : "註冊"
        }}</el-button>
      </span>
    </template>
    <div class="switch-mode">
      <a href="#" @click.prevent="switchMode">{{
        isLogin ? "還沒有帳號？立即註冊" : "已有帳號？立即登入"
      }}</a>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const props = defineProps({
  modelValue: Boolean,
  reservationData: Object,
});

const emit = defineEmits(["update:modelValue", "login-success"]);

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const isLogin = ref(true);
const formRef = ref(null);

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  phone: "",
});

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error("兩次輸入的密碼不一致"));
  } else {
    callback();
  }
};

const rules = reactive({
  email: [
    { required: true, message: "請輸入電子郵件", trigger: "blur" },
    { type: "email", message: "請輸入有效的電子郵件地址", trigger: "blur" },
  ],
  password: [
    { required: true, message: "請輸入密碼", trigger: "blur" },
    { min: 6, message: "密碼長度至少為6個字符", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "請確認密碼", trigger: "blur" },
    { validator: validateConfirmPassword, trigger: "blur" },
  ],
  name: [{ required: true, message: "請輸入姓名", trigger: "blur" }],
  phone: [
    { required: true, message: "請輸入電話號碼", trigger: "blur" },
    { pattern: /^[0-9-]+$/, message: "請輸入有效的電話號碼", trigger: "blur" },
  ],
});

const submitForm = () => {
  if (!formRef.value) return;

  formRef.value.validate((valid) => {
    if (valid) {
      // 模擬登入成功
      const user = {
        email: form.email,
        name: form.name || "用戶",
        phone: form.phone,
      };
      userStore.login(user);
      ElMessage.success(isLogin.value ? "登入成功" : "註冊成功");
      emit("login-success", user);
      dialogVisible.value = false;
    } else {
      console.log("表單驗證失敗");
      return false;
    }
  });
};

const switchMode = () => {
  isLogin.value = !isLogin.value;
  formRef.value.resetFields();
};
</script>

<style scoped>
.switch-mode {
  text-align: center;
  margin-top: 10px;
}
</style>
