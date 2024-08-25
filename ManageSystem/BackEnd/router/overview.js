// 系统改了模块路由
// 导入express框架
const express = require('express')
// 使用express框架的路由
const router = express.Router()
// 导入login的路由处理模块
const overviewHandler = require('../router_handle/overview.js')

// 获取产品类别和总价
router.post('/getCategoryAndNumber', overviewHandler.getCategoryAndNumber)
// 获取不同角色与数量
router.post('/getAdminAndNumber', overviewHandler.getAdminAndNumber)
// 获取不同消息等级与数量
router.post('/getLevelAndNumber', overviewHandler.getLevelAndNumber)
// 返回每天登录人数
// router.post('/getDayAndNumber', overviewHandler.getDayAndNumber)

// 向外暴露路由
module.exports = router