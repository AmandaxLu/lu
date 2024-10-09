<template>
  <div class="shop container">
    <h2 class="shop-title">我們的商品</h2>
    <el-row :gutter="20" v-if="!loading && !error">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="product in products" :key="product.id">
        <div class="product-wrapper">
          <el-card :body-style="{ padding: '0px' }">
            <div class="image-container">
              <img :src="product.image" class="image" />
              <div class="overlay">
                <el-button type="info" icon="ZoomIn" circle @click="openProductDetails(product)"></el-button>
              </div>
            </div>
            <div class="product-info">
              <span class="product-name">{{ product.menuTitle }}</span>
              <div class="bottom">
                <span class="price">${{ product.price }}</span>
                <el-button text class="button" @click="addToCart(product)">加入購物車</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <p v-if="loading">正在加載產品...</p>
    <p v-if="error">{{ error }}</p>

    <el-dialog title="商品詳情" v-model="dialogVisible" width="90%" max-width="800px" class="product-dialog">
      <div v-if="selectedProduct" class="product-details">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="(image, index) in selectedProduct.images" :key="index">
            <img :src="image" class="carousel-image" />
          </el-carousel-item>
        </el-carousel>
        <h3>{{ selectedProduct.menuTitle }}</h3>
        <p>{{ selectedProduct.description || "暫無描述" }}</p>
        <p class="price">${{ selectedProduct.price }}</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">關閉</el-button>
          <el-button type="primary" @click="addToCart(selectedProduct)">加入購物車</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useCartStore } from "../stores/cart";
import { ElMessage } from "element-plus";

const cartStore = useCartStore();

const products = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get("http://localhost:5000/menuitems");
    products.value = response.data;
    console.log("商店產品：", JSON.parse(JSON.stringify(products.value)));
  } catch (err) {
    console.error("獲取產品數據時出錯：", err);
    error.value = "無法加載產品數據，請稍後再試。";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

const dialogVisible = ref(false);
const selectedProduct = ref(null);

const openProductDetails = (product) => {
  selectedProduct.value = {
    ...product,
    images: [
      product.image ||
      "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
    ],
  };
  dialogVisible.value = true;
};

const addToCart = (product) => {
  cartStore.addItem(product);
  ElMessage.success(`已將 ${product.menuTitle} 加入購物車`);
  dialogVisible.value = false;
};
</script>

<style scoped>
.shop {
  padding: 20px;
}

.shop-title {
  text-align: center;
  margin-bottom: 20px;
}

.product-wrapper {
  margin-bottom: 20px;
}

.image-container {
  position: relative;
  overflow: hidden;
}

.image {
  width: 100%;
  display: block;
  transition: transform 0.3s ease;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-wrapper:hover .image {
  transform: scale(1.1);
}

.product-wrapper:hover .overlay {
  opacity: 1;
}

.product-info {
  padding: 14px;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 18px;
  color: #409eff;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-dialog .el-dialog__body {
  padding: 0;
}

.product-details {
  padding: 20px;
}
</style>
