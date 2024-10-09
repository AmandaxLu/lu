<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <el-container>
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>

<style>
.el-container {
  padding: 0px;
  margin: 0px;
}

.el-header {
  padding: 0px;
  margin: 0px;
}

.el-main {
  padding: 0px;
  margin-top: 30px;
}

.el-footer {
  padding: 0px;
  margin: 0px;
}

.el-drawer__body{
  padding: 0px;
  margin: 0px; 
}


</style>
