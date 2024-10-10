import { defineStore } from "pinia";
import request from "../axios";
export const useOrdersStore = defineStore("order", {
  state: () => ({
    orders: [],
  }),
  getters: {
    getOrders: (state) => state.orders,
  },
  actions: {
    async getAllOrders() {
      console.log("開始查詢訂單資訊");
      await request
        .get("/orders")
        .then((response) => {
          console.log("獲取的數據:", response);
          this.orders = response.data;
        })
        .catch((error) => {
          console.error("獲取訂單資訊錯誤" + error);
        });
    },
  },
});
