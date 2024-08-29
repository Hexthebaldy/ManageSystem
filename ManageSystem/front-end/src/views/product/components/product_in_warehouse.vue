<template>
  <el-dialog v-model="dialogFormVisible" title='添加产品入库' width="600px" align-center draggable>
    <div class="dialog-content">
      <el-form ref="ruleFormRef" :model="formDataInfo" :label-position="labelPosition" :rules="rules"
        label-width="120px">
        <el-form-item label="入库编号" prop="product_id">
          <el-input v-model="formDataInfo.product_id" />
        </el-form-item>
        <el-form-item label="产品名称" prop="product_name">
          <el-input v-model="formDataInfo.product_name" />
        </el-form-item>
        <el-form-item label="产品类别" prop="product_category">
          <el-select v-model="formDataInfo.product_category" placeholder="请选择产品类别">
            <el-option v-for="item in categoryData" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品单位" prop="product_unit">
          <el-select v-model="formDataInfo.product_unit" placeholder="请选择产品单位">
            <el-option label="个" value="个" />
            <el-option label="件" value="件" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品入库数量" prop="product_in_warehouse_number">
          <el-input v-model="formDataInfo.product_in_warehouse_number" />
        </el-form-item>
        <el-form-item label="产品入库单价" prop="product_single_price">
          <el-input v-model="formDataInfo.product_single_price" />
        </el-form-item>
        <el-form-item label="入库操作人" prop="product_create_person">
          <el-input v-model="formDataInfo.product_create_person" />
        </el-form-item>
        <el-form-item label="入库备注" prop="in_memo">
          <el-input v-model="formDataInfo.in_memo" :rows="2" type="textarea" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="add">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { createProduct } from '@/api/product'
import { ElMessage } from 'element-plus'
import type { FormProps } from 'element-plus'
import {
  getProduct
} from '@/api/setting'



interface formData {
  product_id: string | null,
  product_name: string,
  product_category: string,
  product_unit: string,
  product_in_warehouse_number: number | null,
  product_single_price: number | null,
  product_create_person: string,
  in_memo: string
}


// 弹窗开关
const labelPosition = ref<FormProps['labelPosition']>('left');
const dialogFormVisible = ref(false);
const categoryData = ref<string[]>([])
const formDataInfo: formData = reactive({
  product_id: null,
  product_name: '',
  product_category: '',
  product_unit: '',
  product_in_warehouse_number: null,
  product_single_price: null,
  product_create_person: '',
  in_memo: ''
})
const rules = reactive({
  product_id: [
    { required: true, message: '请输入入库编号', trigger: 'blur' },
  ],
  product_name: [
    { required: true, message: '请输入产品名称', trigger: 'blur' },
  ],
  product_category: [
    { required: true, message: '请选择产品类别', trigger: 'blur' },
  ],
  product_unit: [
    { required: true, message: '请选择产品单位', trigger: 'blur' },
  ],
  product_in_warehouse_number: [
    { required: true, message: '请输入产品入库数量', trigger: 'blur' },
  ],
  product_single_price: [
    { required: true, message: '请输入产品入库单价', trigger: 'blur' },
  ],
  product_create_person: [
    { required: true, message: '请输入入库操作人', trigger: 'blur' },
  ],
})


const emit = defineEmits(['success']);

const add = async()=>{
  const res = await createProduct(formDataInfo) as any;
  if(res.status == 200){
    ElMessage({
				message: '产品入库成功',
				type: 'success',
			})
			emit('success');
			dialogFormVisible.value = false
  }else{
    ElMessage.error('产品入库失败');
    dialogFormVisible.value = false;
  }
}

const open = ()=>{
  dialogFormVisible.value = true;
}



defineExpose({
  open
})
</script>

<style scoped>
.dialog-content {
  display: flex;
  padding: 20px 30px;
}

:deep(.el-form-item) {
  margin: 30px;
}
</style>