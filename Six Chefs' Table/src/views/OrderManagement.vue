<template>
  <div class="order-management">
    <h2>訂單管理</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="點餐記錄" name="orders">
        <!-- <h3>點餐記錄</h3> -->
        <!-- 桌面版顯示表格 -->
        <div v-if="isDesktop">
          <el-row>
            <el-col :span="4">商家訂單號</el-col>
            <el-col :span="3">客戶編號</el-col>
            <el-col :span="4">訂單日期</el-col>
            <el-col :span="4">取貨日期</el-col>
            <el-col :span="2">總金額</el-col>
            <el-col :span="2">付款方式</el-col>
            <el-col :span="2">狀態</el-col>
            <el-col :span="3">操作</el-col>
          </el-row>
          <el-row v-for="(order, index) in paginatedOrders" :key="index">
            <el-col :span="4">{{ order.merchantTradeNo }}</el-col>
            <el-col :span="3">{{ order.cstmNum }}</el-col>
            <el-col :span="4">{{ order.orderDate }}</el-col>
            <el-col :span="4">{{ order.pickDate }}</el-col>
            <el-col :span="2">{{ order.total }}</el-col>
            <el-col :span="2">{{ order.payMethod }}</el-col>
            <el-col :span="2">{{ order.status }}</el-col>
            <el-col :span="3">
              <el-button type="info" @click="viewOrder(order)">查看</el-button>
            </el-col>
          </el-row>
        </div>

        <!-- 手機版顯示卡片式佈局 -->
        <div v-else class="mobile-order-cards">
          <div v-for="order in paginatedOrders" :key="order.merchantTradeNo" class="order-card">
            <div class="order-info">
              <p><strong>訂單編號：</strong>{{ order.merchantTradeNo }}</p>
              <p><strong>會員編號：</strong>{{ order.cstmNum }}</p>
              <p><strong>訂購時間：</strong>{{ order.orderDate }}</p>
              <p><strong>取餐時間：</strong>{{ order.pickDate }}</p>
              <p><strong>總金額：</strong>{{ order.total }}</p>
              <p><strong>付款方式：</strong>{{ order.payMethod }}</p>
              <p><strong>狀態：</strong>{{ order.status }}</p>
            </div>
            <div class="order-actions">
              <el-button type="info" size="mini" @click="viewOrder(order)">查看</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="pagination-container">
      <el-pagination :page-size="pageSize" :pager-count="pagerCount" layout="prev, pager, next" :total="orders.length"
        @current-change="handlePageChange" />
    </div>

    <!-- 添加彈出窗口組件 -->
    <el-dialog v-model="dialogVisible" title="訂單詳情" width="80%" :before-close="handleClose">
      <OrderDetail :orderId="selectedOrderId" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import OrderDetail from './OrderDetail.vue'  // 導入OrderDetail組件

const userStore = useUserStore()
const router = useRouter()
const activeTab = ref('orders')

