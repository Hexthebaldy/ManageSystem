import {defineStore} from 'pinia'
import {getUserInfo} from '@/api/userinfor'
import {ref} from 'vue'

export const useUserInfo = defineStore('userinfo',()=>{
    const imageUrl = ref<string>();
    const identity = ref<string>();
    const userInfo = async(id:number)=>{
        const res = await getUserInfo(id) as any;
        imageUrl.value = res.image_url;
        identity.value = res.identity;
    }


    return{
        imageUrl,userInfo,identity
    }
},{
    persist:true
})
