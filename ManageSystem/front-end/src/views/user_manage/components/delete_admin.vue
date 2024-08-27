<template>
	<el-dialog v-model="dialogFormVisible" title='删除操作' width="30%" center>
		<span v-if="adminId">是否去掉此用户的管理员职位？删除后此用户将重新展现在用户列表中</span>
		<span v-else>请慎重操作，删除后此用户将永久失去登录资格</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="deleteAdmin">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
	import { onBeforeUnmount, ref } from 'vue'
	import {
		bus
	} from "@/utils/mitt"
	import {
		changeIdentityToUser, deleteUser
	} from '@/api/userinfor'
	import { ElMessage, useId } from 'element-plus'
	// import { tracking } from '@/utils/operation'

 const adminId = ref();
 const userid = ref();
 const account = ref();
 const name = ref();
 const dialogFormVisible = ref(false);

 bus.on('deleteId',(account:string)=>{
  adminId.value = account;
 });

 //????
 bus.on('deleteUserId',async(userInfo:any)=>{
    userid.value = userInfo.id;
    account.value = userInfo.account;
    name.value = userInfo.name;

 });




 const deleteAdmin = async()=>{
  if(adminId.value){
    const res = await changeIdentityToUser(adminId.value);
    if(res.status == 200){
      ElMessage({
        message:'降职成功',
        type:'success',
      });

      bus.emit('adminDialogOff',3);
      dialogFormVisible.value = false;
    }
  }else{
    ElMessage.error('降职失败');
    dialogFormVisible.value = false;
  }


 };



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