// 模擬的點餐數據
const orders = ref([
  { merchantTradeNo: '001', cstmNum: 'A001', orderDate: '2023-05-20', pickDate: '2023-05-20', total: '800', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '002', cstmNum: 'A005', orderDate: '2023-05-21', pickDate: '2023-05-21', total: '300', payMethod: '信用卡', status: '待確認' },
  { merchantTradeNo: '003', cstmNum: 'A010', orderDate: '2023-05-22', pickDate: '2023-05-22', total: '450', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '004', cstmNum: 'A003', orderDate: '2023-05-23', pickDate: '2023-05-23', total: '600', payMethod: '信用卡', status: '已確認' },
  { merchantTradeNo: '005', cstmNum: 'A007', orderDate: '2023-05-24', pickDate: '2023-05-24', total: '700', payMethod: '現金', status: '待確認' },
  { merchantTradeNo: '006', cstmNum: 'A002', orderDate: '2023-05-25', pickDate: '2023-05-25', total: '900', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '007', cstmNum: 'A008', orderDate: '2023-05-26', pickDate: '2023-05-26', total: '350', payMethod: '信用卡', status: '已確認' },
  { merchantTradeNo: '008', cstmNum: 'A004', orderDate: '2023-05-27', pickDate: '2023-05-27', total: '400', payMethod: '信用卡', status: '待確認' },
  { merchantTradeNo: '009', cstmNum: 'A009', orderDate: '2023-05-28', pickDate: '2023-05-28', total: '200', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '010', cstmNum: 'A011', orderDate: '2023-05-29', pickDate: '2023-05-29', total: '1000', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '011', cstmNum: 'A012', orderDate: '2023-05-30', pickDate: '2023-05-30', total: '500', payMethod: '信用卡', status: '待確認' },
  { merchantTradeNo: '012', cstmNum: 'A013', orderDate: '2023-05-31', pickDate: '2023-05-31', total: '300', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '013', cstmNum: 'A014', orderDate: '2023-06-01', pickDate: '2023-06-01', total: '450', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '014', cstmNum: 'A015', orderDate: '2023-06-02', pickDate: '2023-06-02', total: '600', payMethod: '信用卡', status: '待確認' },
  { merchantTradeNo: '015', cstmNum: 'A016', orderDate: '2023-06-03', pickDate: '2023-06-03', total: '750', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '016', cstmNum: 'A017', orderDate: '2023-06-04', pickDate: '2023-06-04', total: '900', payMethod: '現金', status: '待確認' },
  { merchantTradeNo: '017', cstmNum: 'A018', orderDate: '2023-06-05', pickDate: '2023-06-05', total: '200', payMethod: '信用卡', status: '已確認' },
  { merchantTradeNo: '018', cstmNum: 'A019', orderDate: '2023-06-06', pickDate: '2023-06-06', total: '1000', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '019', cstmNum: 'A020', orderDate: '2023-06-07', pickDate: '2023-06-07', total: '550', payMethod: '信用卡', status: '待確認' },
  { merchantTradeNo: '020', cstmNum: 'A021', orderDate: '2023-06-08', pickDate: '2023-06-08', total: '300', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '021', cstmNum: 'A022', orderDate: '2023-06-09', pickDate: '2023-06-09', total: '400', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '022', cstmNum: 'A023', orderDate: '2023-06-10', pickDate: '2023-06-10', total: '650', payMethod: '信用卡', status: '待確認' },
  { merchantTradeNo: '023', cstmNum: 'A024', orderDate: '2023-06-11', pickDate: '2023-06-11', total: '800', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '024', cstmNum: 'A025', orderDate: '2023-06-12', pickDate: '2023-06-12', total: '300', payMethod: '信用卡', status: '待確認' },
  { merchantTradeNo: '025', cstmNum: 'A026', orderDate: '2023-06-13', pickDate: '2023-06-13', total: '750', payMethod: '現金', status: '已確認' },
  { merchantTradeNo: '026', cstmNum: 'A027', orderDate: '2023-06-14', pickDate: '2023-06-14', total: '900', payMethod: '現金', status: '待確認' },
]);


// 分頁變數
const currentPage = ref(1)
const pageSize = 5
const pagerCount = 10

// 計算目前頁面顯示的訂單
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = currentPage.value * pageSize
  return orders.value.slice(start, end)
})

// 檢測是否是桌面版還是手機版
const isDesktop = ref(true)
const checkWindowWidth = () => {
  isDesktop.value = window.innerWidth > 768
}

// 當掛載完成時，檢查螢幕寬度，並監聽窗口調整大小事件
onMounted(() => {
  checkWindowWidth()
  window.addEventListener('resize', checkWindowWidth)
})

// 分頁事件處理
const handlePageChange = (page) => {
  currentPage.value = page
}

// 新增的狀態變量
const dialogVisible = ref(false)
const selectedOrderId = ref('')

// 修改viewOrder函數
const viewOrder = (row) => {
  selectedOrderId.value = row.merchantTradeNo
  dialogVisible.value = true
}

// 處理關閉對話框
const handleClose = (done) => {
  // 可以在這裡添加關閉前的確認邏輯
  done()
}

const editOrder = (row) => {
  console.log("修改", row)
  // 這裡可以添加修改訂單的邏輯
}
</script>

<style scoped>
.order-management {
  width: 100vh;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  /* 確保 padding 不會導致寬度超過 100% */
}

.el-table {
  width: 100%;
  max-height: 60vh;
  /* 設置最大高度來避免整個頁面出現滾動 */
  overflow-y: auto;
  /* 當表格內容超出時，僅表格內部出現滾動條 */
}


.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  overflow: hidden;
  /* 避免分頁超出視窗寬度 */
}


/* 桌面版樣式 */
.el-table-column {
  word-wrap: break-word;
}

/* 手機版卡片佈局 */
.mobile-order-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}


.order-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  /* 確保卡片寬度不會超過父元素 */
  box-sizing: border-box;
  /* 包含 padding */
}

.order-info p {
  margin: 5px 0;
}

.order-actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

/* RWD 調整 - 當螢幕寬度小於 576px */
@media (max-width: 576px) {
  .order-management {
    padding: 10px;
  }

  .order-card {
    padding: 8px;
  }

  .order-info p {
    font-size: 14px;
  }

  .el-button {
    font-size: 12px;
  }
}

/* 移除不再需要的鏈接樣式 */
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}
</style>