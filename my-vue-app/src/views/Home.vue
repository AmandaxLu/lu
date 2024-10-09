<template>
  <div class="home-container">
    <div class="home">
      <!-- 首頁輪播圖 -->
      <el-carousel :interval="5000" height="100vh" class="carousel">
        <el-carousel-item v-for="item in carouselItems" :key="item.id">
          <div
            class="carousel-item-content"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          >
            <h3 class="carousel-title">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
  <div class="main-container">
    <div class="cards-container">
      <el-row :gutter="30">
        <el-col :xs="24" :md="6">
          <el-card class="card-with-background" shadow="hover">
            <img
              src="/images/hamburger.jpg"
              alt="hamburger"
              class="card-image"
            />
            <div class="text item">
              <h3>手作漢堡</h3>
              <ul>
                <li>手工揉捏麵糰，美味新鮮現煎漢堡</li>
                <li>飽滿肉汁搭配，多種起司層次豐富</li>
                <li>客製現點現做，保留食材原始風味</li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="6">
          <el-card class="card-with-background">
            <img src="/images/steak.jpg" alt="steak" class="card-image" />
            <div class="text item">
              <h3>經典排餐</h3>
              <ul>
                <li>主廚精湛火候，鎖住牛肉鮮美肉汁</li>
                <li>獨家醃製手法，風味獨特令人回味</li>
                <li>經典現切牛排，傳統創新完美結合</li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="6">
          <el-card class="card-with-background">
            <img src="/images/pizza.jpg" alt="pizza" class="card-image" />
            <div class="text item">
              <h3>義式餐點</h3>
              <ul>
                <li>手工現做披薩，外酥內軟香氣四溢</li>
                <li>地中海的美味，海鮮香草完美結合</li>
                <li>嚴選天然食材，純粹的義大利風味</li>
              </ul>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 背景層 -->
      <div class="background-layer"></div>
    </div>
    <el-row class="product-section" gutter="20">
      <el-col :xs="24">
        <el-card>
          <h6>About Six Chefs’ Table</h6>
          <p>
            六位網頁工程師，如同六位頂尖大廚，各展所長，運用不同的網頁程式工具，精心打造出這座美食饗宴般的訂餐訂位平台。每一道程式碼，都如同精心挑選的食材，共同譜出最完美的味蕾饗宴。
          </p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 輪播圖數據
const carouselItems = ref([
  { id: 1, title: "", imageUrl: "/images/dish2.jpg" },
  { id: 2, title: "", imageUrl: "/images/dish1.jpg" },
  { id: 3, title: "", imageUrl: "/images/dish3.jpg" },
]);
</script>

<style scoped>
.cards-container {
  position: relative;
  width: 100%; /* 確保容器寬度為100% */
}
.card-image {
  width: 100%;
  height: auto;
}

h1 {
  margin-bottom: 30px;
}

.el-row {
  margin: 0;
  padding: 20px;
  width: 100%;
}

.carousel {
  margin-bottom: 30px;
}

.carousel-item-content {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
}

.card-image {
  width: 100%; /* 使圖片寬度填滿卡片 */
  height: auto; /* 自適應高度 */
  display: block; /* 移除圖片下方的空白間距 */
}

.text.item {
  padding: 20px;
}

.card-with-background {
  position: relative;
  z-index: 1;
  /* 確保卡片在背景之上 */
}

.card-image {
  width: 100%;
  height: auto;
}

/* 背景層樣式 */
.background-layer {
  background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 10%,
      rgba(255, 255, 255, 1) 100%
    ),
    /* 漸層效果 */ url("/images/bg-2.jpg");
  /* 背景圖片 */
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  top: 50%; /* 背景層上下居中 */
  left: 0;
  width: 100%;
  height: 70%; /* 高度設置為卡片的50% */
  transform: translateY(-50%); /* 確保背景層在卡片的上下居中 */
  z-index: 0; /* 背景層在卡片下方 */
}

/* 響應式設計 */
@media (max-width: 768px) {
  .el-carousel {
    height: 80%;
  }

  .el-row {
    flex-direction: column;
  }

  .el-col {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
