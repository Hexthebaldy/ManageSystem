import instance from "@/http";

//获取用户信息
export const getUserInfo = (account:string)=>{
    return instance({
        url:'users/getUserInfo',
        method:'POST',
        data:{
            account
        }
    })
};

export const bind = (account:string,url:any)=>{
    return instance({
        url:'users/bindAccount',
        method:'POST',
        data:{
            account,
            url
        }
    })
};

//修改密码
export const changePassword = (id:number,oldPassword:string,newPassword:string)=>{
    return instance({
        url:'/users/changePassword',
        method:'POST',
        data:{
            id,
            oldPassword,
            newPassword
        }
    })
};

//修改姓名
export const changeName = (name:string, account:string)=>{
    return instance({
        url:'/users/changeName',
        method:'POST',
        data:{
            name,
            account
        }
    })
};

//修改性别
export const changeSex = (sex:string,account:string)=>{
    return instance({
        url:'/users/changeSex',
        method:'POST',
        data:{
            sex,
            account
        }
    })
};

export const changeEmail = (email:string,account:string)=>{
    return instance({
        url:'/users/changeEmail',
        method:'POST',
        data:{
            email,
            account
        }
    })
};

//---------------------------------用户管理