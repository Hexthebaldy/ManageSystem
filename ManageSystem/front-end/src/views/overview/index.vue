<template>
    <breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
    <!-- 外壳 -->
    <div class="overview-wrapped">
        <!-- 顶部内容外壳 -->
        <div class="top-content-wrapped">
            <!-- 个人信息 -->
            <div class="person-info">
                <!-- 用户头像外壳 -->
                <div class="person-avatar-wrapped">
                    <el-avatar :size="100" :src="userStore.imageUrl" />
                    <span class="department">所属部门：人大常委{{ userData.department }}</span>
                    <div class="company">所属公司：中南海</div>
                </div>
                <!-- 竖线 -->
                <div class="line-wrapped">
                    <div class="line"></div>
                </div>
                <!-- 详细信息外壳 -->
                <div class="detail-info-wrapped">
                    <p>姓名：{{ userData.name }}</p>
                    <p>性别：{{ userData.sex }}</p>
                    <p>身份：{{ userData.identity }}</p>
                    <p>分管领域：超级管理</p>
                    <p>权限：最高权限</p>
                </div>
            </div>
            <div class="manage-user pie"></div>
        </div>
        <!-- 中间内容外壳 -->
        <div class="mid-content-wrapped">
			<div class="product-category-bar mid-content-left"></div>
			<div class="mid-content-right">
				<div class="title">常用管理</div>
				<el-row :gutter="20">
					<el-col :span="6">
						<div class="button-area" @click="routerTo('users_manage')">
							<SvgIcon icon-name="user" style="width: 24px;height: 24px;"></SvgIcon>
							<span class="button-name">用户管理</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="button-area" @click="routerTo('product_manage_list')">
							<SvgIcon icon-name="product" style="width: 24px;height: 24px;"></SvgIcon>
							<span class="button-name">产品管理</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="button-area" @click="routerTo('message_list')">
							<SvgIcon icon-name="notice" style="width: 24px;height: 24px;"></SvgIcon>
							<span class="button-name">系统消息</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="button-area" @click="routerTo('set')">
							<SvgIcon icon-name="me" style="width: 24px;height: 24px;"></SvgIcon>
							<span class="button-name">个人信息</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="button-area">
							<SvgIcon icon-name="message" style="width: 24px;height: 24px;"></SvgIcon>
							<span class="button-name">部门信息</span>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="button-area" @click="routerTo('set')">
							<SvgIcon icon-name="set" style="width: 24px;height: 24px;"></SvgIcon>
							<span class="button-name">系统设置</span>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
        <!-- 底部内容外壳 -->
        <div class="footer-content-wrapped">
            <div class="massage-level footer-content-left">1</div>
            <div class="login-week footer-content-right">2</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    onMounted,
    reactive,
    ref,
} from 'vue'
import * as echarts from 'echarts';
import breadCrumb from '@/components/bread_crumb.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import {
    useRouter
} from 'vue-router'
import {
    useUserInfo
} from '@/stores/userinfor'
import {
    getCategoryAndNumber,
    getAdminAndNumber,
    getLevelAndNumber,
    getDayAndNumber
} from '../../api/overview'
import {
    getUserInfo
} from '@/api/userinfor'

onMounted(()=>{
    manageUser();
    productCategoryBar();
    messageLevel();
    messageAllDay();
})


interface UserInfo{
    name:string,
    sex:string,
    identity:string,
    department:string,
};


const userStore = useUserInfo();
const breadcrumb = ref();
const item = ref({first:'系统概览',});
const router = useRouter();
const userData:UserInfo = reactive({
    name:'',
    sex:'',
    identity:'',
    department:'',
});

const routerTo = (x:string)=>{
    router.push(`\/${x}`);
};

//管理员与用户对比图
const manageUser = async () => {
		// 通过类名 初始化
		const mu = echarts.init(document.querySelector('.manage-user') as HTMLElement)
		mu.showLoading()
		let data = await getAdminAndNumber() as any
        // console.log('data.data: ',data.data.data);
		mu.hideLoading()
		// document.querySelector('.manage-user').setAttribute('_echarts_instance_', '')
		// 设置基本的参数
		mu.setOption({
			title: {
				text: '管理与用户对比图',
				// subtext: 'Fake Data',
				left: 'center'
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				padding: [20, 20, 20, 20]
			},
			series: [{
				// name: 'Access From',
				type: 'pie',
				radius: '65%',
				data: data.data.data,
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]
		})
		// 用于echarts响应式
		window.addEventListener('resize', function() {
			mu.resize()
		})
}

const returnUserInfo = async()=>{
    const res = await getUserInfo(localStorage.getItem('account') as unknown as string);
    userData.name = res.data.name;
    userData.sex = res.data.sex;
    userData.sex = res.data.identity;
    userData.department = res.data.department;

}

const productCategoryBar = async()=>{
    const pcb = echarts.init(document.querySelector('.product-category-bar') as HTMLElement)
		pcb.showLoading()
		let data = await getCategoryAndNumber() as any
        data = data.data.data;
        // console.log('data: ',data);
		pcb.hideLoading()
		// document.querySelector('.product-category-bar').setAttribute('_echarts_instance_', '')
		pcb.setOption({
			title: {
				text: "产品类别库存总价图",
				top: "3%",
				textStyle: {
					fontSize: 16
				},
			},
			tooltip: {
				trigger: 'axis',
			},
			xAxis: {
				type: 'category',
				// 食品类，服装类，鞋帽类，日用品类，家具类，家用电器类，纺织品类，五金类
				data: data.category
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				data: data.price,
				type: 'bar',
				barWidth: 40,
				colorBy: "data"
			}, ]
		})
		window.addEventListener('resize', function() {
			pcb.resize()
		})
}

