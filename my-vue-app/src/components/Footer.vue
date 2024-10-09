<template>
  <el-row class="footer-container">
    <!-- <el-col :xs="24" style="text-align: center;"> -->
    <el-col :xs="24">

      <li><span>聯絡電話：</span>
        <a href="tel:0800-456-789" target="_blank">0800-456-789</a>
      </li>
      <li><span>客服信箱：</span>
        <a href="mailto:service@sixchefstable.com" target="_blank">service@sixchefstable.com</a>
      </li>

      </el-col>
      <hr>
      <el-col :xs="24">
        <p>&copy; 2024 Six Chefs’ Table. All rights reserved.</p>
      </el-col>
  </el-row>

</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
</script>

<style scoped>
.footer-container {
  padding: 20px ;
  background-color: #000000;
  color: #ffffff;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

hr {
  border: none;
  border-top: 2px solid #8a7f7f;/* 2px 線條 */
  margin: 20px auto; /* 上下的間距 */
  width: 75%;
}

a {
  color: #fcfafa;
  text-decoration: none;
  /* 去掉下劃線 */
}

a:hover {
  color: #a6b176;
}

@media (max-width: 768px) {
  .footer-container {
    text-align: center;
    width: 100%; 
  }
}
</style>