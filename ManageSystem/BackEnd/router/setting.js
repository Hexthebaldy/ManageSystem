// 系统设置模块路由
// 导入express框架
const express = require('express');
// 使用express框架的路由
const router = express.Router();
// 导入set的路由处理模块
const setHandler = require('../router_handle/setting');

router.post('/uploadSwiper',setHandler.uploadSwiper);
router.post('/getAllSwiper',setHandler.getAllSwiper);
router.post('/getCompanyName',setHandler.getCompanyName);
router.post('/changeCompanyName',setHandler.changeCompanyName);
router.post('/getCompanyIntroduce',setHandler.getCompanyIntroduce);
router.post('/changeCompanyIntroduce',setHandler.changeCompanyIntroduce);

module.exports = router;
