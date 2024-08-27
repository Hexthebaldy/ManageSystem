import{bus} from '@/utils/mitt'
import {ref,reactive,watch} from "vue";
import { searchUser, getAdminListLength, returnListData } from '@/api/userinfor'


export const useTable = (identity:string)=>{
    //分页数据
    const paginationData = reactive({
        pageCount:1,
        currentPage:1,
    });
    const adminTotal = ref<number>(0);
    // 搜索框的modelValue
    const adminAccount = ref<string>('');
    const tableData = ref<object[]>([]);


    //返回管理员列表长度
    const returnAdminListLength = async()=>{
        const res = await getAdminListLength(identity) as any;
        adminTotal.value = res-0;
        paginationData.pageCount = Math.ceil(res/10);
    };

    //获取第一页的数据
    const getFirstPageList = async()=>{
        const result = await returnListData(1,identity) as any ;
        tableData.value = result.data;
    };

    //监听换页
    const currentChange = async(value:number)=>{
        paginationData.currentPage = value; 
        const result = await returnListData(paginationData.currentPage,identity) as any;       
        tableData.value = result.data;
    };

    //通过账号搜索管理员
    const searchAdmin = async()=>{
        const result = await searchUser(adminAccount.value as string) as any
        console.log('searchAdmin result: ',result);
        tableData.value = result.data;
        console.log('tableData.value: ',tableData.value);
    };

    const clearInput = async()=>{
        const result = await returnListData(paginationData.currentPage,identity) as any;
        tableData.value = result.data;
    };

    bus.on('adminDialogOff',async(id:number)=>{
        const current = paginationData.currentPage;
        if(id==1){
            await getFirstPageList();
        }
        if(id==2){
            tableData.value = await returnListData(paginationData.currentPage,identity) as any;
        }
        if(id==3){
            tableData.value = await returnListData(paginationData.currentPage,identity) as any;
            if(tableData.value.length == 0){
                paginationData.currentPage = current - 1;
                await returnAdminListLength(); 
            }
        }
    });

    watch(paginationData,()=>{
          returnAdminListLength();
          getFirstPageList();
        },
        {immediate:true,deep:true}
    );

    watch(
        ()=>paginationData.currentPage,
        ()=>{
            currentChange(paginationData.currentPage);
        },
        {immediate:true,deep:true}
    )

    watch(adminTotal,()=>{
        returnAdminListLength();
    },{immediate:true,deep:true});
    

    return{
        adminAccount,
        paginationData,
        adminTotal,
        tableData,
        currentChange,
        searchAdmin,
        clearInput,
    }
}