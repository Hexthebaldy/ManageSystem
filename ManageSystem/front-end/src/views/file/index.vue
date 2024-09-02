<template>
    <breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
    <div class="table-wrapped">
        <div class="table-top">
            <div class="table-header">
                <div></div>
                <div class="upload-wrapped">
                    <el-upload v-model:file-list="fileList" class="upload-demo" :action="baseUrl" multiple :limit='3'
                        :on-exceed='handleExceed' :on-success="handleSuccess" :show-file-list='false'>
                        <el-button type="primary">上传文件</el-button>
                    </el-upload>
                </div>
            </div>
            <div class="table-content">
                <el-table :data='tableData' style="width: 100%;">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="file_name" label="文件名" />
                    <el-table-column prop="file_size" label="文件大小">
                        <template #default="{ row }">
                            <div>{{ row.file_size?.slice(0, 2) }}KB</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="upload_person" label="上传者" />
                    <el-table-column prop="download_number" label="下载次数" />
                    <el-table-column prop="upload_time" label="上传时间" width="200">
                        <template #default="{ row }">
                            <div>{{ row.upload_time?.slice(0, 10) }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="200" fixed="right">
                        <template #default="{ row }">
                            <div>
                                <el-button type="success">
                                    <template #default>
                                        <a :href="row.file_url"
                                            @click="changeClick(row.download_number, row.id)">下载文件</a>
                                    </template>
                                </el-button>
                                <el-button type="danger" @click="deleteFile(row)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="table-footer">
            <el-pagination :page-size="1" :current-page="paginationData.fileCurrentPage" :pager-count="7"
                :total="paginationData.fileTotal" :page-count="paginationData.filePageCount"
                @current-change="fileCurrentChange" layout="prev, pager, next" />
        </div>
    </div>
    <tips ref="tip" @success='getFileFirstPageList'></tips>
</template>

<script setup lang="ts">
import {
    ref,
    reactive
} from 'vue'
// import tips from './components/tips.vue'
import breadCrumb from '@/components/bread_crumb.vue'
import {
    bindFileAndUser,
    fileListLength,
    returnFilesListData,
    updateDownload
} from '../../api/file'
import type {
    UploadUserFile
} from 'element-plus'
import {
    ElMessage
} from 'element-plus'
import {
    bus
} from "@/utils/mitt"
// 面包屑
const breadcrumb = ref();
// 面包屑参数
const item = ref({
    first: '文件管理',
    second: ''
});
const baseUrl = ref('http://127.0.0.1:3007');
const fileList = ref<UploadUserFile[]>([]);
const tableData = ref<any[]>([]);
const paginationData = reactive({
    // 文件总数
    fileTotal: 1,
    // 文件列表总页数
    filePageCount: 1,
    // 文件列表当前所处页数
    fileCurrentPage: 1,
});
const tip = ref();


//文件数量限制回调
const handleExceed = () => {
    ElMessage.warning('最多上传三个文件！');
};

const handleSuccess = (response: any) => {
    if (response.status == 200) {
        (async () => {
            let name: string | null = localStorage.getItem('name');
            await bindFileAndUser(name as string, response.url);
        })();
    }
};

const getFileListLength = async () => {
    const res = await fileListLength() as any;
    paginationData.fileTotal = res.length
    paginationData.filePageCount = Math.ceil(res.length / 10)
};

const getFileFirstPageList = async () => {
    const res = await returnFilesListData(1) as any
    tableData.value = res.data;
};

// 文件列表监听换页
const fileCurrentChange = async (value: number) => {
    paginationData.fileCurrentPage = value
    const res = await returnFilesListData(paginationData.fileCurrentPage) as any
    tableData.value = res.data;
};

//更新点击率
const changeClick = async (download_number: number, id: number) => {
    await updateDownload(download_number, id);
};

const deleteFile = (row: any) => {
    bus.emit('deleteFile', row);
    tip.value.open();
};



</script>

<style scoped>
:deep(.el-table .cell) {
    font-weight: 400;
}

a {
    color: #fff;
    display: block;
    text-decoration: none;
}
</style>