<template>
  <div class="order-table">
    <!-- 桌面版顯示表格 -->
    <el-table v-if="isDesktop" :data="orders">
      <el-table-column prop="merchantTradeNo" label="訂單編號" width="100"></el-table-column>
      <el-table-column prop="cstmNum" label="會員編號" width="100"></el-table-column>
      <el-table-column prop="orderDate" label="訂購時間" width="150"></el-table-column>
      <el-table-column prop="total" label="總金額" width="100"></el-table-column>
      <el-table-column prop="payMethod" label="付款方式" width="120"></el-table-column>
      <el-table-column prop="status" label="狀態"></el-table-column>
      <el-table-column label="" width="180">
        <template #default="scope">
          <el-button type="info" @click="viewOrder(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 手機版顯示卡片式佈局 -->
    <div v-else class="mobile-order-cards">
      <div v-for="order in orders" :key="order.merchantTradeNo" class="order-card">
        <div class="order-info">
          <p><strong>訂單編號：</strong>{{ order.merchantTradeNo }}</p>
          <p><strong>會員編號：</strong>{{ order.cstmNum }}</p>
          <p><strong>訂購時間：</strong>{{ order.orderDate }}</p>
          <p><strong>總金額：</strong>{{ order.total }}</p>
          <p><strong>付款方式：</strong>{{ order.payMethod }}</p>
          <p><strong>狀態：</strong>{{ order.status }}</p>
        </div>
        <div class="order-actions">
          <el-button type="info" size="mini" @click="viewOrder(order)">查看</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  orders: Array,
  isDesktop: Boolean
})

const emit = defineEmits(['view-order'])

const viewOrder = (order) => {
  emit('view-order', order)
}
</script>

<style scoped>
/* 保留原有的樣式 */
</style>