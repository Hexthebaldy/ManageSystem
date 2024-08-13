import instance from '@/http/index'

export const loginLog = (account:number,name:string,email:string)=>{
    return instance({
        url:'/llog/loginLog',
        method:'POST',
        data:{
            account,
            name,
            email
        }
    })
}