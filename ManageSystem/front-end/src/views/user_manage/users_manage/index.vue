<template>
  <breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
  <div class="table-wrapped">
      <!-- 顶部 -->
      <div class="table-top">
          <!-- 表格顶部 -->
          <div class="table-header">
              <!-- 搜索框 -->
              <div class="search-wrapped">
                  <el-input v-model="adminAccount" class="w-50 m-2" size="large" placeholder="输入账号进行搜索"
                      @change='searchAdmin()' clearable @clear="clearInput()">
                      <template #prefix>
                          <Search />
                      </template>
                  </el-input>
              </div>
              <div class="button-wrapped">
                  <el-button type="primary" @click="openCreate(2)">添加用户管理员</el-button>
              </div>
          </div>
          <!-- 表格内容 -->
          <div class="table-content">
              <el-table :data="tableData" style="width: 100%" border>
                  <el-table-column type="index" width="50" />
                  <el-table-column prop="account" label="账号" />
                  <el-table-column prop="name" label="姓名" />
                  <el-table-column prop="department" label="部门" />
                  <el-table-column prop="email" label="邮箱" />
                  <el-table-column label="操作">
                      <template #default="{ row }">
                          <div>
                              <el-button type="success" @click="openEdit(row.account)">编辑</el-button>
                              <el-button type="danger" @click="openDelete(row.account)">删除</el-button>
                          </div>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
      </div>
      <!-- 底部 -->
      <div class="table-footer">
    <el-pagination :page-size="1" :current-page="paginationData.currentPage" :pager-count="7"
      :total="adminTotal" :page-count="paginationData.pageCount" @current-change="currentChange"
      layout="prev, pager, next" />
  </div>
  </div>
  <createA ref="create_admin"></createA>
  <editA ref='edit_admin'></editA>
  <deleteA ref="delete_admin"></deleteA>
</template>

<script setup lang="ts">
import {
  ref, reactive, onBeforeUnmount
} from 'vue'
import { bus } from "@/utils/mitt"
import { Search } from '@element-plus/icons-vue'
import breadCrumb from '@/components/bread_crumb.vue'
import createA from '../components/create_admin.vue'
import editA from '../components/edit_admin.vue'
import deleteA from '../components/delete_admin.vue'
import{useTable} from '@/hooks/tableData'

const breadcrumb = ref();
const edit_admin = ref();
const delete_admin = ref()
const create_admin = ref();
const item = ref({
  first: '用户管理',
  second: '用户管理员'
});
const {   adminAccount,
    paginationData,
    adminTotal,
    tableData,
    currentChange,
    searchAdmin,
    clearInput} = useTable('用户管理员')



//新建管理员
const openCreate = (id:number)=>{
  bus.emit('createdId',id);
  create_admin.value.open();
};

//编辑管理员
const openEdit = (id:number)=>{
  bus.emit('editId',id);
  edit_admin.value.open();
}

//降级管理员
const openDelete = (id:number)=>{
  bus.emit('deleteId',id);
  delete_admin.value.open();
}

// clearInput();




onBeforeUnmount(()=>{
  bus.all.clear();
})
</script>

<style scoped></style>