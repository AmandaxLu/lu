<template>
  <el-row class="header-container">
    <div class="menu-container" :sm="24">
      <div class="logo">
        <img src="/images/logo-1.jpg" alt="Logo" />
        Six Chefs' Table
      </div>
      <!-- 電腦版的選單 -->
      <el-menu
        class="desktop-menu no-underline-menu"
        mode="horizontal"
        :ellipsis="false"
        text-color="#fff"
        background-color="#000"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/" @click="GoLogIn">首頁</el-menu-item>
        <!-- <el-menu-item index="/shop">外帶預訂</el-menu-item> -->
        <el-menu-item index="/cart">購物車</el-menu-item>
        <el-menu-item index="/reservation">線上訂位</el-menu-item>
        <el-menu-item index="/shop">餐點</el-menu-item>
        <el-menu-item index="/CstmData" @click="GoCstmData"
          >會員資料</el-menu-item
        >
        <el-menu-item index="/order-management">訂單管理</el-menu-item>
        <el-menu-item index="/G_LogIn" @click="GoLogIn">登入</el-menu-item>
        <!-- <el-menu-item v-if="userStore.isLoggedIn" index="/profile"
          >會員資料</el-menu-item -->
        >
        <el-menu-item v-if="userStore.isLoggedIn" index="/order-management"
          >訂單管理</el-menu-item
        >
        <!-- <el-menu-item v-if="!userStore.isLoggedIn" @click="openLoginDialog"
          >登入</el-menu-item
        > -->
      </el-menu>
      <div class="reservation-icon" @click="goToReservationPage">
        <el-icon class="calendar-icon">
          <Calendar />
        </el-icon>
        <div class="reservation-text">reservation</div>
      </div>

      <!-- 手機版的漢堡選單按鈕 -->
      <div class="hamburger-menu" @click="openDrawer">☰</div>
    </div>
  </el-row>

  <!-- 手機版的側邊欄選單 -->
  <el-drawer
    v-model="drawerVisible"
    direction="ltr"
    size="100%"
    class="no-underline-menu mobile-drawer"
    :with-header="false"
  >
    <div class="mobile-drawer-content">
      <div class="mobile-drawer-header">
        <div class="mobile-logo">
          <img src="/images/logo-1.jpg" alt="Logo" />
          Six Chefs' Table
        </div>
        <el-icon class="drawer-close" @click="drawerVisible = false">
          <Close />
        </el-icon>
      </div>
      <el-menu mode="vertical" :ellipsis="false" router class="mobile-menu">
        <el-menu-item index="/" @click="handleSelect('/')">首頁</el-menu-item>
        <el-menu-item index="/shop" @click="handleSelect('/shop')"
          >外帶預訂</el-menu-item
        >
        <el-menu-item index="/cart" @click="handleSelect('/cart')"
          >購物車</el-menu-item
        >
        <el-menu-item index="/reservation" @click="handleSelect('/reservation')"
          >線上訂位</el-menu-item
        >
        <el-menu-item index="/CstmData" @click="handleSelect('/CstmData')"
          >會員註冊</el-menu-item
        >
        <el-menu-item
          index="/order-management"
          @click="handleSelect('/order-management')"
          >訂單管理</el-menu-item
        ><!-- 測試(後續刪除) -->
        <el-menu-item
          v-if="userStore.isLoggedIn"
          index="/profile"
          @click="handleSelect('/profile')"
          >會員資料</el-menu-item
        >
        <el-menu-item
          v-if="userStore.isLoggedIn"
          index="/order-management"
          @click="handleSelect('/order-management')"
          >訂單管理</el-menu-item
        >
        <el-menu-item v-if="!userStore.isLoggedIn" @click="handleLoginClick"
          >登入</el-menu-item
        >
        <el-menu-item v-else @click="handleLogoutClick">登出</el-menu-item>
        <hr />
        <div class="brand-container">
          <img src="/images/ig-brand.svg" alt="IG brand" class="brand" />
          <img src="/images/fb-brand.svg" alt="FB brand" class="brand" />
          <!-- <img src="/images/line-brand.png" alt="line brand" class="brand"> -->
        </div>
        <div class="actions">
          <el-button type="info" @click="$router.push('/shop')"
            >瀏覽菜單</el-button
          >
          <el-button type="info" @click="$router.push('/reservation')"
            >立即預約</el-button
          >
        </div>
      </el-menu>
      <div class="drawer-footer">
        &copy; 2024 Six Chefs’ Table. All rights reserved.
      </div>
    </div>
  </el-drawer>

  <!-- 登入彈窗 -->
  <!-- <Login v-model="loginDialogVisible" @login-success="handleLoginSuccess" /> -->
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import Login from "./Login.vue";
import { Close, Calendar } from "@element-plus/icons-vue";

