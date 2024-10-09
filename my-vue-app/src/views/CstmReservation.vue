<template>
  <el-table :data="reservationData" stripe style="width: 80%">
    <el-table-column
      prop="reservationDate"
      label="訂位日期"
      class="tableWidthCs"
    >
      <template #default="scope">
        <span v-html="scope.row.reservationDate"></span>
      </template>
    </el-table-column>

    <el-table-column prop="people" label="人數" class="tableWidthCs" />
    <el-table-column prop="status" label="訂位狀態" class="tableWidthCs" />
    <el-table-column label="詳細資訊">
      <template #default="scope">
        素食者：{{ scope.row.vegan }}位 特殊需求：{{ scope.row.specialRequest }}
      </template>
    </el-table-column>
    <!-- 
    <el-table-column label="修改">
      <el-button @click=""></el-button>
    </el-table-column>

    <el-table-column label="刪除">
      <el-button @click=""></el-button>
    </el-table-column> -->
  </el-table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const formatDate = (date) => {
  const dateObj = new Date(date);
  const datePart = dateObj.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timePart = dateObj.toLocaleDateString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
  });

  return `${datePart}<br>${timePart}`;
};

// 使用靜態數據初始化 reservationData
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

//處理訂位狀態

//修改
const reservationEdit = ref([]);

//刪除

//測試用假數據
const testCstmNum = "00000001";

onMounted(() => fetchReservations(testCstmNum));
</script>
<style>
.tableWidthCs {
  width: 100px;
}
</style>
