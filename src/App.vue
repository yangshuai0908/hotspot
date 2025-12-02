<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

</script>

<template>
  <div id="app">
    <NavBar />
    <main class="main-content">
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
}

.main-content {
  flex: 1;
  margin: 64px 20px 0 20px; /* 顶部64px为固定导航栏留出空间，左右边距响应式 */
  margin-left: auto;
  margin-right: auto;
}

// 响应式调整
@media (max-width: 768px) {
  .main-content {
    margin: 56px 15px 0 15px; /* 移动端导航栏高度为56px */
  }
}

@media (max-width: 480px) {
  .main-content {
    margin: 52px 10px 0 10px; /* 小屏幕导航栏高度为52px */
  }
}
</style>
