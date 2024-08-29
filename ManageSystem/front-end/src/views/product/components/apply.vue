<template>
	<el-dialog v-model="dialogFormVisible" title='申请出库' width="600px" align-center draggable>
			<div class="product-name">您申请出库的产品是:&nbsp;&nbsp;{{formDataInfo.product_name}}</div>
			<div class="product-name">该产品的库存还有:&nbsp;&nbsp;{{ formDataInfo.product_in_warehouse_number }}</div>
			<div class="dialog-content">
				<el-form ref="ruleFormRef" :model="formDataInfo" :label-position="labelPosition" :rules="rules"
					label-width="120px">
					<el-form-item label="申请出库编号" prop="product_out_id">
						<el-input v-model="formDataInfo.product_out_id" />
					</el-form-item>
					<el-form-item label="出库数量" prop="product_out_number">
						<el-input v-model="formDataInfo.product_out_number" />
					</el-form-item>
          <el-form-item label="出库申请人" prop="product_out_apply_person">
            <el-input v-model="formDataInfo.product_out_apply_person" disabled/>
          </el-form-item>
					<el-form-item label="产品单价" prop="product_single_price">
						<el-input v-model="formDataInfo.product_single_price" disabled/>
					</el-form-item>
					<el-form-item label="申请出库备注" prop="apply_memo">
						<el-input v-model="formDataInfo.apply_memo" :rows="2" type="textarea" />
					</el-form-item>
				</el-form>
			</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="addProduct" >
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
	import { reactive, ref,onBeforeUnmount } from 'vue'
	import { applyOutProduct } from '@/api/product'
	import { ElMessage } from 'element-plus'
  import type { FormProps } from 'element-plus'
	import {
		bus
	} from "@/utils/mitt"


	interface FormData {
		id : string|null,
		product_name: string,
		product_out_id : string|null,
		product_in_warehouse_number : number|null,
		product_single_price:number|null,
		product_out_number : number|null,
		product_out_apply_person : string|null,
		apply_memo : string,
	}

	// 弹窗开关
	const dialogFormVisible = ref(false)
	const labelPosition = ref<FormProps['labelPosition']>('left')
	const formDataInfo : FormData = reactive({
		id: null,
		product_name:'',
		product_out_id: null,
		product_in_warehouse_number:null,
		product_single_price:null,
		product_out_number: null,
		product_out_apply_person: localStorage.getItem('name'),
		apply_memo: ''
	})
	const rules = reactive({
		product_out_id: [
			{ required: true, message: '请输入申请出库编号', trigger: 'blur' },
		],
		product_out_number: [
			{ required: true, message: '请输入申请出库数量', trigger: 'blur' },
		],
		product_out_apply_person: [
			{ required: true, message: '请输入申请人', trigger: 'blur' },
		],
	})

	bus.on('applyId', (row : any) => {
		formDataInfo.id = row.id;
		formDataInfo.product_in_warehouse_number = row.product_in_warehouse_number;
		formDataInfo.product_name = row.product_name;
		formDataInfo.product_single_price = row.product_single_price;
    formDataInfo.product_out_number = 0;
		formDataInfo.product_out_id = '';
	})



	const emit = defineEmits(['success'])
	// 产品出库
	const addProduct = async () => {
		const res = await applyOutProduct(formDataInfo) as any
		if (res.status == 0) {
			ElMessage({
				message: '产品申请出库成功',
				type: 'success',
			})
			emit('success')
			dialogFormVisible.value = false
		} else {
			ElMessage.error('产品申请出库失败')
			dialogFormVisible.value = false
		}
	}


	// 打开创建管理员的弹窗
	const open = () => {
		dialogFormVisible.value = true
	}


	defineExpose({
		open
	})

	onBeforeUnmount(() => {
		bus.all.clear()
	})
</script>

<style  scoped>
	.dialog-content {
		display: flex;
		padding: 0 30px 20px 30px;
	}

	.product-name {
		display: flex;
		justify-content: center;
		font-size: 16px;
		margin: 10px;
		color: #333;
	}

	:deep(.el-form-item) {
		margin: 30px;
	}
</style>
