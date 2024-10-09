<template>
  <div class="cart-container">
    <div class="cart">
      <h2>購物車</h2>
      <div v-if="cartItems.length === 0" class="empty-cart">購物車是空的</div>
      <div v-else-if="load">正在加載產品...</div>
      <div v-else>
        <el-row :gutter="20" justify="center">
          <el-col :span="24">
            <el-select
              v-model="pickDate"
              placeholder="選擇取餐日期"
              @change="changePickDate"
            >
              <el-option
                v-for="date in enableDates"
                :key="date"
                :label="formatDate(date)"
                :value="date"
              ></el-option>
            </el-select>
            <el-select v-model="pickTime" placeholder="選擇取餐日時間">
              <el-option
                v-for="time in enableTimes"
                :key="time"
                :label="time"
                :value="time"
              ></el-option>
            </el-select>
            <div style="margin: 1rem 0">
              預約時間： {{ formatDate(pickDate) }} {{ pickTime }}
            </div>
          </el-col>
          <el-col :span="24" v-for="item in cartItems" :key="item.menuId">
            <el-card class="cart-item">
              <el-row type="flex">
                <el-row align="middle">
                  <el-col :span="5">
                    <img
                      :src="`${apiUrl}${item.menuImage}`"
                      alt="menuImage"
                      class="item-image"
                    />
                  </el-col>
                </el-row>
                <el-col :span="18">
                  <el-col>
                    <h3>{{ item.menuTitle }}</h3>
                  </el-col>
                  <el-col>
                    <el-row justify="space-between" align="middle">
                      <div class="quantity-control">
                        <el-button
                          @click="decrementQuantity(item)"
                          :disabled="item.quantity <= 1"
                          >-</el-button
                        >
                        <span class="quantity">{{ item.quantity }}</span>
                        <el-button
                          @click="incrementQuantity(item)"
                          :disabled="item.quantity >= 20"
                          >+</el-button
                        >
                      </div>
                      <p>
                        價格: <strong>${{ item.price }}</strong>
                      </p>
                      <p>
                        小計: <strong>${{ item.totalPrice }}</strong>
                      </p>
                    </el-row>
                  </el-col>
                </el-col>
                <el-row align="middle" justify="center">
                  <el-col :span="1">
                    <el-button type="danger" @click="removeItem(item)"
                      >刪除</el-button
                    >
                  </el-col>
                </el-row>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <el-row justify="space-between" style="margin-top: 20px">
          <el-col :span="12" style="text-align: center">
            總計: <strong>${{ totalPrice }}</strong>
          </el-col>
          <el-col :span="12">
            <el-button
              type="primary"
              @click="checkout"
              style="width: 100%; font-size: 1rem"
              >前往結帳</el-button
            >
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed, ref } from "vue";
import { useCartStore } from "../stores/cart.js";
import { ElMessage } from "element-plus"; // 彈出小視窗，有點像alert
import {
  addDays,
  format,
  parse,
  isToday,
  addMinutes,
  isTomorrow,
  add,
} from "date-fns";
const cartStore = useCartStore();

const apiUrl = import.meta.env.VITE_APP_API_URL;

const cartItems = computed(() => cartStore.getCartItems);
const totalPrice = computed(() => cartStore.getPriceTotal);
const cstmData = computed(() => cartStore.getCstmData);
const load = computed(() => cartStore.getLoad);

onMounted(() => {
  cartStore.getCartItemsAPI();
  changePickDate();
  generateEnableDates();
});
onUnmounted(() => {
  console.log("已離開組件，進行購物車更新。。。。");
  cartStore.updateCartItemsAPI();
});

// 更新數量
const incrementQuantity = (item) => {
  cartStore.updateItemQuantity(item.menuId, 1);
};
const decrementQuantity = (item) => {
  cartStore.updateItemQuantity(item.menuId, -1);
};
// 刪除某一筆
const removeItem = (item) => {
  cartStore.removeCartItemAPI(item.menuId);
};
// element plus 的時間選擇器太難用了
const today = new Date(); // 獲取當前時間
// 選擇日期
const pickDate = ref(new Date().toLocaleDateString()); // 初始化為今天
const enableDates = ref([]);
// 畫面載入時也會執行此function
const generateEnableDates = () => {
  let starDay = 0;
  // 如果現在時間超過9點，起始天數+1
  if (today.getHours() >= 21) {
    starDay = 1;
    pickDate.value = addDays(new Date(), 1).toLocaleDateString();
  }
  // 只能選擇今天往後推算5天
  for (let day = starDay; day < 5; day++) {
    enableDates.value.push(addDays(new Date(), day).toLocaleDateString());
  }
};
// 格式化選項日期
const formatDate = (date) => {
  return format(date, "yyyy年MM月dd日");
};
// 選擇時間
const pickTime = ref(format(addMinutes(new Date(), 30), "HH:mm"));
const enableTimes = ref([]);

// 改變預約日期是會執行此function
const changePickDate = () => {
  enableTimes.value = []; // 先清空，等等重新放新時間
  const selectedDate = new Date(pickDate.value); // 獲取選擇的日期

  // 判斷選擇的日期是否為今天，跟是否在今天營業時間內
  if (
    isToday(selectedDate) &&
    today.getHours() < 21 &&
    today.getHours() >= 11
  ) {
    // 如果選擇的是今天要把選項先改為現在
    pickTime.value = format(addMinutes(new Date(), 30), "HH:mm");

    let currentHour = today.getHours();
    // 如果使用者在30分之後預約餐點，取餐時間要再往後延，最多延長59分鐘
    if (today.getMinutes() >= 30) {
      currentHour++;
      enableTimes.value.push(`${currentHour}:30`);
    }
    for (let hour = currentHour + 1; hour <= 20; hour++) {
      enableTimes.value.push(`${hour}:00`);
      enableTimes.value.push(`${hour}:30`);
    }
  } else {
    for (let hour = 12; hour <= 20; hour++) {
      enableTimes.value.push(`${hour}:00`);
      enableTimes.value.push(`${hour}:30`);
    }
  }
};

// 前往結帳的異步函數
const checkout = async () => {
  let time = pickTime.value.split(":").map(Number);
  if (time[0] >= 21 || time[0] <= 11) {
    ElMessage.error("取餐時間請小於晚上9點或大於11點");
  } else {
    // 準備結帳所需的數據，包括商品名稱和總金額
    const data = {
      ItemName: cartItems.value
        .map((i) => `${i.menuId}.${i.menuTitle}X${i.quantity} $${i.price}`)
        .join("#"), // 將購物車中的商品名稱以 '#' 連接
      TotalPrice: totalPrice.value, // 總金額
      //想放在客製欄位的
      CstmData: cstmData.value,
      PickDate: `${new Date(pickDate.value).toLocaleDateString()} ${
        pickTime.value
      }`,
    };
    cartStore.createECPayOrder(data);
  }
};
</script>

<style lang="scss" scoped>
.cart-container {
  display: flex;
  justify-content: center;
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
  padding: 20px 0;

  .cart {
    width: 100%;
    max-width: 800px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .empty-cart {
      text-align: center;
      font-size: 18px;
      color: #999;
    }

    .cart-item {
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .item-content {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      margin-right: 10px;
      border-radius: 4px;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }

    .quantity {
      margin: 0 10px;
      font-size: 16px;
    }
  }
}
</style>
