<template>
    <el-dialog v-model="dialogVisible" :title="title" width="600px" @close="closeDialog">
        <div style="border: 1px solid #ccc">
          <!-- WangEditor 结构 -->
          <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc" />
          <Editor
            v-model="content"
            :editor="editorRef"
            :defaultConfig="editorConfig"
            :mode="mode"
            style="height: 500px; overflow-y: hidden;"
          />
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm">确认</el-button>
          </span>
        </template>
      </el-dialog>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'
import { ref, shallowRef,nextTick,toRaw } from 'vue'
import { Toolbar, Editor } from '@wangeditor/editor-for-vue'
import { ElMessage } from 'element-plus'
import { bus } from "@/utils/mitt.js"
	import { changeCompanyIntroduce, getCompanyIntroduce } from '@/api/setting'

const editorRef = shallowRef()
const title = ref('编辑内容')
let content = ref('<p>输内容啊傻逼...</p>')
const dialogVisible = ref(false)
const mode = ref('default')

const toolbarConfig = {
  excludeKeys: []
}

const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/api/upload',
      fieldName: 'file',
      methods: 'post',
      metaWithUrl: true,
      customInsert(res:any, insertFn:any) {
        insertFn(res.url)
      }
    }
  }
}

bus.on("editorTitle", async (id : number) => {
        let htmlContent = ref('');
		
        if (id == 1) {
			title.value = '编辑公司介绍';
			const result = await getCompanyIntroduce('introduction') ;
            content.value = result.data;
		}
		if (id == 2) {
			title.value = '编辑公司架构';
			const result = await getCompanyIntroduce('frame'); 
            content.value = result.data;
		}
		if (id == 3) {
			title.value = '编辑公司战略';
			const result = await getCompanyIntroduce('strategy');
            content.value = result.data;
             
		}
		if (id == 4) {
			title.value = '编辑高层介绍';
			const result = await getCompanyIntroduce('leaders');
            content.value = result.data;
		}

	})

const openDialog = () => {
  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
}

const cancel = () => {
  ElMessage.error('取消编辑')
  closeDialog()
}

const confirm = () => {
  ElMessage.success('编辑成功')
  closeDialog()
}

defineExpose({
  openDialog
})
</script>

<style scoped>

</style>