<template>
	<breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
	<!-- 首页外壳 -->
	<div class="home-wrapped">
		<!-- 轮播图外壳 -->
		<div class="swiper-wrapped">
			<el-carousel :interval="4000" indicator-position="outside" type="card" height="320px">
				<el-carousel-item v-for="(item,index) in imageUrl" :key="index">
					<img :src="item" class="swiper" alt=""/>
				</el-carousel-item>
			</el-carousel>
		</div>
		<!-- 栅格布局外壳 -->
		<div class="layout-wrapped">
			<el-row :gutter="20">
				<el-col :span="6" v-for="(item,index) in companyIntroduce" :key='index'   @click="openIntroduce(index+1)">
					<div class="company-message-area">
						<span>{{item.set_name}}</span>
						<div v-html='item.set_text' class="company-introduce"></div>
					</div>
				</el-col>
			</el-row>
		</div>
		<!-- 表格外壳 -->
		<div class="two-table-wrapped">
			<!-- 公司公告 -->
			<div class="company-notice">
				<span class="title">公司公告</span>
				<el-table :data="companyData" style="width: 100%" :show-header='false' @row-dblclick="openCompany">
					<el-table-column prop="message_title" label="公告主题">
						<template #default='{row}'>
							<div class="message_title">{{row.message_title}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="message_level" label="等级">
						<template #default='{row}'>
							<el-tag class="mx-1" round v-if="row.message_level=='一般'">{{row.message_level}}</el-tag>
							<el-tag type="warning" class="mx-1" round
								v-if="row.message_level=='重要'">{{row.message_level}}</el-tag>
							<el-tag type="danger" class="mx-1" round
								v-if="row.message_level=='必要'">{{row.message_level}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="message_publish_department" label="发布部门" />
					<el-table-column prop="message_publish_time" label="发布时间" width="200">
						<template #default="{row}">
							<div>{{row.message_publish_time?.slice(0,10)}}</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 系统消息 -->
			<div class="system-message">
				<span class="title">系统消息</span>
				<el-table :data="systemData" style="width: 100%" :show-header='false' @row-dblclick="openSystem">
					<el-table-column prop="message_title" label="公告主题"  />
					<el-table-column prop="message_publish_time" label="发布时间" width="200">
						<template #default="{row}">
							<div>{{row.message_publish_time?.slice(0,10)}}</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

	</div>
	<introduce ref="intro"></introduce>
	<bulletin ref="bulletinDom"></bulletin>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import breadCrumb from '@/components/bread_crumb.vue'
	import { getAllSwiper, getCompanyIntroduce } from '@/api/setting'
	import { bus } from "@/utils/mitt.js"
	import { companyMessageList,systemMessageList} from '../../api/message'
  // import introduce from './components/introduce.vue'
  // import bulletin from '@/components/common_msg.vue'


  interface CompanyDataType {
    id:number;
    set_name:string;
    set_value:string|null;
    set_text:any;
  }

  const breadcrumb = ref();
  const item = ref({
    first:'首页'
  });
  const companyData = ref();
  const systemData = ref();
  const imageUrl = ref([]);
  const companyIntroduce = ref<CompanyDataType[]>([]);




  const allSwiper = async()=>{
    const result = await getAllSwiper() as any;
    const swipersData = result.data;
    console.log('swiperData: ',swipersData);
    for(let i=0;i<swipersData.length;i++){
      imageUrl.value.push('http://127.0.0.1:3007'+swipersData[i]['imageUrl'] as never)
    }
    console.log('imageUrl: ',imageUrl);
  };

  allSwiper();

  const getMessageList = async()=>{
    companyData.value = await companyMessageList();
  }

  const openIntroduce = async(id:number)=>{

  };

  const openCompany = async()=>{

  };

  const openSystem = async()=>{

  };

</script>

<style scoped>

</style>