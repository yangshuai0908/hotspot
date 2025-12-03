<template>
  <div class="home">
    <div class="hot_item">
      <div class="hot_header">
        <div class="header_title">
          <svg t="1764662141291" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="13519" width="25" height="25">
            <path
              d="M1012.49 451.553v0.159c-6.697 20.66-28.861 31.99-49.449 25.288a39.352 39.352 0 0 1-25.287-49.582l-0.067-0.031c20.536-63.6 7.516-136.156-40.315-189.363-47.892-53.212-118.502-73.554-183.731-59.659-21.222 4.537-42.133-9.047-46.638-30.3-4.506-21.253 9.021-42.194 30.239-46.73 91.709-19.563 191.114 8.98 258.467 83.881 67.36 74.839 85.515 176.85 56.781 266.337z"
              p-id="13520" fill="#d81e06"></path>
            <path
              d="M740.429 304.348v-0.03c-18.217 3.973-36.178-7.732-40.06-26.01-3.947-18.31 7.763-36.373 25.98-40.254 44.692-9.548 93.143 4.322 125.885 40.781 32.866 36.496 41.631 86.17 27.607 129.772a33.833 33.833 0 0 1-42.562 21.847c-17.782-5.76-27.484-24.914-21.724-42.69h-0.062c6.887-21.346 2.565-45.635-13.46-63.473-16.026-17.818-39.752-24.546-61.604-19.943z m30.05 192.184c-14.46-4.352-24.352-7.326-16.774-26.352 16.333-41.313 18.027-76.964 0.317-102.385-33.31-47.734-124.451-45.133-228.838-1.28 0-0.061-32.799 14.367-24.412-11.704 16.056-51.774 13.645-95.186-11.361-120.192-56.658-56.878-207.304 2.12-336.477 131.64C56.187 463.32 0 566.14 0 655.1c0 170.08 217.503 273.494 430.28 273.494 278.917 0 464.527-162.504 464.527-291.59 0-77.936-65.546-122.193-124.329-140.472zM430.842 867.62c-169.774 16.84-316.35-60.155-327.368-171.96-11.049-111.74 117.72-216.034 287.488-232.873 169.805-16.84 316.355 60.16 327.368 171.904 11.018 111.866-117.683 216.09-287.488 232.929z"
              p-id="13521" fill="#d81e06"></path>
            <path
              d="M447.805 548.859c-80.783-21.09-172.119 19.287-207.206 90.65-35.743 72.862-1.188 153.681 80.44 180.1 84.578 27.357 184.233-14.525 218.88-93.148 34.181-76.81-8.478-155.94-92.114-177.602zM386.12 734.792c-16.43 26.29-51.584 37.806-78.065 25.661-26.107-11.889-33.833-42.44-17.403-68.045 16.215-25.538 50.207-36.869 76.498-25.856 26.604 11.392 35.087 41.687 18.97 68.24z"
              p-id="13522" fill="#d81e06"></path>
          </svg>
          <span>
            微博
          </span>
        </div>
        <div class="header_title_search">
          <svg t="1764662726037" class="icon" viewBox="0 0 1098 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="15560" width="18" height="18">
            <path
              d="M476.808045 0.000043C213.401753 0.106685-0.031993 213.68973 0 477.074693S213.551052 953.98938 476.94668 954.021373s476.957344-213.412417 477.085315-476.808045A477.010665 477.010665 0 0 0 476.808045 0.000043z m273.761252 353.369671L441.861388 661.853674a43.1901 43.1901 0 0 1-62.023117 0L202.214984 484.251715a43.864079 43.864079 0 1 1 62.033781-62.033782l147.21959 147.21959 277.89897-276.86454a43.861946 43.861946 0 1 1 62.023117 62.033781z m0 0"
              p-id="15561" fill="#0e793c"></path>
          </svg>
          热搜
        </div>
      </div>
      <div class="hot-content">
        <!-- 骨架屏 -->
        <div v-if="isLoading" class="skeleton-container">
          <div v-for="n in 10" :key="n" class="skeleton-item">
            <div class="skeleton-rank"></div>
            <div class="skeleton-content">
              <div class="skeleton-title"></div>
            </div>
            <div class="skeleton-arrow"></div>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-else-if="hasError || (!isLoading && WeiBoList.length === 0)" class="error-container">
          <div class="error-message">
            抱歉,可能服务器遇到问题了,请稍后重试,或者打开右上角设置关闭热榜显示!😅
          </div>
        </div>
        
        <!-- 正常内容 -->
        <template v-else>
          <div v-for="(item, index) in WeiBoList" :key="item.id" class="hot-list-item" :class="{ 'top-rank': index < 3, 'has-label': item.label }">
            <div class="rank-number">{{ item.label || (index + 1) }}</div>
            <div class="item-info">
              <h4 class="item-title">{{ item.title }}</h4>
            </div>
            <div class="item-arrow">›</div>
          </div>
        </template>
      </div>
      <div class="hot_footer">
        <div class="update-info">
          <span>{{ timedata }}</span>
        </div>
        <div class="divider"></div>
        <div class="refresh-btn" @click="getWeiBoHotList" :class="{ loading: isLoading }">
          <svg t="1764661476471" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="12307" width="24" height="24">
            <path
              d="M512 74.666667c214.229333 0 401.493333 159.274667 436.885333 368a32 32 0 0 1-39.317333 36.373333l-170.666667-42.666667a32 32 0 0 1 15.530667-62.08l119.402667 29.824c-48.106667-151.125333-191.829333-262.101333-354.432-265.386666L512 138.666667c-185.024 0-341.376 135.466667-369.024 316.458666a32 32 0 0 1-63.274667-9.664C112.128 233.322667 295.253333 74.666667 512 74.666667zM512 949.376c-214.208 0-401.493333-159.274667-436.864-368a32 32 0 0 1 42.773333-35.285333l170.666667 64a32 32 0 0 1-22.464 59.925333l-113.429333-42.538667 2.154666 6.165334c52.181333 144.042667 192.106667 248.490667 349.781334 251.669333l7.402666 0.064c183.04 0 338.261333-132.629333 368.170667-311.146667a32 32 0 0 1 63.125333 10.581334c-35.050667 209.237333-216.874667 364.586667-431.296 364.586666z"
              fill="#8997aa" p-id="12308"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { typeAPI } from '../api/WeiBo'

