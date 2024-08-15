<template>
    <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
  <div class="common-wrapped">
    
  </div>
</template>

<script setup lang="ts">
import breadCrumb from '@/components/bread_crumb.vue';
import{reactive,ref,onMounted,nextTick,toRaw} from 'vue'
import { ElMessage } from 'element-plus';
import { ElInput } from 'element-plus/lib/components/index.js';



let item = reactive({
    first:'系统设置',
});






</script>

<style scoped>

</style>