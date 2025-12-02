<template>
  <div class="history">
    <div class="history-container">
      <!-- 头部标题 -->
      <div class="history-header">
        <h1>历史上的今天</h1>
        <div class="update-info">{{ timedata }}</div>
      </div>

      <!-- 海报展示区域 -->
      <div class="poster-container">
        <!-- 左翻页按钮 -->
        <button class="nav-btn prev-btn" @click="prevPoster" :disabled="currentIndex === 0">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
          </svg>
        </button>

        <!-- 海报内容 -->
        <div class="poster-wrapper">
          <div class="poster" v-if="currentItem">
            <div class="poster-background">
              <div class="poster-content">
                <div class="poster-year">{{ currentItem.year }}</div>
                <h2 class="poster-title">{{ currentItem.title }}</h2>
                <p class="poster-desc">{{ currentItem.desc }}</p>
                <div class="poster-date">{{ formatDate(currentItem.date) }}</div>
              </div>
            </div>
          </div>
          <div class="empty-poster" v-else>
            <div class="loading">加载中...</div>
          </div>
        </div>

        <!-- 右翻页按钮 -->
        <button class="nav-btn next-btn" @click="nextPoster" :disabled="currentIndex >= history.length - 1">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <!-- 页码指示器 -->
      <div class="pagination">
        <span class="page-info">{{ currentIndex + 1 }} / {{ history.length }}</span>
        <div class="dots">
          <span 
            v-for="(item, index) in history" 
            :key="index"
            class="dot"
            :class="{ active: index === currentIndex }"
            @click="goToPoster(index)"
          ></span>
        </div>
      </div>

      <!-- 刷新按钮 -->
      <button class="refresh-btn" @click="getHistory">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>
        </svg>
        刷新
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, nextTick } from 'vue'
import { typeAPI } from '../api/WeiBo'
import { gsap } from 'gsap'

const history = ref([])
const currentIndex = ref(0)

// 当前显示的项目
const currentItem = computed(() => {
  return history.value[currentIndex.value] || null
})

const getHistory = async () => {
    const res = await typeAPI.getHotListByType('history')
    history.value = res.data
    currentIndex.value = 0 // 重置到第一页
}

// 翻页功能
const prevPoster = () => {
  if (currentIndex.value > 0) {
    animatePosterChange('prev')
    setTimeout(() => {
      currentIndex.value--
    }, 200)
  }
}

const nextPoster = () => {
  if (currentIndex.value < history.value.length - 1) {
    animatePosterChange('next')
    setTimeout(() => {
      currentIndex.value++
    }, 200)
  }
}

const goToPoster = (index) => {
  if (index !== currentIndex.value) {
    const direction = index > currentIndex.value ? 'next' : 'prev'
    animatePosterChange(direction)
    setTimeout(() => {
      currentIndex.value = index
    }, 200)
  }
}

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

