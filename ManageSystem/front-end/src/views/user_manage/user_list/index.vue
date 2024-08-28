<template>
  <breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
	<div class="table-wrapped">
		<!-- 顶部 -->
		<div class="table-top">
			<!-- 表格顶部 -->
			<div class="table-header">
				<!-- 搜索框 -->
				<div class="left-wrapped">
					<div class="search-wrapped">
						<el-input v-model="adminAccount" class="w-50 m-2" size="large" placeholder="输入账号进行搜索"
							 @change='searchUserByAccount()' >
              <template #prefix>
                <Search />
              </template>
            </el-input>
					</div>
					<div class="select-wrapped">
						<el-select v-model="department" placeholder="请选择部门" clearable @change="searchForDepartment"
							@clear="clearOperation">
							<el-option v-for="item in departmentData" :key="item" :label="item" :value="item" />
						</el-select>
					</div>
				</div>
				<div class="button-wrapped">
					<el-button plain type="primary" @click="banUserList">筛选冻结用户</el-button>
					<el-button plain type="primary" @click="getFirstPageList">显示全部用户</el-button>
				</div>
			</div>
			<!-- 表格内容 -->
			<div class="table-content">
				<el-table :data="tableData" style="width: 100%" border @row-dblclick='openUser'>
					<el-table-column type="index" width="50" />
					<el-table-column prop="account" label="账号" />
					<el-table-column prop="name" label="姓名" />
					<el-table-column prop="sex" label="性别" />
					<el-table-column prop="department" label="部门" />
					<el-table-column prop="email" label="邮箱" />
					<el-table-column prop="status" label="状态">
						<template #default="{row}">
							<div>
								<el-tag v-if="row.status==='0'" class="ml-2">冻结</el-tag>
								<el-tag class="ml-2" type="success" v-else>正常</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="create_time" label="创建时间">
						<template #default="{row}">
							<div>{{row.create_time?.slice(0,10)}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="update_time" label="更新时间">
						<template #default="{row}">
							<div>{{row.update_time?.slice(0,10)}}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template #default="{row}">
							<div>
								<el-button type="primary" @click="banUserById(row.account)"
									:disabled='row.status==0'>冻结</el-button>
								<el-button type="success" @click="hotUserById(row.account)"
									:disabled='row.status==1'>解冻</el-button>
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
	<userinfo ref="user_info"></userinfo>
</template>

<script setup lang="ts">
import {
		ref, reactive,onBeforeUnmount
	} from 'vue'
	import { Search } from '@element-plus/icons-vue'
	import breadCrumb from '@/components/bread_crumb.vue'
	import userinfo from '../components/user_infor.vue'
	import {
		bus
	} from "@/utils/mitt"
	import {
		searchUser, searchDepartment,
		getAdminListLength, returnListData, getBanList, banUser, hotUser
	} from '@/api/userinfor.js'
	import { ElMessage, paginationEmits } from 'element-plus'

  // 面包屑
	const breadcrumb = ref();
	// 面包屑参数
	const item = ref({
		first: '用户管理',
		second:'用户列表'
	});
	// 搜索框的modelValue
	const adminAccount = ref<string>();
  const departmentData = ref(['ceo','dev']);
	// 表格内容
	const tableData = ref<object[]>([]);
  const adminTotal = ref<number>(0);
  const user_info = ref();
  const department = ref();
  const paginationData = reactive({
    pageCount:1,
    currentPage:1,
  });

  const searchUserByAccount = async()=>{
    const result = await searchUser(adminAccount.value as string);
    tableData.value = result.data;
  };

  const clearOperation = ()=>{
    getFirstPageList();
  };

  const searchForDepartment = async()=>{
    const result = await searchDepartment(department.value) as any;
    tableData.value = result.data;
  };

  const returnAdminListLength = async()=>{
    const result = await getAdminListLength('用户') as any;
    const res = result.data;
    adminTotal.value = res.length;
    paginationData.pageCount = res;
  };

  const getFirstPageList = async()=>{
    const result = await returnListData(1,'用户') as any;
    tableData.value = result.data;
  };

  const currentChange = async(value:number)=>{
    paginationData.currentPage = value;
    const result = await returnListData(value,'用户') as any;
    tableData.value = result.data;
  };

  //筛选冻结用户
  const banUserList = async()=>{
    const result = await getBanList() as any;
    tableData.value = result.data;
  }

  const banUserById = async(account:string)=>{
    const result = await banUser(account);
    if(result.status == 200){
      ElMessage({
				message: '冻结用户成功',
				type: 'success',
			});
      const result = await returnListData(paginationData.currentPage,'用户') as any;
      tableData.value = result.data;
    }else{
      ElMessage.error('冻结用户失败');
    }
  };

  const hotUserById = async(account:string)=>{
    const res = await hotUser(account);
    if (res.status == 200) {
			ElMessage({
				message: '解冻用户成功',
				type: 'success',
			})
			const result = await returnListData(paginationData.currentPage, '用户') as any
      tableData.value = result.data;
		} else {
			ElMessage.error('解冻用户失败')
		}
  }

  const openUser = (row:any)=>{
    
  };




  returnAdminListLength();
  getFirstPageList();



  onBeforeUnmount(()=>{
    bus.all.clear();
  })
</script>

<style scoped>

</style>