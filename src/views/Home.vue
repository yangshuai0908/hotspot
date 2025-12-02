<template>
  <div class="home">
    <div class="hot-list">
      <div v-for="item in 10" :key="item" class="hot_item">
        <div class="item-content">
          <h3>热点标题 {{ item }}</h3>
          <p>这是热点内容的描述信息，展示相关的热点资讯和内容摘要。</p>
          <div class="item-meta">
            <span class="time">2小时前</span>
            <span class="views">1.2万阅读</span>
          </div>
        </div>
      </div>
    </div>
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

  .hot-list {
    display: flex;
    flex-wrap: wrap; // 允许换行
    gap: 20px; // 项目之间的间距
    margin: 0 -10px; // 抵消padding，确保边缘对齐

    .hot_item {
      flex: 0 0 calc(33.333% - 20px); // 每行3个，减去间距
      min-width: 300px; // 最小宽度
      height: auto;
      min-height: 200px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      padding: 20px;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }

      .item-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h3 {
          margin: 0 0 12px 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          line-height: 1.4;
        }

        p {
          margin: 0 0 16px 0;
          color: #62748e;
          font-size: 0.9rem;
          line-height: 1.6;
          flex: 1;
        }

        .item-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: #95a5a6;

          .time {
            display: flex;
            align-items: center;
            
            &::before {
              content: "🕒";
              margin-right: 4px;
            }
          }

          .views {
            display: flex;
            align-items: center;
            
            &::before {
              content: "👁";
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .home .hot-list .hot_item {
    flex: 0 0 calc(50% - 20px); // 每行2个
  }
}

@media (max-width: 768px) {
  .home {
    padding: 15px;
    
    .hot-list {
      gap: 15px;
      margin: 0;
      
      .hot_item {
        flex: 0 0 100%; // 每行1个
        min-width: unset;
        padding: 15px;
      }
    }
  }
}
</style>