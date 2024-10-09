<template>
  <div class="order-list">
    <el-table :data="orders" style="width: 100%">
      <el-table-column prop="orderNumber" label="訂單編號" width="120"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="items" label="餐點"></el-table-column>
      <el-table-column prop="total" label="總金額" width="120"></el-table-column>
      <el-table-column prop="status" label="狀態" width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.order-list {
  margin-top: 20px;
}
</style>