const messageLevel = async()=>{
    const ml = echarts.init(document.querySelector('.massage-level') as HTMLElement)
		ml.showLoading()
		let data = await getLevelAndNumber() as any
        console.log('messageLevel data: ',data);
        data = data.data.data;
        console.log('messageLevel data processed: ',data);

		ml.hideLoading()
		// document.querySelector('.massage-level').setAttribute('_echarts_instance_', '')
		ml.setOption({
			title: {
				text: "公告等级分布图",
				top: "3%",
				textStyle: {
					fontSize: 16
				},
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				top: '5%',
				left: 'center'
			},
			series: [{
				// name: 'Access From',
				type: 'pie',
				radius: ['35%', '65%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2
				},
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 40,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: data,
			}]
		})
		window.addEventListener('resize', function() {
			ml.resize()
		})
}

const messageAllDay = async () => {
const mad = echarts.init(document.querySelector('.login-week') as HTMLElement)
mad.showLoading()
// let data = await getDayAndNumber() as any
let data = {
    week: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    number: [120, 200, 150, 80, 70, 110, 130]
}

mad.hideLoading()
// document.querySelector('.login-week').setAttribute('_echarts_instance_', '')
mad.setOption({
    title: {
        text: "每日登录人数图",
        top: "3%",
        textStyle: {
            fontSize: 16
        },
    },
    tooltip: {
        trigger: 'item'
    },
    xAxis: {
        type: 'category',
        data: data.week
    },
    yAxis: {
        type: 'value',
    },
    series: [{
        data: data.number,
        type: 'line'
    }]
})
window.addEventListener('resize', function() {
    mad.resize()
})
}


returnUserInfo();


</script>




<style scoped>
.overview-wrapped {
    padding: 8px;
    height: calc(100vh - 101px);
    background: #f8f8f8;
}

.overview-wrapped .top-content-wrapped {
    height: 30%;
    display: flex;
}

.overview-wrapped .top-content-wrapped .person-info {
    height: 100%;
    margin-right: 8px;
    width: calc(50% - 8px);
    display: flex;
    background: #fff;
}

.overview-wrapped .top-content-wrapped .person-info .person-avatar-wrapped {
    display: flex;
    width: 50%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.overview-wrapped .top-content-wrapped .person-info .person-avatar-wrapped .company {
    margin: 10px 0;
    font-size: 12px;
}

.overview-wrapped .top-content-wrapped .person-info .person-avatar-wrapped .department {
    margin-top: 8px;
    font-size: 12px;
}

.overview-wrapped .top-content-wrapped .person-info .line-wrapped {
    height: 100%;
    display: flex;
    align-items: center;
}

.overview-wrapped .top-content-wrapped .person-info .line-wrapped .line {
    height: 170px;
    border: 1px solid #D3D3D3;
}

.overview-wrapped .top-content-wrapped .person-info .detail-info-wrapped {
    height: 100%;
    width: calc(50% - 1px);
    margin-left: 50px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

.overview-wrapped .top-content-wrapped .pie {
    width: 50%;
    height: 100%;
    background: #fff;
}

.overview-wrapped .mid-content-wrapped {
    margin-top: 8px;
    height: calc(32% - 8px);
    display: flex;
}

.overview-wrapped .mid-content-wrapped .mid-content-left {
    margin-right: 8px;
    width: calc(60% - 8px);
    background: #fff;
}

.overview-wrapped .mid-content-wrapped .mid-content-right {
    width: 40%;
    background: #fff;
    padding: 8px;
}

.overview-wrapped .mid-content-wrapped .mid-content-right .title {
    font-size: 14px;
    margin-bottom: 8px;
}

.overview-wrapped .mid-content-wrapped .mid-content-right .button-area {
    margin-bottom: 8px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #F5F5F5;
}

.overview-wrapped .mid-content-wrapped .mid-content-right .button-area .button-name {
    margin-top: 10px;
}

.overview-wrapped .mid-content-wrapped .mid-content-right .button-area:hover {
    background: #e4efff;
}

.overview-wrapped .footer-content-wrapped {
    margin-top: 8px;
    height: calc(38% - 8px);
    display: flex;
}

.overview-wrapped .footer-content-wrapped .footer-content-left {
    margin-right: 8px;
    height: 100%;
    width: calc(30% - 8px);
    background: #fff;
}

.overview-wrapped .footer-content-wrapped .footer-content-right {
    height: 100%;
    width: 70%;
    background: #fff;
}


</style>