<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios' // 需要安裝 axios

defineProps({
  msg: String,
})

const products = ref([])
const count = ref(0)
const loading = ref(false)
const error = ref(null)

const fetchProducts = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get('http://localhost:5000/orderitems') // 替換為實際的API端點
    products.value = response.data
    console.log(response)
  } catch (err) {
    console.error('獲取產品數據時出錯：', err)
    error.value = '無法加載產品數據，請稍後再試。'
  } finally {
    loading.value = false
  }
}

onMounted("http://localhost:5000/orderitems",() => {
  fetchProducts()
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <div class="shop">
    <h2>商店產品</h2>
    <p v-if="loading">正在加載產品...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else-if="products.length">
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - {{ product.price }}
      </li>
    </ul>
    <p v-else>沒有可用的產品</p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.shop {
  margin-top: 20px;
}
</style>
