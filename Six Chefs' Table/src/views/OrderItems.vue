<template>
    <div class="order-search-form">
      <el-form label-position="top" class="form">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="訂單編號">
              <el-input v-model="orderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="會員編號">
              <el-input v-model="memberId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="訂購時間">
              <el-date-picker v-model="orderTime" type="date" placeholder="選擇日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="總金額">
              <el-input v-model="totalAmount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款方式">
              <el-select v-model="paymentMethod" placeholder="選擇付款方式">
                <el-option label="信用卡" value="credit"></el-option>
                <el-option label="現金" value="cash"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="狀態">
              <el-select v-model="status" placeholder="選擇狀態">
                <el-option label="已付款" value="paid"></el-option>
                <el-option label="未付款" value="unpaid"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="action-buttons">
          <el-col :span="12">
            <el-button type="primary" @click="addOrder">新增</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="danger" @click="deleteOrder">刪除</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const orderId = ref('');
  const memberId = ref('');
  const orderTime = ref('');
  const totalAmount = ref('');
  const paymentMethod = ref('');
  const status = ref('');
  
  const addOrder = () => {
    console.log("新增訂單");
  };
  
  const deleteOrder = () => {
    console.log("刪除訂單");
  };
  </script>
  
  <style scoped>
  .order-search-form {
    margin: 20px;
  }
  
  .form {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .el-form-item {
    margin-bottom: 20px;
  }
  
  .action-buttons {
    margin-top: 20px;
    text-align: center;
  }
  
  .action-buttons .el-button {
    width: 100%;
  }
  </style>
  