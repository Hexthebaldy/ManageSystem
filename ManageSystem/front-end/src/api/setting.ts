import instance from "@/http";

//获取所有轮播图
export const getAllSwiper = ()=>{
    return instance({
        url:'/set/getAllSwiper',
        method:'POST',
    })
};

//获取公司名称
export const getCompanyName = ()=>{
    return instance({
        url:'',
        method:'POST',
    });
};

//修改公司名称
export const changeCompanyName = (set_value:any)=>{
    return instance({
        url:'',
        method:'POST',
        data:{
            set_value
        }
    });
};

//获取公司介绍
export const getCompanyIntroduce = (set_name:string)=>{
    return instance({
        url:'',
        method:'POST',
        data:{
            set_name,
        }
    });
};

//编辑公司介绍的接口
export const changeCompanyIntroduce = (set_text:any,set_name:string)=>{
    return instance({
        url:'',
        method:'POST',
        data:{
            set_text,
            set_name
        }
    });
};

//获取所有公司介绍
export const getAllCompanyIntroduce = ()=>{
    return instance({
        url:'',
        method:'POST',
  
    });
};

//部门设置
export const setDepartment = (data:any)=>{
    return instance({
        url:'',
        method:'POST',
        data:{
            set_value:data
        }
    });
};

//产品设置
export const setProduct = (data:any)=>{
    return instance({
        url:'',
        method:'POST',
        data:{
            set_value:data
        }
    })
}

//获取产品
export const getProduct = ()=>{
    return instance({
        url:'',
        method:'POST'
    })
}