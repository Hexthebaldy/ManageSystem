import instance from "@/http";

// 获取产品类别和总价
export const getCategoryAndNumber = () => {
	return instance({
		url: '/ov/getCategoryAndNumber',
		method: 'POST',
	})
}

// 获取不同角色与数量
export const getAdminAndNumber = ()=>{
    return instance({
        url:'/ov/getAdminAndNumber',
        method:'POST',
    })
};

// 获取不同消息等级与数量
export const getLevelAndNumber = () => {
	return instance({
		url: '/ov/getLevelAndNumber',
		method: 'POST',
	})
}

// 返回每天登录人数
export const getDayAndNumber = () => {
	return instance({
		url: '/ov/getDayAndNumber',
		method: 'POST',
	})
}