const express = require('express');
// 使用express框架的路由
const router = express.Router();
// 导入set的路由处理模块
const setHandler = require('../router_handle/file');


router.post('/uploadFile',setHandler.uploadFile);
router.post('/bindFileAndUser',setHandler.bindFileAndUser);
router.post('/deleteFile',setHandler.deleteFile);
router.post('/downloadFile',setHandler.downloadFile);
router.post('/fileList',setHandler.fileList);
router.post('/fileListLength',setHandler.fileListLength);
router.post('/returnFileListData',setHandler.returnFileListData);
router.post('/searchFile',setHandler.searchFile);
router.post('/updateDownload',setHandler.updateDownload);


module.exports = router;
