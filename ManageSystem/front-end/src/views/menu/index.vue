<template>
<div class="common-layout">
  <el-container>
    <el-aside width="200px">
          <el-menu
            class="el-menu-vertical-demo"
            router>
            <div class="title">通用后台管理系统</div>

            <el-menu-item index="home">
              <el-icon>
                <House/>
              </el-icon>
              <span>首页</span>
            </el-menu-item>

            <el-menu-item>
              <el-icon>
                <Document />
              </el-icon>
              <span>系统概览</span>
            </el-menu-item>

            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <User />
                </el-icon>
                <span>用户管理</span>
              </template>

              <el-menu-item-group title="管理员管理">
                <el-menu-item>产品管理员</el-menu-item>
                <el-menu-item>用户管理员</el-menu-item>
                <el-menu-item>消息管理员</el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group title="员工管理">
                <el-menu-item>用户列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="4">
              <template #title>
                <el-icon>
                  <TakeawayBox></TakeawayBox>
                </el-icon>
                <span>产品管理</span>
              </template>

              <el-menu-item-group title="入库管理">
                <el-menu-item>产品列表</el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group title="出库管理">
                <el-menu-item>出库列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="5">
              <template #title>
                <el-icon>
                  <ChatSquare></ChatSquare>
                </el-icon>
                <span>消息管理</span>
              </template>

              <el-menu-item-group title="消息管理">
                <el-menu-item>消息列表</el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group title="回收站">
                <el-menu-item>回收站</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

              <el-menu-item>
                <el-icon>
                  <icon-menu></icon-menu>
                </el-icon>
                <span>合同管理</span>
              </el-menu-item>

              <el-menu-item>
                <el-icon>
                  <icon-menu></icon-menu>
                </el-icon>
                <span>操作日志</span>
              </el-menu-item>

              <el-menu-item>
                <el-icon>
                  <icon-menu></icon-menu>
                </el-icon>
                <span>登录日志</span>
              </el-menu-item>

              <el-menu-item>
                <el-icon>
                  <Tools></Tools>
                </el-icon>
                <span>系统设置</span>
              </el-menu-item>
          </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="header-left-content">尊敬的 {{name}} 欢迎登录本系统</span>
        <div class="header-right-content">
          <el-badge class="item"

          >
            <el-icon>
              <Message></Message>
            </el-icon>
          </el-badge>
          <el-avatar :size="24" >
            <el-dropdown>
              <span class="el-dropdown-link">
                设置
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>设置账号</el-dropdown-item>
                  <el-dropdown-item>更改头像</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-avatar>

        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script setup lang="ts">
  import {
    ChatSquare,
    Document,
    Menu as IconMenu,
    Message,
    TakeawayBox,
  }from '@element-plus/icons-vue'

  import {ref} from 'vue'
  import { RouterView } from 'vue-router';

  const name = ref("大煞笔");

  const handleOpen = ()=>{

  };

  const handleClose = ()=>{

  };

</script>

<style scoped>

</style>