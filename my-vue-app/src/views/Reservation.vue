<template>
  <!-- 預約表單 -->
  <!-- clearable輸入框右側x快速刪除 -->
  <!-- flex-wrap 空間不足時會分行 -->
  <el-container class="bookingFormCs">
    <el-form v-model="bookingInfo">
      <el-row>
        <el-col :span="24">
          <h5>
            <el-icon><Search /></el-icon> 訂位查詢
          </h5>
        </el-col>
        <el-col :span="24" :md="8">
          <el-form-item label="預約日期">
            <el-date-picker
              :disabled-date="dateRange"
              v-model="bookingInfo.date"
              type="date"
              placeholder="請選擇日期"
              clearable
              class="inputWidthCs"
            />
          </el-form-item>
        </el-col>
        <!-- 人數 -->
        <el-col :span="24" :md="8">
          <el-form-item label="預約人數">
            <el-input-number
              v-model="bookingInfo.people"
              @input="checkPeople"
              :min="1"
              :max="20"
              class="inputWidthCs"
            />
          </el-form-item>
        </el-col>

        <!-- 餐期 -->
        <el-col :span="24" :md="8">
          <el-form-item label="餐期">
            <el-radio-group v-model="bookingInfo.mealPeriod" @change="showTime">
              <el-radio value="午餐">午餐</el-radio>
              <el-radio value="晚餐">晚餐</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="remindCs" v-if="peopleRemind || seatsRemind">
        {{ peopleRemind }}{{ seatsRemind }}
      </div>
      <!-- 時間 -->

      <el-form-item label="可選擇時間" v-if="availableTime.length > 0">
        <el-button
          round
          v-for="time in availableTime"
          v-model="fullSeats"
          :key="time"
          @click="selectTime(time)"
          :class="{ selectTimecs: bookingInfo.time === time }"
          :disabled="fullSeats"
          >{{ time }}</el-button
        >
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="btnSearch" :disabled="!formCorrect"
          >進行預約</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 會員登入框 -->
    <!-- login-success自定義的事件(Login.vue)。告訴父元件用戶已經成功登入了 -->
    <!-- v-model與Login組件的dialogVisible建立雙向綁定 -->
    <Login
      v-if="showLogin"
      v-model="showLogin"
      @login-success="getMemberData"
    />

    <el-dialog
      :visible.sync="bookingInfoPop"
      v-model="bookingInfoPop"
      title="預約資訊"
    >
      <p>姓名：</p>
      <p>電話：</p>
      <p>預約日期：{{ formatDate(bookingInfo.date) }}</p>
      <p>預約時間：{{ bookingInfo.time }}</p>
      <p>預約人數：{{ bookingInfo.people }}</p>

      <el-form-item label="素食者">
        <el-input-number
          v-model="bookingInfo.vegan"
          :max="bookingInfo.people"
          :length="20"
        />
      </el-form-item>

      <el-form-item label="備註(飲食特殊要求/過敏)">
        <el-input
          v-model="bookingInfo.specialRequest"
          type="textarea"
          :style="{ width: '400px', height: '200px' }"
        ></el-input>
      </el-form-item>

      <el-button type="primary" @click="btnBooking">確認預約</el-button>
    </el-dialog>
  </el-container>
</template>

<script lang="ts" setup>
//導入 ref 函數，這是一個用於創建響應式引用的 API。使用 ref 創建的變量會在其值變化時自動更新相關的 UI。

import { computed, ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import Login from "../components/Login.vue";
import { useUserStore } from "../stores/user";
import axios from "axios";
import CstmReservation from "./CstmReservation.vue";

//表單雙向設定
const bookingInfo = reactive({
  date: "",
  mealPeriod: "",
  time: "",
  people: 1,
  vegan: 0,
  specialRequest: "",
});

const availableTime = ref<string[]>([]);

//日期範圍從今日開始的兩個月內
//today.setHours(0,0,0,0)解決今天日期無法選擇的問題
const dateRange = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const twoMonths = new Date();
  twoMonths.setMonth(today.getMonth() + 2);

  return date < today || date > twoMonths;
};

//人數提醒條件
const peopleRemind = ref("");
const checkPeople = (value) => {
  if (value > 20) {
    peopleRemind.value = "預約人數超過20人請來電預約，12-345-6789，謝謝。";
  } else if (value < 1) {
    peopleRemind.value = "預約人數最少為1人";
  } else {
    peopleRemind.value = "";
  }
};

