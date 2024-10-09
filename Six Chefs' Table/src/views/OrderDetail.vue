<template>
  <div class="order-detail-management">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="待確認" name="pending">
        <!-- 桌面版顯示表格 -->
        <el-table v-if="isDesktop" :data="paginatedOrderDetails" style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column prop="image" label="商品圖片" width="150">
            <template #default="scope">
              <img :src="scope.row.image" alt="商品圖片" style="width: 100px; height: auto;" />
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="商品名稱" width="100"></el-table-column>
          <el-table-column prop="quantity" label="數量" width="100"></el-table-column>
          <el-table-column prop="price" label="單價" width="120"></el-table-column>
          <el-table-column prop="total" label="總金額" width="120"></el-table-column>
          <!-- 操作按鈕 -->
          <el-table-column label="" width="180">
            <template #default="scope">
              <el-button type="info" @click="viewOrder(scope.row)">編輯</el-button>
              <el-button type="danger" @click="editOrder(scope.row)">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
        

        <!-- 手機版顯示卡片式佈局 -->
        <div v-else class="mobile-order-detail-cards">

          <div v-for="detail in paginatedOrderDetails" :key="detail.id" class="order-detail-card">

            <div class="order-detail-image">
              <img :src="detail.image" alt="商品圖片" />
            </div>
            <div class="order-detail-info">
              <p><strong>數量：</strong>{{ detail.quantity }}</p>
              <p><strong>單價：</strong>{{ detail.price }}</p>
              <p><strong>總金額：</strong>{{ detail.total }}</p>
            </div>
            <div class="order-detail-actions">
              <el-button type="info" size="mini" @click="editDetail(detail)">編輯</el-button>
              <el-button type="danger" size="mini" @click="deleteDetail(detail)">刪除</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="已確認" name="confirmed">
        <h3>已確認訂單</h3>
        <el-table :data="confirmedOrders" style="width: 100%">
          <el-table-column prop="orderNumber" label="訂單編號" width="120"></el-table-column>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="items" label="餐點" :formatter="formatItems"></el-table-column>
          <el-table-column prop="total" label="總金額" width="120"></el-table-column>
          <el-table-column prop="status" label="狀態" width="100"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="pagination-container">
      <el-pagination :page-size="pageSize" :pager-count="pagerCount" layout="prev, pager, next"
        :total="orderDetails.length" @current-change="handlePageChange" />
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const activeTab = ref('pending')

// 模擬的訂單明細數據
const orderDetails = ref([
  { id: '001', image: '/images/order-img.jpg', productName: '商品A', quantity: 2, price: 150, total: 300 },
  { id: '002', image: '/images/order-img.jpg', productName: '商品B', quantity: 1, price: 200, total: 200 },
  { id: '003', image: '/images/order-img.jpg', productName: '商品C', quantity: 3, price: 100, total: 300 },
  { id: '004', image: '/images/order-img.jpg', productName: '商品D', quantity: 4, price: 250, total: 1000 },
  { id: '005', image: '/images/order-img.jpg', productName: '商品E', quantity: 5, price: 80, total: 400 },
])

// 分頁變數
const currentPage = ref(1)
const pageSize = 5
const pagerCount = 10

// 計算目前頁面顯示的訂單明細
const paginatedOrderDetails = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = currentPage.value * pageSize
  return orderDetails.value.slice(start, end)
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

// 操作函數
const editDetail = (row) => {
  console.log("編輯", row)
}

const deleteDetail = (row) => {
  console.log("刪除", row)
}

const isAllSelected = ref(false)
const selectedItems = ref([])

// 處理全選
const handleSelectAll = (val) => {
  paginatedOrderDetails.value.forEach(item => {
    item.isSelected = val
  })
  selectedItems.value = val ? [...paginatedOrderDetails.value] : []
}

// 處理單個項目選擇
const handleItemSelect = () => {
  isAllSelected.value = paginatedOrderDetails.value.every(item => item.isSelected)
  selectedItems.value = paginatedOrderDetails.value.filter(item => item.isSelected)
}

// 處理表格選擇變化（桌面版）
const handleSelectionChange = (selection) => {
  selectedItems.value = selection
  isAllSelected.value = selection.length === paginatedOrderDetails.value.length
}

// 監聽分頁變化，重置選擇狀態
watch(currentPage, () => {
  isAllSelected.value = false
  selectedItems.value = []
})

// 新增已確認訂單的模擬數據
const confirmedOrders = ref([
  { orderNumber: 'A001', date: '2023-05-01', items: '商品A x2, 商品B x1', total: 500, status: '已完成' },
  { orderNumber: 'A002', date: '2023-05-02', items: '商品C x3, 商品D x2', total: 800, status: '已完成' },
  { orderNumber: 'A003', date: '2023-05-03', items: '商品E x1, 商品F x4', total: 600, status: '已完成' },
])

// 格式化餐點項目
const formatItems = (row) => {
  return row.items
}
</script>

<style scoped>
.order-detail-management {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* 桌面版樣式 */
.el-table-column {
  word-wrap: break-word;
}

/* 手機版卡片佈局 */
.mobile-order-detail-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.order-detail-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.order-detail-image img {
  width: 100px;
  height: auto;
}

.order-detail-info p {
  margin: 5px 0;
}

.order-detail-actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

/* RWD 調整 - 當螢幕寬度小於 576px */
@media (max-width: 576px) {
  .order-detail-management {
    padding: 10px;
  }

  .order-detail-card {
    padding: 10px;
  }

  .order-detail-info p {
    font-size: 14px;
  }

  /* 固定的底部確認按鈕 */
  .mobile-fixed-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 10px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    border-top: 1px solid #ccc;
  }

  .mobile-fixed-footer .el-button {
    width: 90%;
    font-size: 16px;
  }
}
</style>
