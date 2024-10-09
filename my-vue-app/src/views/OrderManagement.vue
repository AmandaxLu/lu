<template>
  <div class="order-management">
    <h2>訂單管理</h2>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="訂位記錄" name="reservations">
        <h3>訂位記錄</h3>
        <el-table :data="reservationData" stripe style="width: 100%">
          <el-table-column
            prop="reservationDate"
            label="訂位日期"
            class="tableWidthCs"
          />
          <el-table-column prop="people" label="人數" class="tableWidthCs" />
          <el-table-column
            prop="status"
            label="訂位狀態"
            class="tableWidthCs"
          />
          <el-table-column label="詳細資訊">
            <template #default="scope">
              素食者：{{ scope.row.vegan }}位 特殊需求：{{
                scope.row.specialRequest
              }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="點餐記錄" name="orders">
        <h3>點餐記錄</h3>
        <el-table :data="orders" style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="items"
            label="餐點"
            :formatter="formatItems"
          ></el-table-column>
          <el-table-column
            prop="total"
            label="總金額"
            width="120"
          ></el-table-column>
          <el-table-column prop="status" label="狀態"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const activeTab = ref("reservations");

// 訂位-時間格式處理
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
  });
};

// 訂位-API
const reservationData = ref([]);
const fetchReservations = async (cstmNum) => {
  try {
    const response = await axios.get("https://localhost:7139/v1/Reservations", {
      params: { cstmNum: cstmNum },
    });
    // 格式化日期
    reservationData.value = response.data.map((reservation) => {
      return {
        ...reservation,
        reservationDate: formatDate(reservation.reservationDate),
      };
    });
  } catch (error) {
    console.log("讀取失敗", error);
  }
};

//訂位-測試用假數據
const testCstmNum = "00000004";
//訂位-加載
onMounted(() => fetchReservations(testCstmNum));

// 模擬的點餐數據
const orders = ref([
  {
    date: "2023-05-20",
    items: [
      { name: "牛排", quantity: 2 },
      { name: "沙拉", quantity: 1 },
    ],
    total: 1200,
    status: "已完成",
  },
  {
    date: "2023-05-25",
    items: [
      { name: "義大利麵", quantity: 3 },
      { name: "蒜香麵包", quantity: 2 },
    ],
    total: 800,
    status: "處理中",
  },
]);

// 格式化點餐項目
const formatItems = (row) => {
  return row.items.map((item) => `${item.name} x${item.quantity}`).join(", ");
};

// 在這裡你可以添加獲取實際訂單數據的邏輯
// 例如，從API獲取數據並更新reservations和orders
</script>

<style scoped>
.order-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
