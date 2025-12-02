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
}
</style>
