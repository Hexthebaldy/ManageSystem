<template>
  <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
  <div class="common-wrapped">
    <div class="common-content">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="demo-tabs">
        <el-tab-pane label="账号详情" name="first">
          <div class="account-info-wrapped">
            <span>用户头像</span>
            <div class="account-info-content"><!-- action 是上传头像的接口 -->
              <el-upload class="avatar-uploader" action="http://127.0.0.1:3007/user/uploadAvatar"
                :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                name="avatar" 
                >
                <img v-if="userStore.imageUrl" :src="userStore.imageUrl" class="avatar">
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户账号</span>
            <div class="account-info-content">
              <el-input v-model="userData.account" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户密码</span>
            <div class="account-info-content">
              <el-input type="primary" @click="openChangePassword">修改密码</el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户姓名</span>
            <div class="account-info-content">
              <el-input v-model="userData.name"></el-input>
            </div>
            <div class="account-save-button">
              <el-button type="primary" @click="saveName">保存</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户性别</span>
            <div class="account-info-content">
              <el-select v-model="userData.sex" class="m-2" style="width:100px">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
              <div class="account-save-button">
                <el-button type="primary" @click="saveSex">保存</el-button>
              </div>
            </div>
          </div>





        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second"></el-tab-pane>
        <el-tab-pane label="首页管理" name="third"></el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import breadCrumb from '@/components/bread_crumb.vue';
import { reactive, ref, onMounted, nextTick, toRaw } from 'vue'
import { ElMessage } from 'element-plus';
import { ElInput } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useUserInfo } from '@/stores/userinfor';
import { bind, changeName, changeSex, changeEmail, getUserInfo } from '@/api/userinfor';


onMounted(async () => {
  let id = localStorage.getItem('id') as unknown as number;
  const res = await getUserInfo(id) as any;

  userData.account = res.account;
  userData.name = res.name;
  userData.sex = res.sex;
  userData.identity = res.identity;
  userData.department = res.department;
  userData.email = res.email;

})

interface user {
  account: number | null,
  name: string,
  sex: string,
  identity: string,
  department: string,
  email: string
};

const userStore = useUserInfo();
const userData: user = reactive({
  account: null,
  name: '',
  sex: '',
  identity: '',
  department: '',
  email: ''
})


let item = reactive({
  first: '系统设置',
});

let activeName = ref('first')

function handleClick(tab: any, event: any) {
  console.log(tab, event);
}

const handleAvatarSuccess = (response: any) => {
  console.log('response: ', response)
  // if(response.status == 0){
  //   userStore.$patch({
  //     imageUrl:response.url
  //   })
  //   ElMessage({
  //     message:'更新头像成功',
  //     type:'success',
  //   });
  //   (async()=>{
  //     const res = await bind(localStorage.getItem('account')as unknown as number,response.onlyId,response.url);


  //   })
  // }else{

  // }
}

const beforeAvatarUpload = (rawFile: any) => {
  if(rawFile.type != 'image/jpeg'){
    ElMessage.error('头像必须是jpg格式');
    return false;
  }else if(rawFile.size /1024/1024>2){
    ElMessage.error('头像必须小于2MB');
    return false
  }
  return true;
};

const openChangePassword = () => {

};

const saveName = async () => {

};

const saveSex = async () => {

};

</script>


<style scoped>
.common-wrapped {
  padding: 8px;
  background: #f5f5f5;
  height: calc(100vh - 101px);
}
</style>