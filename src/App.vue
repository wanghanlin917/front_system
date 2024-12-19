<template>
  <router-view>
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </router-view>
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style>
body {
  @apply bg-gray-100;
}
#nprogress .bar {
  background-color: #f4f4f4 !important;
  height: 3px !important;
}
</style>
