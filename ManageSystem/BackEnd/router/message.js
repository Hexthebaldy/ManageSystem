// 系统设置模块路由
// 导入express框架
const express = require('express');
// 使用express框架的路由
const router = express.Router();
// 导入set的路由处理模块
const setHandler = require('../router_handle/message.js');


router.post('/companyMessageList',setHandler.companyMessageList);
router.post('/systemMessageList',setHandler.systemMessageList);


module.exports = router;