const userStore = useUserStore();
const router = useRouter();

// 控制登入對話框的顯示與隱藏
const loginDialogVisible = ref(false);
const openLoginDialog = () => {
  loginDialogVisible.value = true;
};

const handleLoginSuccess = () => {
  loginDialogVisible.value = false;
};

// 控制漢堡選單的側邊欄顯示與隱藏
const drawerVisible = ref(false);
const isDesktop = ref(window.innerWidth > 768);

// 檢查窗口寬度的函數
const checkWindowWidth = () => {
  isDesktop.value = window.innerWidth > 768;
};

// 監聽窗口大小變化
onMounted(() => {
  window.addEventListener("resize", checkWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkWindowWidth);
});

// 監聽isDesktop的變化
watch(isDesktop, (newValue) => {
  if (newValue) {
    drawerVisible.value = false;
  }
});

const openDrawer = () => {
  drawerVisible.value = true; // 打開側邊欄
};

const logout = () => {
  userStore.logout();
  router.push("/");
};

const goToReservationPage = () => {
  router.push("/reservation"); // 導航到線上訂位頁面
};

// 修改 handleSelect 函數
const handleSelect = (route) => {
  drawerVisible.value = false; // 關閉側邊欄
  router.push(route); // 導航到選中的路由
};

// 修改 handleLoginClick 和 handleLogoutClick 函數
const handleLoginClick = () => {
  drawerVisible.value = false; // 關閉側邊欄
  openLoginDialog(); // 打開登入對話框
};

const handleLogoutClick = () => {
  drawerVisible.value = false; // 關閉側邊欄
  logout(); // 執行登出操作
};
</script>

<script>
// import { mapState } from "vuex";
// import Login from "./Login.vue";
// export default {
//   components: {
//     Login,
//   },
//   data() {
//     return {};
//   },
//   computed: {
//     ...mapState({
//       IsLogIn: (state) => state.IsLogIn, // 映射 Vuex 中的 IsLogIn
//       WhereToGo: (state) => state.WhereToGo, // 映射 Vuex 中的 WhereToGo
//     }),
//   },
//   methods: {
//     navigateTo(path) {
//       this.$router.push(path); // 路由跳转方法
//     },
//     GoCstmData() {

//       localStorage.setItem("WhereToGo", "/CstmData"); // 将路径存储到 sessionStorage
//       try {
//         if (this.IsLogIn) {
//           this.navigateTo("/CstmData");
//         } else {
//           alert("請先登入");
//           this.navigateTo("/G_LogIn");
//         }
//       } catch (error) {
//         console.error("Error in checkLogin:", error);
//       }
//     },
//     GoLogIn() {
//       localStorage.setItem("WhereToGo", "/"); // 将路径存储到 sessionStorage
//       this.navigateTo("/G_LogIn");
//     },
//   },
// };
</script>

<style scoped>
.header-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.98);
  padding: 5px;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(129, 129, 129, 0.8);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  padding: 5px 0px 5px 25px;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(223, 241, 178, 0.7);
  flex: 1; /* 在桌面版左側佔據空間 */
  text-align: left; /* 默認文字居左 */
  display: inline-block;
}

.logo img {
  width: 75px;
  height: 75px;
  filter: invert(1);
  vertical-align: bottom; /* 將圖片的底部對齊 */
}

.menu-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 電腦版左右對齊 */
}

.hamburger-menu {
  display: none;
}