// GSAP 动画初始化
const initAnimations = () => {
  // 页面入场动画
  gsap.fromTo('.history', 
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: 'power2.inOut' }
  )

  // 标题动画
  gsap.fromTo('.history-header h1', 
    { 
      opacity: 0, 
      y: -100,
      scale: 0.8,
      rotationX: 90
    },
    { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 1.2, 
      delay: 0.3,
      ease: 'back.out(1.7)'
    }
  )

  // 更新时间动画
  gsap.fromTo('.update-info', 
    { 
      opacity: 0, 
      y: -50,
      skewX: 20
    },
    { 
      opacity: 1, 
      y: 0,
      skewX: 0,
      duration: 0.8, 
      delay: 0.6,
      ease: 'power2.out'
    }
  )

  // 海报容器动画
  gsap.fromTo('.poster-wrapper', 
    { 
      opacity: 0, 
      scale: 0.3,
      rotationY: 180,
      z: -500
    },
    { 
      opacity: 1, 
      scale: 1,
      rotationY: 0,
      z: 0,
      duration: 1.5, 
      delay: 0.8,
      ease: 'power3.inOut'
    }
  )

  // 左右按钮动画
  gsap.fromTo('.nav-btn', 
    { 
      opacity: 0, 
      x: (index) => index === 0 ? -200 : 200,
      rotation: (index) => index === 0 ? -360 : 360,
      scale: 0
    },
    { 
      opacity: 1, 
      x: 0,
      rotation: 0,
      scale: 1,
      duration: 0.8, 
      delay: 1.2,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    }
  )

  // 分页器动画
  gsap.fromTo('.pagination', 
    { 
      opacity: 0, 
      y: 100,
      scale: 0.5
    },
    { 
      opacity: 1, 
      y: 0,
      scale: 1,
      duration: 0.8, 
      delay: 1.5,
      ease: 'elastic.out(1, 0.5)'
    }
  )

  // 刷新按钮动画
  gsap.fromTo('.refresh-btn', 
    { 
      opacity: 0, 
      y: 100,
      scale: 0.3,
      rotation: 180
    },
    { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.8, 
      delay: 1.8,
      ease: 'back.out(1.7)'
    }
  )

  // 背景动画
  gsap.to('.history::before', {
    rotation: 360,
    duration: 60,
    repeat: -1,
    ease: 'none'
  })

  // 海报内容动画
  gsap.fromTo('.poster-content', {
    opacity: 0,
    y: 50
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 1.3,
    stagger: 0.2,
    ease: 'power2.out'
  })

  // 持续的浮动动画
  gsap.to('.poster', {
    y: -10,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  })
}

// 海报切换动画
const animatePosterChange = (direction) => {
  const poster = document.querySelector('.poster')
  if (!poster) return

  const tl = gsap.timeline()
  
  if (direction === 'next') {
    tl.to(poster, {
      x: -150,
      rotationY: -90,
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.in'
    })
    .fromTo(poster, 
      {
        x: 150,
        rotationY: 90,
        opacity: 0,
        scale: 0.8
      },
      {
        x: 0,
        rotationY: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }
    )
  } else {
    tl.to(poster, {
      x: 150,
      rotationY: 90,
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.in'
    })
    .fromTo(poster, 
      {
        x: -150,
        rotationY: -90,
        opacity: 0,
        scale: 0.8
      },
      {
        x: 0,
        rotationY: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }
    )
  }

  // 添加按钮反馈动画
  const btnClass = direction === 'next' ? '.next-btn' : '.prev-btn'
  gsap.to(btnClass, {
    scale: 0.9,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut'
  })
}

