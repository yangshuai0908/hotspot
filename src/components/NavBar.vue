<script setup>
import { useDateTime } from '../utils/dateUtils'

// 使用时间工具函数
const { currentTime, lunarInfo } = useDateTime(1000)
</script>

<template>
  <div class="header-page">
    <div class="header">
      <div class="left">
        <img src="../assets/logo.svg" alt="" width="40" height="40">
        <div class="left_title">
          <span class="hot"> HotSpot</span>
          <span class="slogan">汇聚全网热点，热门尽览无余</span>
        </div>
      </div>
      <div class="middle">
        <div class="time"> {{ currentTime }} </div>
        <div class="lunar"> {{ lunarInfo }} </div>
      </div>
      <div class="right">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor">
          <path
            d="M5 8H19V5H5V8ZM14 19V10H5V19H14ZM16 19H19V10H16V19ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3Z">
          </path>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);


  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 64px;

    .left {
      display: flex;

      .left_title {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
      }

      .hot {
        font-size: 18px;
        font-weight: 700;
        color: #f82006;
      }

      .slogan {
        font-size: 14px;
        color: #62748e;
      }
    }

    .middle {
      display: flex;
      flex-direction: column;
      align-items: center;

      .time {
        font-size: 18px;
        font-weight: 700;
      }

      .lunar {
        color: #62748e;
      }
    }

    .right {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 50%;
      border: 1px solid #eaeaea;
    }
    .right:hover {
      background-color: #d4d4d8;
    }
  }

  // 平板端响应式
  @media (max-width: 1024px) {
    .header {
      padding: 0 20px;
      
      .left {
        .left_title {
          .slogan {
            display: none; // 隐藏标语
          }
        }
      }
      
      .middle {
        .time {
          font-size: 16px;
        }
        
        .lunar {
          font-size: 12px;
        }
      }
    }
  }

  // 移动端响应式
  @media (max-width: 768px) {
    .header {
      padding: 0 15px;
      height: 56px; // 减小高度
      justify-content: space-between; // 改为space-between
      
      .left {
        flex: 1;
        min-width: 0; // 防止flex子项溢出
        
        img {
          width: 32px;
          height: 32px;
        }
        
        .left_title {
          margin-left: 8px;
          
          .hot {
            font-size: 16px;
          }
          
          .slogan {
            display: none;
          }
        }
      }
      
      .middle {
        flex: 1;
        justify-content: center;
        
        .time {
          font-size: 14px;
          font-weight: 600;
        }
        
        .lunar {
          font-size: 11px;
          white-space: nowrap; // 防止换行
          overflow: hidden;
          text-overflow: ellipsis; // 超出显示省略号
          max-width: 200px;
        }
      }
      
      .right {
        width: 28px;
        height: 28px;
        flex-shrink: 0; // 防止压缩
      }
    }
  }

  // 小屏幕手机响应式
  @media (max-width: 480px) {
    .header {
      padding: 0 10px;
      height: 52px;
      
      .left {
        .left_title {
          .hot {
            font-size: 14px;
          }
        }
      }
      
      .middle {
        .time {
          font-size: 12px;
        }
        
        .lunar {
          font-size: 10px;
          max-width: 150px;
        }
      }
      
      .right {
        width: 24px;
        height: 24px;
      }
    }
  }

  // 超小屏幕响应式
  @media (max-width: 360px) {
    .header {
      .middle {
        .lunar {
          display: none; // 隐藏农历信息
        }
      }
    }
  }
}
</style>