//各餐期預約人數
const reservedCounts = ref({
  午餐: 0,
  晚餐: 0,
});
//提醒
const seatsRemind = ref("");
//座位上限值
const maxSeats = 50;
//時間按鈕禁用
const fullSeats = ref(false);
//選擇餐期後顯示可選擇時間
const showTime = async () => {
  if (bookingInfo.mealPeriod) {
    availableTime.value =
      bookingInfo.mealPeriod === "午餐"
        ? ["11:00", "11:30", "12:00", "12:30", "13:00"]
        : ["17:00", "17:30", "18:00", "18:30", "19:00"];

    try {
      console.log("請求參數:", {
        mealPeriod: bookingInfo.mealPeriod,
        reservationDate: bookingInfo.date,
      });
      const response = await axios.get(
        "https://localhost:7139/v1/totalPeople",
        {
          params: {
            mealPeriod: bookingInfo.mealPeriod,
            reservationDate: bookingInfo.date,
          },
        }
      );
      console.log("API 返回數據:", response.data); // 確認數據結構

      const totalPeople = response.data.count || 0;
      const availableSeats = maxSeats - totalPeople;

      if (availableSeats <= 0) {
        seatsRemind.value = "該時段已滿，無法預約";
        fullSeats.value = true;
      } else {
        seatsRemind.value = `剩餘空位：${availableSeats}位`;
        fullSeats.value = false;
      }
    } catch (error) {
      console.error(
        "獲取已預約人數失敗",
        error.response?.data || error.message
      );
      seatsRemind.value = "無法獲取可預約座位數，請稍後再試";
    }
  }
};

// //取得該餐期已預約的總人數跟剩餘座位量
// const totalPeople = reservedCounts.value[bookingInfo.mealPeriod] || 0;

// const availableSeats = maxSeats - totalPeople;

// if (availableSeats <= 0) {
//   seatsRemind.value = "該時段已滿，無法預約";
//   fullSeats.value = true;
//   console.log(fullSeats);
// } else {
//   seatsRemind.value = `剩餘空位：${availableSeats}位`;
//   fullSeats.value = false;
// }

//選擇時間後綁訂到bookingInfo的值
const selectTime = (time: string) => {
  bookingInfo.time = time;
};

//預約時確認表單資料是否正確
const formCorrect = computed(() => {
  return (
    bookingInfo.date &&
    bookingInfo.mealPeriod &&
    bookingInfo.time &&
    bookingInfo.people
  );
});

//會員登入框是否出現
const showLogin = ref(false);

//預約成功後跳出的預約資訊
const bookingInfoPop = ref(false);
//預約資訊日期格式調整
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

//預約時確認是否已登入會員，若無則跳出會員登入框
//isLoggedIn(user.js)表是否登入
//預約成功將資料提交到後端API
const btnSearch = () => {
  console.log("用戶登入狀態:", userStore.isLoggedIn); // 調試語句
  if (!userStore.isLoggedIn) {
    showLogin.value = true;
    console.log("用戶未登入，顯示登入框");
    return;
  }
  // 重置預約資訊，這樣每次查詢都是最新的
  bookingInfoPop.value = {};

  if (!bookingInfo.time) {
    console.error("預約時間尚未選擇");
    return; // 若尚未選擇時間則不顯示彈窗
  }

  // 如果已登入，顯示預約資訊
  console.log("用戶已登入，顯示預約資訊:");
  console.log("預約資訊:", bookingInfoPop.value);
};

//確認預約
const btnBooking = async () => {
  //修正為DateTime格式
  var formattedDate =
    bookingInfo.date.toISOString().slice(0, 10) +
    " " +
    bookingInfo.time +
    ":00";
  if (
    bookingInfo.specialRequest === null ||
    bookingInfo.specialRequest === ""
  ) {
    bookingInfo.specialRequest = "無";
  }

  console.log(formattedDate, bookingInfo.specialRequest);

  //將預約資料提交到後端
  try {
    const response = await axios.post("https://localhost:7139/v1/Reservation", {
      reservationDate: formattedDate,
      mealPeriod: bookingInfo.mealPeriod,
      people: bookingInfo.people,
      status: "已預約",
      vegan: bookingInfo.vegan,
      specialRequest: bookingInfo.specialRequest,
    });
    console.log("預約成功:", response.data);

    clearBookingInfo();
  } catch (error) {
    console.log("預約失敗", "發送數據:", {
      reservationDate: formattedDate,
      mealPeriod: bookingInfo.mealPeriod,
      time: bookingInfo.time,
      people: bookingInfo.people,
      vegan: bookingInfo.vegan,
      specialRequest: bookingInfo.specialRequest,
    });
    alert("預約失敗，請稍後再進行");
  } finally {
    bookingInfoPop.value = false;
    clearBookingInfo();
  }
};

//清空選取值
const clearBookingInfo = () => {
  (bookingInfo.mealPeriod = ""),
    (bookingInfo.time = ""),
    (bookingInfo.people = 1),
    (bookingInfo.vegan = 0);
};

//在store找有無資料，useUserStore()是user.js裡創建的
const userStore = useUserStore();

//登入成功後取得會員資料
//當用戶登入成功後，user 物件作為參數發送到 login-success 事件中
//在 getMemberData 中接收 user 參數，然後提取 name 和 phone。
const getMemberData = (user) => {
  const userName = user.name;
  const userPhone = user.phone;
  bookingInfoPop.value = true;

  console.log(`會員姓名: ${userName}, 會員電話: ${userPhone}`); //確認調用狀況
};
</script>

<style>
.bookingFormCs {
  border: solid 1px #000;
  margin: 50px auto;
  padding: 20px;
  padding-left: 50px;
  border-radius: 15px;
  width: 75vw;
}

.inputWidthCs {
  width: 120px;
}

.selectTimecs {
  background-color: #409eff;
  color: #fff;
}

.remindCs {
  margin-bottom: 15px;
  color: brown;
}
</style>
