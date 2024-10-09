<template>
  <div class="cart">
    <h2>購物車</h2>
    <div v-if="cartStore.items.length === 0">
      購物車是空的
    </div>
    <div v-else>
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <h3>{{ item.menuTitle }}</h3>
        <p>價格: ${{ item.price }}</p>
        <div class="quantity-control">
          <el-button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">-</el-button>
          <span class="quantity">{{ item.quantity }}</span>
          <el-button @click="increaseQuantity(item)">+</el-button>
        </div>
        <p>小計: ${{ (item.price * item.quantity).toFixed(2) }}</p>
        <el-button @click="cartStore.removeItem(item.id)">移除</el-button>
      </div>
      <div class="cart-summary">
        <p>總數量: {{ cartStore.totalItems }}</p>
        <p>總價格: ${{ cartStore.totalPrice.toFixed(2) }}</p>
      </div>
      <el-button @click="cartStore.clearCart()">清空購物車</el-button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const increaseQuantity = (item) => {
  cartStore.updateItemQuantity(item.id, item.quantity + 1)
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateItemQuantity(item.id, item.quantity - 1)
  }
}
</script>

<style scoped>
.cart {
  padding: 20px;
}
.cart-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
}
.cart-summary {
  margin-top: 20px;
  font-weight: bold;
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
</style>