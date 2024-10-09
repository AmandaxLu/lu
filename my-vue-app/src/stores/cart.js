import axios from "axios";
import { defineStore } from "pinia";
export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    updated: [],
    load: true,
    cstmData: null,
  }),
  getters: {
    // 在Cart.vue裡面可以用來取得資料
    getCartItems: (state) => state.items,
    getPriceTotal: (state) =>
      state.items.reduce((total, item) => item.totalPrice + total, 0),
    getLoad: (state) => state.load,
    getCstmData: (state) => state.cstmData,
  },
  actions: {
    async getCartItemsAPI() {
      console.log("開始獲取購物車數據");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/cart`
        );
        console.log("獲取的數據:", response.data);
        // 將取出來資料存進items
        this.items = response.data.data.cartItems;
        this.cstmData = response.data.data.cstmData;
        this.load = false;
      } catch (error) {
        console.error("獲取購物車數據失敗:", error.response.data.message);
      }
    },
    async updateCartItemsAPI() {
      // 如果沒有要更新就直接return;
      if (this.updated.length === 0) return;
      try {
        // 放this.updated是因為後端接收參數的是集合物件
        const res = await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/cart`,
          this.updated
        );
        console.log(res.data);
        // 成功後清空更新的狀態
        this.updated = [];
      } catch (error) {
        console.error("更新購物車項目時出錯：", error.response.data.message);
      }
    },
    async addCartItemAPI(itemId) {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/Cart/${itemId}`
      );
      console.log(response.data);
    },
    async removeCartItemAPI(itemId) {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/Cart/${itemId}`
      );
      console.log(response.data);
      this.items = this.items.filter((i) => i.menuId !== itemId);
    },
    // 更新數量
    updateItemQuantity(itemId, change) {
      const item = this.items.find((i) => i.menuId === itemId);
      if (item) {
        item.quantity += change;
        item.totalPrice = item.price * item.quantity;

        // 有更新數量就要將更新的數量，放進或更新 updated 陣列裡面
        const updateItem = this.updated.find((i) => i.menuId === itemId);
        if (updateItem) {
          // 如果陣列裡面已經有存在 menuId 的項目，就只需要更新數量
          updateItem.quantity = item.quantity;
        } else {
          // 如果陣列沒有存在 menuId 的項目，就要放該 menuId 進去
          this.updated.push({ menuId: itemId, quantity: item.quantity });
        }
      }
    },
    // 結帳method
    async createECPayOrder(data) {
      // 發送 POST 請求到後端 API，創建支付訂單
      await axios
        .post(
          `${import.meta.env.VITE_APP_API_URL}/api/ECPay/ECPayCreateOrder`,
          data
        )
        .then((response) => {
          console.log("成功", response.data); // 打印成功響應

          // 如果響應中有數據，則進行表單提交
          if (response.data) {
            // 創建一個新的表單元素
            const form = document.createElement("form");
            form.innerHTML = response.data; // 將後端返回的 HTML 表單內容設置為表單的內部 HTML
            form.method = "POST"; // 設置表單提交方法為 POST
            form.action =
              "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"; // 設置表單的提交地址為 ECPay 的支付地址
            form.target = "_blank"; // 設置為新窗口提交（如需可啟用此行）

            // 將表單元素添加到文檔的 body 中
            document.body.appendChild(form);

            // 提交表單
            form.submit();

            // 提交後，稍後刪除表單元素以保持文檔整潔
            setTimeout(() => {
              document.body.removeChild(form);
            }, 100);
          }
        })
        .catch((error) => {
          // 捕獲任何錯誤並在控制台打印
          console.error("支付失敗:", error);
          // 提示用戶支付過程中出現錯誤
          ElMessage.error("支付過程中出現錯誤，請重試。");
        });
    },
  },
});
