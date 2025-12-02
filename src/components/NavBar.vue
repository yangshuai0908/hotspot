<script setup>
import { computed } from 'vue'
import { useDateTime } from '../utils/dateUtils'
import { useRouter, useRoute } from 'vue-router'

// 使用时间工具函数
const { currentTime, lunarInfo } = useDateTime(1000)
// 引入路由
const router = useRouter()
const route = useRoute()

// 根据当前路由判断是否在历史页面
const isHistoryPage = computed(() => route.path === '/history')

const goHome = () => {
  router.push('/')
}

// 历史
const goHistory = () => {
  router.push('/history')
}
</script>

<template>
  <div class="header-page">
    <div class="header">
      <div class="left">
        <img src="../assets/logo.svg" alt="" width="40" height="40" @click="goHome">
        <div class="left_title">
          <span class="hot"> HotSpot</span>
          <span class="slogan">汇聚全网热点，热门尽览无余</span>
        </div>
      </div>
      <div class="middle">
        <div class="time"> {{ currentTime }} </div>
        <div class="lunar"> {{ lunarInfo }} </div>
      </div>
      <div @click="isHistoryPage ? goHome() : goHistory()" style=" cursor: pointer;">
        <div v-if="isHistoryPage">
          <!-- 首页图标 - 当前在历史页面时显示 -->
          <svg t="1764666924068" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="24112" width="30" height="30">
            <path d="M512.092672 768a76.8 76.8 0 0 1 76.8 76.8v179.2h-153.6v-179.2a76.8 76.8 0 0 1 76.8-76.8z"
              fill="#d81e06" p-id="24113"></path>
            <path
              d="M570.051072 21.2992a82.1504 82.1504 0 0 0-110.336 0L13.404672 444.9792a41.1648 41.1648 0 0 0 55.1424 61.1328l7.0912-6.7328V941.568A82.304 82.304 0 0 0 157.967872 1024h239.616v-247.8336a57.9584 57.9584 0 0 1 58.0096-58.0352h112.7424a57.984 57.984 0 0 1 58.0096 58.0352V1024h245.2992a82.3808 82.3808 0 0 0 82.3808-82.432V504.7808c18.2784 16.5376 44.2368 15.2832 59.4432-1.664a41.1648 41.1648 0 0 0-2.9696-58.1376L570.051072 21.2992z"
              fill="#d81e06" p-id="24114"></path>
          </svg>
        </div>
        <div v-else>
          <!-- 历史图标 - 当前在首页时显示 -->
          <svg t="1764667400634" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="25418" width="30" height="30">
            <path
              d="M48.924269 283.370883l130.462331 0c27.036773 0 48.957015-21.87317 48.957015-48.820915 0-26.990724-21.925359-48.822962-48.957015-48.822962L48.924269 185.727005C21.940708 185.727005 0.021489 207.559243 0.021489 234.548944 0.020466 261.492596 21.940708 283.370883 48.924269 283.370883z"
              fill="#d81e06" p-id="25419"></path>
            <path
              d="M954.513416 39.213094l-50.343595 0-17.21508 0L668.62827 39.213094l0-0.005117L146.791228 39.207977c-27.031657 0-48.903803 21.85782-48.903803 48.822962l0 48.822962 81.504292 0c54.069453 0 97.860818 43.751457 97.860818 97.69095 0 53.933353-43.791365 97.68481-97.860818 97.68481L97.887424 332.22966l0 81.388658 81.504292 0c54.069453 0 97.860818 43.705408 97.860818 97.644901 0 53.939493-43.791365 97.643877-97.860818 97.643877L97.887424 608.907097l0 81.386612 81.504292 0c54.069453 0 97.860818 43.75248 97.860818 97.692996 0 53.933353-43.791365 97.68481-97.860818 97.68481L97.887424 885.671515l0 48.779983c0 26.988678 21.878287 48.870034 48.903803 48.870034l481.373469 0 40.464597 0 218.325447 0 0 0.005117 67.559699 0 0-0.011256c37.245276 0 67.496254-21.877263 67.496254-48.865941L1022.010693 88.036056C1022.008646 61.068867 991.759715 39.213094 954.513416 39.213094zM943.255001 451.751824c-1.874697 208.438263-21.414729 318.218552-58.619072 329.383846-29.788443 20.454868-81.909521 26.038026-156.317185 16.747429-22.331611-3.750417-32.581046-14.915711-30.705326-33.495882 5.582135-18.580171 19.540032-26.038026 41.87062-22.330588 61.410652 7.457856 99.530854 1.87572 114.446565-16.748453 18.580171-9.289574 29.745465-92.115977 33.496905-248.433162 1.831718-22.331611-11.165294-33.496905-39.07904-33.496905L680.864966 443.37811c0 176.818101-57.703213 300.55424-173.066661 371.254465-20.499893 12.997012-36.288484 12.997012-47.453778 0-9.333576-14.915711-4.6673-30.705326 13.956873-47.453778 59.535955-46.493917 97.699136-89.324398 114.447589-128.403438 18.579147-35.328623 30.705326-100.490715 36.287461-195.398272L485.466694 443.377086c-16.748453 0-26.997887-9.290597-30.705326-27.913746 1.832741-16.748453 11.166317-26.038026 27.913746-27.913746l145.152914 0 0-80.950683c0-22.330588 9.289574-35.3276 27.912723-39.07904 16.748453 1.87572 26.038026 13.956873 27.913746 36.287461l0 83.741239 189.81409 0C923.714969 383.842155 946.962439 405.256884 943.255001 451.751824zM943.255001 250.771417l-485.702054 0c-24.206308-1.831718-35.371602 7.458879-33.496905 27.913746l0 206.562543c1.831718 143.321196-13.956873 246.602468-47.453778 309.844837-11.165294 18.580171-25.122167 24.163329-41.87062 16.748453-14.916734-7.457856-18.62315-21.415752-11.165294-41.87062 18.580171-31.621185 30.705326-67.909669 36.287461-108.86443 5.583159-35.328623 8.374738-92.115977 8.374738-170.275081L368.228549 256.353552c-1.87572-42.786479 21.37175-63.24237 69.784366-61.410652l508.033665 0c20.454868 1.87572 30.705326 11.165294 30.705326 27.913746C974.876186 241.48082 963.710892 250.771417 943.255001 250.771417z"
              fill="#d81e06" p-id="25420"></path>
            <path
              d="M0.025583 511.272429c0 26.985608 21.920242 48.820915 48.909943 48.820915l130.461307 0c27.036773 0 48.951899-21.832238 48.951899-48.820915 0-26.995841-21.924335-48.870034-48.951899-48.870034L48.935526 462.402395C21.945825 462.402395 0.025583 484.276588 0.025583 511.272429z"
              fill="#d81e06" p-id="25421"></path>
            <path
              d="M228.348732 787.988752c0-26.948769-21.924335-48.820915-48.951899-48.820915L48.935526 739.167836c-26.989701 0-48.909943 21.878287-48.909943 48.820915 0 26.944676 21.920242 48.822962 48.909943 48.822962l130.461307 0C206.433606 836.811714 228.348732 814.935474 228.348732 787.988752z"
              fill="#d81e06" p-id="25422"></path>
          </svg>
        </div>
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

      img {
        cursor: pointer;
      }

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