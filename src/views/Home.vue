<template>
  <div class="container">
    <weibo />
    <douyin />
    <bilibili />
    <netease-music />
    <douban-movic />
    <baidu />
    <jinritoutiao />
    <zhihu />
    <tenxun />
    <baidutieba />
    <juejin />
    <netease />
    <lol />
    <thepaper />
    <kuaishou />
    <history-today />
    <weread />
  </div>
</template>

<script setup>
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
</style>