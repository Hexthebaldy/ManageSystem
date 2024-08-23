<template>
  <breadCrumb ref="breadcrumb" :item="item"></breadCrumb>
  <div class="common-wrapped">
    <div class="common-content">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="demo-tabs">
        <el-tab-pane label="账号详情" name="first">
          <div class="account-info-wrapped">
            <span>用户头像</span>
            <div class="account-info-content"><!-- action 是上传头像的接口 -->
              <el-upload class="avatar-uploader" action="http://127.0.0.1:3007/users/uploadAvatar"
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
            <div class="account-info-content" id="gender-selection">
              <el-select v-model="userData.sex" class="m-2" style="width:100px">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
              <div class="account-save-button">
                <el-button type="primary" @click="saveSex">保存</el-button>
              </div>
            </div>
          </div>
          <div class="account-info-wrapped">
						<span>用户身份：</span>
						<div class="account-info-content">
							<el-input v-model="userData.identity" disabled></el-input>
						</div>
					</div>
          <div class="account-info-wrapped">
						<span>用户部门：</span>
						<div class="account-info-content">
							<el-input v-model="userData.department" disabled></el-input>
						</div>
					</div>
          <div class="account-info-wrapped">
						<span>用户邮箱：</span>
						<div class="account-info-content">
							<el-input v-model="userData.email"></el-input>
						</div>
						<div class="account-save-button">
							<el-button type="primary" @click="saveEmail">保存</el-button>
						</div>
					</div>
        </el-tab-pane>

        <el-tab-pane label="公司信息" name="second">
          <div class="account-info-wrapped">
						<span>公司介绍</span>
						<div class="account-info-content">
							<el-button type="success" @click="openEditor(1)">编辑公司介绍</el-button>
						</div>
					</div>
          <div class="account-info-wrapped">
						<span>公司架构</span>
						<div class="account-info-content">
							<el-button type="success" @click="openEditor(2)">编辑公司介绍</el-button>
						</div>
					</div>
          <div class="account-info-wrapped">
						<span>公司战略</span>
						<div class="account-info-content">
							<el-button type="success" @click="openEditor(3)">编辑公司介绍</el-button>
						</div>
					</div>
          <div class="account-info-wrapped">
						<span>公司高层</span>
						<div class="account-info-content">
							<el-button type="success" @click="openEditor(4)">编辑公司介绍</el-button>
						</div>
					</div>
        </el-tab-pane>

        <el-tab-pane label="首页管理" name="third"></el-tab-pane>
        
        <el-tab-pane label="其他设置" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <editor ref="editorP"></editor>
</template>

<script setup lang="ts">
import breadCrumb from '@/components/bread_crumb.vue';
import { reactive, ref, onMounted, nextTick, toRaw } from 'vue'
import { ElMessage } from 'element-plus';
import { ElInput } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useUserInfo } from '@/stores/userinfor';
import { bind, changeName, changeSex, changeEmail, getUserInfo } from '@/api/userinfor';
import { getCompanyName,changeCompanyName,getAllSwiper,setDepartment,getDepartment,setProduct,getProduct } from '@/api/setting';
import {bus} from '@/utils/mitt';
import editor from './components/editor.vue';

onMounted(async () => {
  let account = localStorage.getItem('account') as unknown as string;
  let res = await getUserInfo(account) as any;
  res = res.data;
  userData.account = account;
  userData.name = res.name;
  userData.sex = res.sex;
  userData.identity = res.identity;
  userData.department = res.department;
  userData.email = res.email;

})

interface user {
  account: string | null,
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

const handleAvatarSuccess = async(response: any) => {
  console.log('response: ', response)
  if(response.message ==='File uploaded successfully' ){
    userStore.$patch({
      imageUrl:'http://127.0.0.1:3007'+response.filePath
    })
    ElMessage({
      message:'更新头像成功',
      type:'success',
    });

    const res = await bind(localStorage.getItem('account')as unknown as string,response.filePath);

  }else{
    console.log('handleAvatarSucess() went wrong');
  }
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

const saveName = async() => {
  const res = await changeName(userData.name,localStorage.getItem('account') as unknown as string)
  
  if(res.status === 200){
    ElMessage({
      message:'修改成功',
      type:'success',
    })
  }else{
    ElMessage.error('修改姓名失败');
  }
};

const saveSex = async() => {
  const res = await changeSex(userData.sex,localStorage.getItem('account') as unknown as string)
  
  if(res.status === 200){
    ElMessage({
      message:'修改成功',
      type:'success',
    })
  }else{
    ElMessage.error('修改性别失败');
  }
};

const saveEmail = async() => {
  const res = await changeEmail(userData.email,localStorage.getItem('account') as unknown as string)
  
  if(res.status === 200){
    ElMessage({
      message:'修改成功',
      type:'success',
    })
  }else{
    ElMessage.error('修改邮箱失败');
  }
};

//公司信息
const companyName = ref();

const returnCompanyName = async()=>{
  companyName.value = await getCompanyName()
}

// returnCompanyName();

//修改公司名字
const resetCompanyName = async()=>{
  const res = await changeCompanyName(companyName.value);
  if(res.status == 200){
    ElMessage({
      message:'修改公司名称成功',
      type:'success',
    });
  }else{
    ElMessage.error('修改公司名称失败，请重新输入');
  }
}

const editorP = ref()

const openEditor = async(id:number)=>{
  bus.emit('editorTitle',id);
  console.log("editorP: ",editorP.value);
  editorP.value.openDialog();

};


const swiperData = [{
  name:'swiper1'
},{
  name:'swiper2'
},{
  name:'swiper3'
},{
  name:'swiper4'
},{
  name:'swiper5'
},{
  name:'swiper6'
}]

const imageUrl = ref<string[]>([])

const returnAllSwiper = async()=>{
  imageUrl.value = await getAllSwiper() as any
}

const handleSwiperSuccess = ()=>{
  returnAllSwiper();
};

// returnAllSwiper();



//修改密码没写完
const openChangePassword = () => {

};

</script>


<style scoped>
.common-wrapped {
  padding: 3px ;
  background: #f5f5f5;
  height: calc(100vh - 101px);
}

.common-wrapped .common-content{
  padding: 0 10px;
  height: 100%;
  background:#fff;
}

.common-content .account-info-wrapped{
  display: flex;
  align-items:center;
  padding-left:50px;
  margin-bottom:24px;
  font-size:14px;
}

.account-info-wrapped .account-info-content{
  margin-left:24px;
  margin-right: 16px;
}

#gender-selection{
  display: flex;
}

.account-save-button{
  margin-left:16px;
}



</style>



<style>
 .avatar-uploader .el-upload{
  width:100px;
  height: 100px;
  border:1px dashed #2b303b;
  border-radius: 6px;
  cursor:pointer;
  position:relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);

 }

 .avatar-uploader .el-upload:hover{
  border-color: #2b303b;
 }

 .el-icon.avatar-uploader-icon{
  font-size: 28px;
  color:#8c939d;
 }

</style>