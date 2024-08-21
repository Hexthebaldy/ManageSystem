const db = require("../db/index.js");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Image = require('../models/image.js')
const path = require('path');
fs = require('fs');


exports.uploadAvatar = async(req,res)=>{
    db(async()=>{
        try{
            if(!req.file){
                return res.status(400).json({message: 'No file upload'});
            }

            res.json({
                message:'File uploaded successfully',
                filePath:`/upload/${req.file.filename}`,
            });
    
        }catch(err){
            return res.status(500).send({status:1,message: '上传失败',error: err.message});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    })
};


exports.bindAccount = async(req,res) => { 
    db(async()=>{
        const {
            account,
            onlyId,
            url,
        } = req.body;
    
        try{
            const result = await Image.findOneAndUpdate({onlyId},{account});

            if(result){
                const userResult = await User.findOneAndUpdate({account},{image_url:url});

                if(userResult){
                    res.send({
                        status:0,
                        message:'修改成功',
                    });
                }else{
                    res.status(404).send({status:1,message:'用户未找到'});
                }
            }else{
                res.status(404).send({ status: 1, message: '图像未找到' });
            }
        }catch(err){
            return res.status(500).send({ status: 1, message: '绑定失败', error: err.message });
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    })
    

}