.el-menu {
  border-bottom: none !important;
  background-color: transparent !important;
}

.el-menu-item {
  background-color: transparent !important;
  font-size: 16px;
  color: #ffffff !important;
}

.el-menu--horizontal > .el-menu-item {
  border-bottom: none !important;
}

.reservation-icon {
  width: 100px;
  height: 100px;
  background-color: rgba(136, 129, 89, 0.9);
  /* 背景色可以調整 */
  border-radius: 50%;
  color: white;
  text-align: center;
  position: fixed;
  /* 垂直居中 */
  font-size: 15px;
  font-weight: bold;
  position: fixed;
  right: 5%;
  bottom: 5%;
  cursor: pointer;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.calendar-icon {
  color: white;
  font-size: 35px;
  margin-bottom: 5px;
}

.reservation-text {
  color: white;
}

/* 手機版的樣式調整 */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
    /* 隱藏電腦版的選單 */
  }

  .el-drawer .el-menu-item {
    color: #000000 !important;
    border-right: none !important;
    font-size: 18px;
    /* 調整為您想要的大小 */
  }

  .hamburger-menu {
    display: block;
    font-size: 24px;
    padding: 10px;
    color: white;
    cursor: pointer;
    /* 指針樣式 */
    z-index: 1001;
    /* 確保漢堡按鈕在 header 之上 */
  }

  .logo {
    text-align: center;
    flex: 1;
    /* 讓 logo 佔據剩餘空間 */
    width: 100%;
  }

  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom-color: #ffd04b !important;
    /* 保持活動項的底部邊框顏色 */
  }

  .menu-container {
    justify-content: space-between;
    /* 手機版的選單和 logo 調整位置 */
    width: 100%;
  }

  .mobile-drawer {
    background-color: #000 !important;
    width: 100vw !important;
    max-width: 100% !important;
  }

  .mobile-drawer :deep(.el-drawer__body) {
    padding: 0;
    overflow: hidden;
  }

  .mobile-drawer-content {
    display: flex;
    flex-direction: column;
    /* min-height: 100vh;  */
    height: 100%;
    padding-top: 20px;
    background-color: #000;
    overflow-y: auto;
  }

  .mobile-drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }

  .drawer-close {
    color: #fff;
    font-size: 24px;
    cursor: pointer;
  }

  .mobile-logo {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    text-shadow: 1px 1px 3px rgba(223, 241, 178, 0.7);
  }

  .mobile-logo img {
    width: 75px;
    height: 75px;
    filter: invert(1);
    vertical-align: bottom;
  }

  .mobile-menu {
    background-color: #000 !important;
    border-right: none !important;
    flex-grow: 1;
  }

  .mobile-menu .el-menu-item {
    color: #fff !important;
    background-color: #000 !important;
    /* border-right: none !important; */
    font-size: 18px;
    justify-content: center;
    height: 60px;
    line-height: 60px;
  }

  .mobile-menu .el-menu-item:hover,
  .mobile-menu .el-menu-item:focus {
    background-color: #333 !important;
  }

  /* .mobile-menu .el-menu-item.is-active {
    color: #ffd04b !important;
  } */
}

.brand-container {
  margin: 0px;
  display: flex;
  justify-content: center;
  /* 水平置中 */
  align-items: center;
  /* 垂直置中 */
  background-color: transparent;
  /* 添加一些內邊距 */
  padding: 15px;
}

.brand {
  width: 35px;
  height: 35px;
  margin: 0 5px;
  filter: invert(1);
  /* 反轉顏色 */
  object-fit: contain;
  /* 保持圖片比例 */
}

hr {
  /* border: none; */
  border-top: 2px solid #ffffff;
  /* 2px 下線條 */
  margin: 20px auto;
  width: 75%;
}

.drawer-footer {
  display: flex; /* 使用 flexbox 來進行排版 */
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  color: white; /* 文字顏色 */
  margin: 20px 0; /* 上下間距 */
}

.actions {
  display: flex; /* 使用 flexbox 來進行排版 */
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  margin: 20px 0; /* 上下間距 */
}
</style>
