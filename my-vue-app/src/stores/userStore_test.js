import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    userName: "",
    userTel: "",
  }),

  //name 和 tel 是作為參數傳入的。在 handleLogin 函數中，你會這樣調用它
  //userStore.setUserData(userData.cstmUserName, userData.cstmTel);
  actions: {
    login(userData) {
      this.isLoggedIn = true; // 設置為已登入
      this.userName = userData.cstmUserName; // 保存用戶名稱
      this.userTel = userData.cstmTel; // 保存用戶電話
    },
    logout() {
      this.isLoggedIn = false; // 設置為未登入
      this.userName = "";
      this.userTel = "";
    },

    //只是為了方便其他元件進行資料更新，測試用不會用到
    updateUser(updatedUserData) {
      this.userName = updatedUserData.userName || this.userName; // 更新用戶名稱
      this.userTel = updatedUserData.userTel || this.userTel; // 更新用戶電話
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.userName, // 判斷用戶是否登入
  },
});