// 按钮悬停动画
const setupButtonAnimations = () => {
  // 导航按钮悬停效果
  const navButtons = document.querySelectorAll('.nav-btn')
  navButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.3,
        rotation: 10,
        duration: 0.4,
        ease: 'back.out(1.7)'
      })
      
      // 发光效果
      gsap.to(btn, {
        boxShadow: '0 0 30px rgba(102, 126, 234, 0.8)',
        duration: 0.3,
        ease: 'power2.out'
      })
    })
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
      
      gsap.to(btn, {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  })

  // 刷新按钮悬停效果
  const refreshBtn = document.querySelector('.refresh-btn')
  if (refreshBtn) {
    refreshBtn.addEventListener('mouseenter', () => {
      gsap.to(refreshBtn, {
        scale: 1.1,
        y: -8,
        rotation: 5,
        duration: 0.4,
        ease: 'back.out(1.7)'
      })
      
      // 旋转图标
      gsap.to(refreshBtn.querySelector('svg'), {
        rotation: 720,
        duration: 0.8,
        ease: 'power2.inOut'
      })
      
      // 发光效果
      gsap.to(refreshBtn, {
        boxShadow: '0 0 40px rgba(102, 126, 234, 0.6)',
        duration: 0.3,
        ease: 'power2.out'
      })
    })
    
    refreshBtn.addEventListener('mouseleave', () => {
      gsap.to(refreshBtn, {
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
      
      gsap.to(refreshBtn, {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  }

  // 分页点悬停效果
  const dots = document.querySelectorAll('.dot')
  dots.forEach((dot, index) => {
    dot.addEventListener('mouseenter', () => {
      if (!dot.classList.contains('active')) {
        gsap.to(dot, {
          scale: 2,
          rotation: 180,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
        
        // 发光效果
        gsap.to(dot, {
          boxShadow: '0 0 20px rgba(102, 126, 234, 0.8)',
          duration: 0.2,
          ease: 'power2.out'
        })
      }
    })
    
    dot.addEventListener('mouseleave', () => {
      if (!dot.classList.contains('active')) {
        gsap.to(dot, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
        
        gsap.to(dot, {
          boxShadow: 'none',
          duration: 0.2,
          ease: 'power2.out'
        })
      }
    })
  })

  // 海报悬停效果
  const poster = document.querySelector('.poster')
  if (poster) {
    poster.addEventListener('mouseenter', () => {
      gsap.to(poster, {
        scale: 1.05,
        rotationY: 5,
        duration: 0.6,
        ease: 'power2.out'
      })
    })
    
    poster.addEventListener('mouseleave', () => {
      gsap.to(poster, {
        scale: 1,
        rotationY: 0,
        duration: 0.6,
        ease: 'power2.out'
      })
    })
  }
}

onMounted(async () => {
  await getHistory()
  await nextTick()
  initAnimations()
  setupButtonAnimations()
})
</script>

<style lang="scss" scoped>
.history {
  width: 100vw;
  height: 100vh;
  background: #0f0f1e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: relative;
  overflow: hidden;
  margin: 0;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
  }

  .history-container {
    width: 100%;
    max-width: 1600px;
    height: 100%;
    text-align: center;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    box-sizing: border-box;
  }

  .history-header {
    margin-bottom: 60px;
    
    h1 {
      font-size: 3.5rem;
      margin: 0 0 15px 0;
      font-weight: 900;
      background: linear-gradient(135deg, #667eea 0%, #f093fb 50%, #f5576c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
      letter-spacing: -1px;
    }
  }

  .poster-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-bottom: 40px;
    position: relative;
  }

  .poster-wrapper {
    width: min(80vw, 800px);
    height: min(60vh, 500px);
    perspective: 1500px;
    transform-style: preserve-3d;
  }

  .poster {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    animation: posterFloat 6s ease-in-out infinite;

    .poster-background {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 50%,
        rgba(255, 255, 255, 0.02) 100%);
      border-radius: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 
        0 30px 60px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: -100%;
        left: -100%;
        width: 300%;
        height: 300%;
        background: conic-gradient(
          from 0deg,
          transparent 0deg,
          rgba(102, 126, 234, 0.1) 60deg,
          rgba(240, 147, 251, 0.1) 120deg,
          rgba(245, 87, 108, 0.1) 180deg,
          rgba(102, 126, 234, 0.1) 240deg,
          transparent 360deg
        );
        animation: rotate 10s linear infinite;
      }

      &::after {
        content: '';
        position: absolute;
        inset: 2px;
        background: linear-gradient(135deg, 
          rgba(15, 15, 30, 0.9) 0%,
          rgba(25, 25, 45, 0.8) 100%);
        border-radius: 28px;
        z-index: 1;
      }
    }

    .poster-content {
      padding: 50px;
      text-align: center;
      z-index: 2;
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .poster-year {
      font-size: 4rem;
      font-weight: 900;
      background: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 25px;
      letter-spacing: -2px;
      text-shadow: 0 0 40px rgba(102, 126, 234, 0.5);
      animation: glow 3s ease-in-out infinite alternate;
    }

    .poster-title {
      font-size: 2rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 25px 0;
      line-height: 1.3;
      max-height: 5.2rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .poster-desc {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.7;
      margin: 0 0 35px 0;
      max-height: 7.2rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      font-weight: 400;
    }

    .poster-date {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
  }

  .empty-poster {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.3rem;
    font-weight: 600;

    .loading {
      animation: pulse 2s ease-in-out infinite;
    }
  }

  .nav-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%);
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    z-index: 10;

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.1) 100%);
      transform: scale(1.1) translateY(-2px);
      box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.2);
    }

    &:active:not(:disabled) {
      transform: scale(1.05) translateY(-1px);
    }

    &:disabled {
      opacity: 0.2;
      cursor: not-allowed;
      filter: grayscale(1);
    }

    svg {
      width: 24px;
      height: 24px;
      transition: transform 0.3s ease;
    }

    &:hover:not(:disabled) svg {
      transform: scale(1.2);
    }
  }

  .pagination {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    color: rgba(255, 255, 255, 0.9);

    .page-info {
      font-size: 1.2rem;
      font-weight: 600;
      background: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .dots {
      display: flex;
      gap: 12px;

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(255, 255, 255, 0.1);

        &:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: scale(1.2);
        }

        &.active {
          width: 32px;
          height: 10px;
          border-radius: 5px;
          background: linear-gradient(90deg, #667eea 0%, #f093fb 100%);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
        }
      }
    }
  }

  .refresh-btn {
    margin-top: 40px;
    padding: 16px 32px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 30px;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%);
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 40px auto 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    letter-spacing: 0.5px;

    &:hover {
      background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.1) 100%);
      transform: translateY(-3px);
      box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.2);
    }

    &:active {
      transform: translateY(-1px);
    }

    svg {
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover svg {
      transform: rotate(360deg);
    }
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(1deg); }
  50% { transform: translateY(-10px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(0.5deg); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes posterFloat {
  0%, 100% { transform: translateY(0) rotateX(0) rotateY(0); }
  25% { transform: translateY(-10px) rotateX(2deg) rotateY(1deg); }
  50% { transform: translateY(-5px) rotateX(-1deg) rotateY(-1deg); }
  75% { transform: translateY(-8px) rotateX(1deg) rotateY(0.5deg); }
}

@keyframes glow {
  0% { filter: brightness(1) drop-shadow(0 0 20px rgba(102, 126, 234, 0.5)); }
  100% { filter: brightness(1.2) drop-shadow(0 0 30px rgba(240, 147, 251, 0.7)); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.95); }
}

// 响应式设计
@media (max-width: 768px) {
  .history {
    .history-header h1 {
      font-size: 2.5rem;
    }

    .history-container {
      padding: 20px 15px;
    }

    .poster-wrapper {
      width: 90vw;
      height: 55vh;
      max-width: 400px;
      max-height: 300px;
    }

    .poster {
      .poster-year {
        font-size: 2.5rem;
      }

      .poster-title {
        font-size: 1.4rem;
      }

      .poster-desc {
        font-size: 1rem;
      }

      .poster-content {
        padding: 30px;
      }
    }

    .nav-btn {
      width: 50px;
      height: 50px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .poster-container {
      gap: 20px;
    }
  }
}

@media (max-width: 480px) {
  .history {
    .history-header h1 {
      font-size: 2rem;
    }

    .history-container {
      padding: 15px 10px;
    }

    .poster-wrapper {
      width: 95vw;
      height: 50vh;
      max-width: 350px;
      max-height: 250px;
    }

    .poster {
      .poster-year {
        font-size: 2rem;
      }

      .poster-title {
        font-size: 1.2rem;
      }

      .poster-desc {
        font-size: 0.9rem;
      }

      .poster-content {
        padding: 25px;
      }
    }

    .nav-btn {
      width: 45px;
      height: 45px;
    }

    .refresh-btn {
      padding: 12px 24px;
      font-size: 1rem;
    }
  }
}

// 超宽屏适配
@media (min-width: 1920px) {
  .history {
    .poster-wrapper {
      width: min(70vw, 1000px);
      height: min(55vh, 600px);
    }

    .history-header h1 {
      font-size: 4rem;
    }
  }
}
</style>