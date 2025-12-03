<template>
  <div class="container">
    <div v-for="(component, index) in lazyComponents" :key="component.name" 
         ref="componentRefs" 
         :data-index="index"
         class="component-wrapper">
      <component :is="component.component" v-if="component.isVisible" />
      <div v-else class="lazy-placeholder">
        <div class="placeholder-content">
          <div class="placeholder-icon"></div>
          <div class="placeholder-text">{{ component.title }}</div>
          <div class="placeholder-desc">滚动到此处自动加载</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import Weibo from '../components/weibo.vue'
import Bilibili from '../components/bilibili.vue'
import Douyin from '../components/douyin.vue'
import baidu from '../components/baidu.vue'
import Jinritoutiao from '../components/jinritoutiao.vue'
import Zhihu from '../components/zhihu.vue'
import Tenxun from '../components/tenxun.vue'
import Baidutieba from '../components/baidutieba.vue'
import Juejin from '../components/juejin.vue'
import Netease from '../components/netease.vue'
import Lol from '../components/lol.vue'
import Thepaper from '../components/thepaper.vue'
import Kuaishou from '../components/kuaishou.vue'
import HistoryToday from '../components/history-today.vue'
import Weread from '../components/weread.vue'
import NeteaseMusic from '../components/netease-music.vue'
import DoubanMovic from '../components/douban-movic.vue'

// 组件配置
const componentConfigs = [
  { name: 'weibo', title: '微博', component: markRaw(Weibo) },
  { name: 'douyin', title: '抖音', component: markRaw(Douyin) },
  { name: 'bilibili', title: '哔哩哔哩', component: markRaw(Bilibili) },
  { name: 'netease-music', title: '网易云音乐', component: markRaw(NeteaseMusic) },
  { name: 'douban-movic', title: '豆瓣电影', component: markRaw(DoubanMovic) },
  { name: 'baidu', title: '百度', component: markRaw(baidu) },
  { name: 'jinritoutiao', title: '今日头条', component: markRaw(Jinritoutiao) },
  { name: 'zhihu', title: '知乎', component: markRaw(Zhihu) },
  { name: 'tenxun', title: '腾讯', component: markRaw(Tenxun) },
  { name: 'baidutieba', title: '百度贴吧', component: markRaw(Baidutieba) },
  { name: 'juejin', title: '掘金', component: markRaw(Juejin) },
  { name: 'netease', title: '网易', component: markRaw(Netease) },
  { name: 'lol', title: '英雄联盟', component: markRaw(Lol) },
  { name: 'thepaper', title: '澎湃新闻', component: markRaw(Thepaper) },
  { name: 'kuaishou', title: '快手', component: markRaw(Kuaishou) },
  { name: 'history-today', title: '历史上的今天', component: markRaw(HistoryToday) },
  { name: 'weread', title: '微信读书', component: markRaw(Weread) }
]

// 响应式数据
const lazyComponents = ref(
  componentConfigs.map(config => ({
    ...config,
    isVisible: false
  }))
)

const componentRefs = ref([])
let observer = null

// 创建 Intersection Observer
const createObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index)
          if (!lazyComponents.value[index].isVisible) {
            lazyComponents.value[index].isVisible = true
            // 一旦加载，就停止观察该元素
            observer.unobserve(entry.target)
          }
        }
      })
    },
    {
      root: null, // 使用 viewport 作为根
      rootMargin: '100px', // 提前100px开始加载
      threshold: 0.1 // 10%可见时触发
    }
  )
}

// 观察所有组件
const observeComponents = () => {
  if (observer && componentRefs.value) {
    componentRefs.value.forEach(el => {
      if (el) observer.observe(el)
    })
  }
}

// 初始加载前几个组件（提升用户体验）
const loadInitialComponents = () => {
  const initialCount = 6 // 首屏加载6个组件
  for (let i = 0; i < Math.min(initialCount, lazyComponents.value.length); i++) {
    lazyComponents.value[i].isVisible = true
  }
}

onMounted(() => {
  // 加载初始组件
  loadInitialComponents()
  
  // 创建观察者
  createObserver()
  
  // 延迟观察，确保DOM已渲染
  setTimeout(() => {
    observeComponents()
  }, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
}

.component-wrapper {
  // 组件包装器样式
}

.lazy-placeholder {
  width: 360px;
  height: 413px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  .placeholder-content {
    text-align: center;
    padding: 40px;
    
    .placeholder-icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      position: relative;
      animation: pulse 2s infinite;
      
      &::before {
        content: '⏳';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: white;
      }
    }
    
    .placeholder-text {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }
    
    .placeholder-desc {
      font-size: 12px;
      color: #666;
      opacity: 0.7;
    }
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .container {
    padding: 10px;
    gap: 15px;
  }
  
  .lazy-placeholder {
    width: 100%;
    max-width: 360px;
    height: 350px;
  }
}
</style>