const WeiBoList = ref([]) // 获取热搜榜数据
const timedata = ref('') // 更新时间
const isLoading = ref(false) // 加载状态
const hasError = ref(false) // 错误状态

const getWeiBoHotList = async () => {
  if (isLoading.value) return // 防止重复点击
  
  isLoading.value = true
  hasError.value = false // 重置错误状态
  
  try {
    const res = await typeAPI.getHotListByType('weibo')
    console.log(res);
    
    // 检查返回的数据是否有效
    if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
      // 计算更新时间，传入时间戳
      const updateTime = calculateUpdateTime(res.timestamp)
      timedata.value = updateTime

      WeiBoList.value = res.data
      hasError.value = false // 成功时清除错误状态
    } else {
      // 数据为空或格式不正确，视为错误
      hasError.value = true
      WeiBoList.value = []
    }
  } catch (error) {
    console.error('获取数据失败:', error)
    hasError.value = true // 设置错误状态
    WeiBoList.value = [] // 清空列表
  } finally {
    isLoading.value = false
  }
}

// 计算更新时间的函数
const calculateUpdateTime = (date, time, timestamp) => {
  if (!date || !time) return '刚刚更新'
  
  try {
    // 优先使用时间戳（更准确）
    let apiTime
    if (timestamp) {
      // 将时间戳转换为毫秒（如果时间戳是秒级）
      const timestampMs = timestamp.toString().length === 10 ? timestamp * 1000 : timestamp
      apiTime = new Date(timestampMs)
    } else {
      // 解析日期时间字符串 (格式: "2025/12/2 16:18:19")
      const dateTimeStr = `${date} ${time}`
      apiTime = new Date(dateTimeStr.replace(/\//g, '-'))
    }
    
    // 获取当前时间
    const now = new Date()
    
    // 计算时间差（毫秒）
    const diffMs = now - apiTime
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)
    
    // 根据时间差返回相对时间
    if (diffMinutes < 1) {
      return '刚刚更新'
    } else if (diffMinutes < 60) {
      return `${diffMinutes}分钟前更新`
    } else if (diffHours < 24) {
      return `${diffHours}小时前更新`
    } else if (diffDays < 7) {
      return `${diffDays}天前更新`
    } else {
      // 超过一周显示具体日期
      const month = apiTime.getMonth() + 1
      const day = apiTime.getDate()
      return `${month}月${day}日更新`
    }
  } catch (error) {
    console.error('时间解析错误:', error)
    return '刚刚更新'
  }
}


onMounted(() => {
  getWeiBoHotList()
})
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;

  .hot_item {
    position: relative;
    width: 360px;
    height: 413px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;

    .hot_header {
      height: 52px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      padding: 0 20px;
      font-weight: 600;
      font-size: 16px;
      border-radius: 10px 10px 0 0;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      .header_title {
        display: flex;
        align-items: center;

        span {
          margin-left: 8px;
        }
      }

      .header_title_search {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #0e793c;
        border-radius: 20px;
        background-color: #d1f4e0;
        padding: 4px;
      }
    }

    // 内容区域，可滚动
    .hot-content {
      flex: 1;
      overflow-y: auto;
      padding: 8px 0;

      // 自定义滚动条样式
      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;

        &:hover {
          background: #a8a8a8;
        }
      }

      // 列表项样式
      .hot-list-item {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        margin: 4px 12px;
        border-radius: 8px;
        transition: all 0.2s ease;
        cursor: pointer;
        position: relative;

        &:hover {
          background-color: #f8f9fa;
          transform: translateX(4px);
        }

        // 排名数字
        .rank-number {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          margin-right: 12px;
          background-color: #f0f0f0;
          color: #666;
        }

        // 有label的项目使用第1名颜色
        &.has-label .rank-number {
          background-color: #ea444d;
          color: white;
          box-shadow: 0 2px 8px rgba(234, 68, 77, 0.3);
        }
        
        // 前三名特殊样式（仅当没有label时）
        &:nth-child(1):not(.has-label) .rank-number {
          background-color: #ea444d;
          color: white;
          box-shadow: 0 2px 8px rgba(234, 68, 77, 0.3);
        }
        
        &:nth-child(2):not(.has-label) .rank-number {
          background-color: #ed702d;
          color: white;
          box-shadow: 0 2px 8px rgba(237, 112, 45, 0.3);
        }
        
        &:nth-child(3):not(.has-label) .rank-number {
          background-color: #eead3f;
          color: white;
          box-shadow: 0 2px 8px rgba(238, 173, 63, 0.3);
        }

        // 内容信息
        .item-info {
          flex: 1;
          min-width: 0;

          .item-title {
            font-size: 14px;
            font-weight: 500;
            color: #333;
            line-height: 1.4;
            margin: 0 0 6px 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }

        // 箭头
        .item-arrow {
          color: #ccc;
          font-size: 18px;
          margin-left: 8px;
          transition: transform 0.2s ease;
        }

        &:hover .item-arrow {
          transform: translateX(2px);
          color: #ff6b6b;
        }
      }

      // 骨架屏样式
      .skeleton-container {
        padding: 8px 0;
        
        .skeleton-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          margin: 4px 12px;
          border-radius: 8px;
          background-color: #fafafa;
          
          .skeleton-rank {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
            margin-right: 12px;
          }
          
          .skeleton-content {
            flex: 1;
            min-width: 0;
            
            .skeleton-title {
              height: 16px;
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: skeleton-loading 1.5s infinite;
              border-radius: 4px;
              width: 80%;
            }
          }
          
          .skeleton-arrow {
            width: 12px;
            height: 16px;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
            border-radius: 2px;
            margin-left: 8px;
          }
        }
      }
      
      @keyframes skeleton-loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }

      // 错误提示样式
      .error-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 20px;
        text-align: center;

        .error-message {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          white-space: pre-line;
        }
      }
    }

    .hot_footer {
      width: 100%;
      height: 52px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-shrink: 0;
      padding: 0 20px;
      font-size: 14px;
      border-radius: 0 0 10px 10px;

      .update-info {
        font-size: 12px;
        opacity: 0.9;
      }

      .divider {
        width: 1px;
        height: 20px;
        background-color: rgba(0, 0, 0, 0.1);
        margin: 0 16px;
      }

      .refresh-btn {
        .icon {
          cursor: pointer;
          transition: transform 0.3s ease;

          &:hover {
            transform: rotate(180deg);
          }
        }
        
        &.loading .icon {
          animation: spin 1s linear infinite;
          cursor: not-allowed;
          
          &:hover {
            transform: none;
          }
        }
      }
      
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>