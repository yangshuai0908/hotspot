<template>
  <div class="home">
    <!-- <div class="header">
      <h1>首页</h1>
      <p class="subtitle">欢迎来到首页！</p>
    </div>
    
    <div class="content">
      <div class="card">
        <h2>数据展示</h2>
        <p v-if="loading">加载中...</p>
        <p v-else-if="error">{{ error }}</p>
        <div v-else-if="data" class="data-display">
          <p>获取到的数据: {{ data }}</p>
        </div>
        <button @click="fetchData" class="btn-primary">获取数据</button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiService } from '../services/api'

const loading = ref(false)
const error = ref('')
const data = ref(null)

const fetchData = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // 示例：使用公共API获取数据
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    const result = await response.json()
    data.value = result
  } catch (err) {
    error.value = '获取数据失败'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  .header {
    text-align: center;
    margin-bottom: 40px;
    
    h1 {
      color: #2c3e50;
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    
    .subtitle {
      color: #7f8c8d;
      font-size: 1.2rem;
    }
  }

  .content {
    .card {
      background: #ffffff;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
      }
      
      h2 {
        color: #34495e;
        margin-bottom: 20px;
        font-size: 1.5rem;
      }
      
      .data-display {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        margin: 15px 0;
        border-left: 4px solid #42b983;
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #42b983, #3aa876);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: linear-gradient(135deg, #3aa876, #2d8f5f);
          transform: translateY(-1px);
        }
        
        &:active {
          transform: translateY(0);
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .home {
    padding: 15px;
    
    .header h1 {
      font-size: 2rem;
    }
    
    .content .card {
      padding: 20px;
    }
  }
}
</style>