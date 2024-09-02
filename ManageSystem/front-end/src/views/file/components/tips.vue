<template>
	<el-dialog v-model="dialogFormVisible" title='删除文件' width="30%" center>
		<span>请慎重操作！您确定要真正删除这个文件吗？</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="operationFiles">
					删除
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
	import {
		bus
	} from "@/utils/mitt.js"
	import {
    deleteFile
	} from '@/api/file'
	import { ElMessage } from 'element-plus'


const dialogFormVisible = ref(false);
const title = ref<string>();
const fileId = ref<number>();
const fileName = ref<string>();
const emit = defineEmits(['success']);

const operationFiles = async()=>{
    const res = await deleteFile(fileId.value as number,fileName.value as string);
    if(res.status == 200){
        ElMessage({
            message:'删除文件成功',
            type:'success',
        });
        dialogFormVisible.value = false;
    }else{
        ElMessage.error('删除文件失败');
        dialogFormVisible.value = false;
    }


}

const open = ()=>{
    dialogFormVisible.value = true;
};

defineExpose({
    open
});

onBeforeUnmount(()=>{
    bus.all.clear();
})
</script>

<style scoped>

</style>