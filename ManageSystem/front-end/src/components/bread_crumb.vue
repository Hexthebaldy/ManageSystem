<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>{{props.item.first}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="props.item.second">{{props.item.second}}</el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">

const props = defineProps(['item']);
console.log('item: ',props.item);

</script> 

<style scoped>
    .bread-crumb{
        height:30px;
        padding: 0 10px;
    }


</style>