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
        <div> {{ currentTime }} </div>
        <div> {{ lunarInfo }} </div>
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
      color: #62748e;
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
  }
}
</style>