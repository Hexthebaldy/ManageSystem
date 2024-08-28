const express = require('express');
const router = express.Router();
const userinfoHandler = require('../router_handle/userinfo');
const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/upload');
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null,file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({storage:storage});




router.post('/uploadAvatar',upload.single('avatar'), userinfoHandler.uploadAvatar);
router.post('/bindAccount',userinfoHandler.bindAccount);
router.post('/getUserInfo',userinfoHandler.getUserInfo);
router.post('/changeName',userinfoHandler.changeName);
router.post('/changePassword',userinfoHandler.changePassword);
router.post('/changeSex',userinfoHandler.changeSex);
router.post('/changeEmail',userinfoHandler.changeEmail);
router.post('/searchUser',userinfoHandler.searchUser);
router.post('/returnListData',userinfoHandler.returnListData);
router.post('/getAdminListLength',userinfoHandler.getAdminListLength);
router.post('/createAdmin',userinfoHandler.createAdmin);
router.post('/editAdmin',userinfoHandler.editAdmin);
router.post('/changeIdentityToUser',userinfoHandler.changeIdentityToUser);
router.post('/searchUsersByDepatment',userinfoHandler.searchUsersByDepatment);
router.post('/getBanList',userinfoHandler.getBanList);
router.post('/banUser',userinfoHandler.banUser);
router.post('/hotUser',userinfoHandler.hotUser);



module.exports = router


