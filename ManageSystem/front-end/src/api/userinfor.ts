import instance from "@/http";

//获取用户信息
export const getUserInfo = (id:number)=>{
    return instance({
        url:'users/getUsersInfo',
        method:'POST',
        data:{
            id
        }
    })
}