<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
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

.el-footer{
  padding: 0px;
  margin: 0px; 
}
.el-drawer__body{
  padding: 0px;
  margin: 0px; 
}


/* .app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-main {
  flex: 1;
  padding: 20px;
}

nav {
  padding: 10px 0;
} */

/* body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;  防止水平滾動 
} */

/* #app {
  width: 100%;
  min-height: 100vh;
} */


</style>
