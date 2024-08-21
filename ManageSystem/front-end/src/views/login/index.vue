<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header-wrapped">
                <div class="header-content">
                    <h3>通用后台管理系统</h3>
                    <span>欢迎您的登录</span>
                </div>
            </el-header>
            <el-main>
                <div class="login-wrapped">
                    <el-card class="box-card">
                        <el-tabs v-model="activeName" class="demo-tabs">
                            <el-tab-pane label="登陆">
                                <el-form class="login-form">
                                    <el-form-item label="账号">
                                        <el-input v-model="loginData.account" placeholder="请输入账号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码">
                                        <el-input v-model="loginData.password" placeholder="请输入密码"></el-input>
                                    </el-form-item>
                                    <!--底部外壳-->
                                    <div class="footer-wrapped">
                                        <div class="forget-password">
                                            <span class="forget-password-button" @click="openForget">忘记密码</span>
                                        </div>
                                        <div class="footer-button">
                                            <el-button type="primary" @click="Login">登录</el-button>
                                        </div>
                                        <div class="footer-button">
                                            还没有账号？<span class="foot-go-register">马上注册</span>
                                        </div>
                                    </div>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="注册">
                                <el-form class="login-form">
                                    <el-form-item label="账号">
                                        <el-input v-model="registerData.account" placeholder="账号长度为6-12位"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码">
                                        <el-input v-model="registerData.password"
                                            placeholder="密码长度6-12位含字母数字"></el-input>
                                    </el-form-item>
                                    <el-form-item label="确认密码">
                                        <el-input v-model="registerData.nextPassword" placeholder="请再次输入密码"></el-input>
                                    </el-form-item>
                                    <div class="footer-button">
                                        <el-button type="primary" @click="Register">注册</el-button>
                                    </div>
                                </el-form>
                            </el-tab-pane>

                        </el-tabs>
                    </el-card>
                </div>
            </el-main>
            <el-footer class="footer-wrapped">
                <div class="footer-content">
                    <div class="title">
                        <span>xxxxxxxx</span> 
                        <span>xxxxxxxx</span> 
                        <span>xxxxxxxx</span>
                    </div>
                </div>
            </el-footer>
        </el-container>
    </div>
    <forget ref="forgetP"></forget>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import {
    login, register
} from '../../api/login'
import { loginLog } from '../../api/log'
import { useUserInfo } from '@/stores/userinfor'
import forget from './components/forget_password.vue'

const router = useRouter();
const store = useUserInfo();
let activeName = ref('first');

interface FormData {
    account: number | null;
    password: string;
    nextPassword?: string;
};


const loginData: FormData = reactive({
    account: null,
    password: '',
});

const registerData: FormData = reactive({
    account: null,
    password: '',
    nextPassword: '',
});

const Register =  async()=>{
    if(registerData.password === registerData.nextPassword){
        const res = await register(registerData) as unknown as string;
        if(res === "注册成功"){
            ElMessage({
                message:'注册成功',
                type:'success',
            })
            activeName.value = 'first';
        }else{
            console.log('res.status: ',res);
            ElMessage.error(res);
        }
    }else{
        ElMessage.error('注册失败')
    }
}



const Login = async () => {
    let res = await login(loginData) as unknown as any;
    res = res.data;
    console.log("res: ",res);
    if (res.message === "登录成功") {
        // const { id, name, account, email, department } = res.results;
        const { token } = res
        ElMessage({
            message: '登录成功',
            type: 'success'
        });

        // localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        // localStorage.setItem('name', name);
        // localStorage.setItem('department', department);
        // await loginLog(account, name, email)

        // store.userInfo(id);
        router.push('/home')
    }else{
        console.log(res.message);
        ElMessage.error('登录失败');
    }
}


const forgetP = ref();

const openForget = ()=>{
    forgetP.value.open()
};

</script>

<style scoped>
.header-wrapped .header-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}




.el-main .login-wrapped {
    width: 1200px;
    height: 600px;
    margin: 0 auto;
}


.el-main .login-wrapped .box-card {
    width: 350px;
    height: 375px;
    margin: 0 auto;
    float: right;
    position: relative;
    top: 14%;
}

.el-main .login-wrapped .box-card .login-form .footer-wrapped{
    display: flex;
    flex-direction: column;
}

.footer-go-register{
    font-size: 12px;
    margin:12px 0;
    display: flex;
    justify-content: center;
}

.footer-go-register .go-register{
    font-size: 12px;
    color: #409eff;
    cursor: pointer;
}

.footer-button{
    width:100%;
    display: flex;
    justify-content: center;
}

.el-form{
    margin-top: 30px;
}

:deep(.el-tabs__item){
    color:#333;
    font-size: 18px;
}

:deep(.el-input__inner){
    height:40px;
}

:deep(.el-form-item__label){
    height: 40px;
    line-height: 40px;
}

:deep(.el-button){
    width:300px;
    height:45px;
    font-size:16px;
    margin-top: 20px;
    margin-bottom: 15px;
}


</style>