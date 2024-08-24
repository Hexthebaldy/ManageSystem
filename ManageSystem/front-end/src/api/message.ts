import instance from '@/http/index'

export const publishMessage = (data:any)=>{
    const {
        message_title,
        ...message_level
    } = data;

    return instance({
        url:'/msg/publishMessage',
        method:'POST',
        data:{
            message_title,
            ...message_level
        }
    })
};

export const companyMessageList = ()=>{
    return instance({
        url:'/msg/companyMessageList',
        method:'POST',
    })
};

export const systemMessageList = (data:any)=>{
    return instance({
        url:'msg/systemMessageList',
        method:'POST'
    })
};