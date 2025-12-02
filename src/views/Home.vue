<template>
  <div class="container">
    <weibo />
    <douyin />
    <bilibili />
    <baidu />
    <jinritoutiao />
    <zhihu />
    <tenxun />
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