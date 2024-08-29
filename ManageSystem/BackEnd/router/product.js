// 导入express框架
const express = require('express');
// 使用express框架的路由
const router = express.Router();
// 导入set的路由处理模块
const setHandler = require('../router_handle/product');

router.post('/getProductLength',setHandler.getProductLength);
router.post('/returnProductListData',setHandler.returnProductListData);
router.post('/returnApplyProductListData',setHandler.returnApplyProductListData);
router.post('/createProduct',setHandler.createProduct);
// router.post('/',setHandler);
// router.post('/',setHandler);
// router.post('/',setHandler);
// router.post('/',setHandler);
// router.post('/',setHandler);





module.exports = router
