<template>
  <div class="shop container">
    <h2 class="shop-title">我們的商品</h2>
    
    <!-- 新增分類標籤 -->
    <el-tabs v-model="activeCategory" @tab-click="handleCategoryChange">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane v-for="category in categories" :key="category.id" :label="category.categoryName" :name="category.id.toString()">
        {{ category.categoryName }}
      </el-tab-pane>
    </el-tabs>

    <el-row :gutter="20" v-if="!loading && !error">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="product in filteredProducts" :key="product.id">
        <div class="product-wrapper">
          <el-card :body-style="{ padding: '0px' }">
            <div class="image-container">
              <img :src="getImageUrl(product.image)" :alt="product.menuTitle" class="image" @error="handleImageError">
              <!-- 移除了顯示圖片 URL 的部分 -->
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

    <el-dialog
      title="商品詳情"
      v-model="dialogVisible"
      width="90%"
      max-width="800px"
      class="product-dialog">
      <div v-if="selectedProduct" class="product-details">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="(image, index) in selectedProduct.images" :key="index">
            <img :src="getImageUrl(image)" class="carousel-image">
          </el-carousel-item>
        </el-carousel>
        <h3>{{ selectedProduct.menuTitle }}</h3>
        <p>{{ selectedProduct.description || '暫無描述' }}</p>
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
import { ref, onMounted, computed } from 'vue'
import { shopAPI } from '../stores/product'
import { useCartStore } from '../stores/cart'
import { ElMessage } from 'element-plus'

const cartStore = useCartStore()

const products = ref([])
const categories = ref([])
const loading = ref(false)
const error = ref(null)
const activeCategory = ref('all')

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await shopAPI.getAllProducts();
    const productsData = response.$values || [];
    products.value = productsData
      .filter(product => product.status === '上架') // 只顯示上架的商品
      .map(product => ({
        id: product.id,
        menuTitle: product.name,
        price: product.price,
        description: product.description,
        status: product.status,
        categoryId: product.categoryId,
        categoryName: product.categoryName,
        image: product.imageUrls && product.imageUrls.$values && product.imageUrls.$values.length > 0 
          ? product.imageUrls.$values[0] 
          : null,
        images: product.imageUrls && product.imageUrls.$values ? product.imageUrls.$values : []
      }));
  } catch (err) {
    console.error('獲取產品數據時出錯：', err);
    error.value = '無法加載產品數據，請稍後再試。';
  } finally {
    loading.value = false;
  }
}

const fetchCategories = async () => {
  try {
    const response = await shopAPI.getProductCategories();
    categories.value = Array.isArray(response) ? response : response.$values || [];
  } catch (err) {
    console.error('獲取產品分類時出錯：', err);
    error.value = '無法加載產品分類，請稍後再試。';
  }
}

onMounted(async () => {
  try {
    await fetchProducts();
    await fetchCategories();
  } catch (error) {
    console.error('初始化數據時出錯：', error);
    error.value = '加載數據時出錯，請稍後再試。';
  }
})

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products.value;
  }
  return products.value.filter(product => product.categoryId.toString() === activeCategory.value);
})

const handleCategoryChange = (tab) => {
  activeCategory.value = tab.props.name;
}

const dialogVisible = ref(false)
const selectedProduct = ref(null)

const openProductDetails = (product) => {
  selectedProduct.value = {
    ...product,
    images: product.images.map(getImageUrl)
  }
  dialogVisible.value = true
}


const addToCart = (item) => {
  cartStore.addCartItemAPI(item.id)
    .then(() => {
      // 在加入成功後顯示提示訊息
      ElMessage.success(`已將 "${item.menuTitle}" 加入購物車！`);
    }).catch((error) => {
      ElMessage.error(`無法加入 "${item.menuTitle}" 至購物車。`);
      console.error(error);
    });
};


const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/300x200?text=Error+Loading+Image'
}

const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return 'https://via.placeholder.com/300x200?text=No+Image';
  }
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  return `https://localhost:5001/images/${imageUrl}`;
}

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
  color: #409EFF;
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

/* 新增分類標籤樣式 */
.el-tabs {
  margin-bottom: 20px;
}
</style>