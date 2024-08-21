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


module.exports = router


