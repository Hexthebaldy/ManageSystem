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
import { ref, shallowRef } from 'vue'
import { Toolbar, Editor } from '@wangeditor/editor-for-vue'
import { ElMessage } from 'element-plus'

const editorRef = shallowRef()
const title = ref('编辑内容')
const content = ref('<p>请输入内容...</p>')
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