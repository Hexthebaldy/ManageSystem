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

            <el-menu-item index="overview">
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
                <el-menu-item index="product_manage">产品管理员</el-menu-item>
                <el-menu-item index="users_manage">用户管理员</el-menu-item>
                <el-menu-item index="message_manage">消息管理员</el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group title="员工管理">
                <el-menu-item index="user_list">用户列表</el-menu-item>
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
                <el-menu-item index="product_list_manage">产品列表</el-menu-item>
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

              <el-menu-item index="file">
                <el-icon>
                  <icon-menu></icon-menu>
                </el-icon>
                <span>合同管理</span>
              </el-menu-item>

              <el-menu-item index="operation">
                <el-icon>
                  <icon-menu></icon-menu>
                </el-icon>
                <span>操作日志</span>
              </el-menu-item>

              <el-menu-item index="log">
                <el-icon>
                  <icon-menu></icon-menu>
                </el-icon>
                <span>登录日志</span>
              </el-menu-item>

              <el-menu-item index="set">
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
  .el-aside{
    height: 100vh;
    background:#2b303b;
    width:210px;
    overflow-x: hidden;
  }

  .el-aside .el-menu{
    background: #2b303b;
    color:#fff;
    width:210px;
    height:100vh;
    border-right: 0;
  }

  .el-aside .title{
    padding:20px;
    display:flex;
    justify-content: center;
    color:#fff;
    background: #2b303b;
  }

  .el-aside .el-menu-item{
    color:#ffffff
  }



  .el-header{
    display:flex;
    height:55px;
    background:#262f3e;
    color:#c1c6c8;
    justify-content: space-between;
  }

  .el-header .header-left-content{
    line-height: 50px;
    font-size: 14px
  }

  .el-header .header-right-content{
    width:160px;
    display:flex;
    justify-content: space-around;
    align-items: center;
  }

  .item{
    cursor:pointer;
  }

  .el-main{
    --el-main-padding:0;
    background-color: #f3f4fa;
  }

  .el-menu-item:hover{
    background-color: #006eff;
  }

  :deep(.el-sub-menu__title):hover{
    background-color: #006eff;
  }

  :deep(.el-sub-menu__title){
    background-color:#2b303b;
    color:#fff;
  }

  :deep(.el-menu--inline){
    background-color: #2b303b;
  }
</style>