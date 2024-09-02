import instance from '@/http/index'

// 登录记录
export const loginLog = (account:number,name:string,email:string) => {
	return instance({
		url: '/llog/loginLog',
		method: 'POST',
		data: {
			account,name,email
		}
	})
}

// 操作记录
export const operationLog = (operation_person:string,operation_content:any,operation_level:string) => {
	return instance({
		url: '/olog/operationLog',
		method: 'POST',
		data: {
			operation_person,operation_content,operation_level
		}
	})
}

// 返回登录日志列表
export const loginLogList = () => {
	return instance({
		url: '/llog/loginLogList',
		method: 'POST',
	})
}

// 返回操作日志列表
export const operationLogList = () => {
	return instance({
		url: '/olog/operationLogList',
		method: 'POST',
	})
}

// 返回最近十条登录日志
export const searchLoginLogList = (account:number) => {
	return instance({
		url: '/llog/searchLoginLogList',
		method: 'POST',
		data: {
			account
		}
	})
}

// 返回最近十条操作日志
export const searchOperationLogList = (operation_person:string) => {
	return instance({
		url: '/olog/searchOperationLogList',
		method: 'POST',
		data: {
			operation_person
		}
	})
}


// 返回登录日志列表的长度
export const loginLogListLength = () => {
	return instance({
		url: '/llog/loginLogListLength',
		method: 'POST',
	})
}

// 返回操作日志列表的长度
export const operationLogListLength = () => {
	return instance({
		url: '/olog/operationLogListLength',
		method: 'POST',
	})
}

// 监听换页返回数据
export const returnLoginListData = (pager:number) => {
	return instance({
		url: '/llog/returnLoginListData',
		method: 'POST',
		data: {
			pager
		}
	})
}

export const returnOperationListData = (pager:number) => {
	return instance({
		url: '/olog/returnOperationListData',
		method: 'POST',
		data: {
			pager
		}
	})
}

// 清空登录日志
export const clearLoginLogList = () => {
	return instance({
		url: '/llog/clearLoginLogList',
		method: 'POST',
	})
}

// 清空操作日志
export const clearOperationLogList = () => {
	return instance({
		url: '/olog/clearOperationLogList',
		method: 'POST',
	})
}
