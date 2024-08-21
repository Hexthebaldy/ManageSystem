const db = require("../db/index.js");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user.js');
const Image = require('../models/image.js');
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
            console.log('new avatar uploaded, url: ',`/upload/${req.file.filename}`);
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
            url,
        } = req.body;
    
        try{            
            const result = await Image.findOne({account});

            if(result){
                //修改头像
                const updateOneResult = await Image.updateOne({filePath:url});
                console.log('update one result: ',updateOneResult);
                res.json({
                    state:200,
                    message:'avatar updated',
                    filePath:url
                })
            }else{
                //创建新的 【用户-头像url】 记录
                const newAvatar = new Image({
                    account:account,
                    filePath:url,
                });
                console.log('new Avatar: ',newAvatar);
                await newAvatar.save();
                res.json({
                    state:200,
                    message:'new User-Avatar record created',
                    filePath:url
                })
            }
        }catch(err){
            console.log('bindAccount api failed somehow !');
            return res.status(500).send({ status: 1, message: '绑定失败', error: err.message });
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    })
};


exports.getUserInfo = (req,res)=>{
    db(async()=>{
        try{
            const {account} = req.body;
            const result = await User.findOne({account});
            if(result){
                res.send(result);
            }else{
                res.json({
                    state:404,
                    message:'no user found'
                })
                console.log('no user found');
            }
        }catch(err){
            console.log('getUserInfo api failed somehow !');
            return res.status(500).send({ status: 1, message: '查询失败', error: err.message });
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.changePassword = (req,res)=>{
    db(async()=>{
        try{
            
        }catch(err){

        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.changeName = (req,res)=>{
    db(async()=>{
        try{
            const {account,name} = req.body;
            const updateOneResult = await User.updateOne({account:account},{name:name});
            res.json({
                state:200,
                message:'修改姓名成功'
            })
        }catch(err){
            return res.status(500).send({ status: 1, message: '修改姓名失败', error: err.message });
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.changeSex = (req,res)=>{
    db(async()=>{
        try{
            const {account,sex} = req.body;
            const updateOneResult = await User.updateOne({account:account},{sex:sex});
            res.json({
                state:200,
                message:'修改性别成功'
            })
        }catch(err){
            return res.status(500).send({ status: 1, message: '修改性别失败', error: err.message });
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.changeEmail = (req,res)=>{
    db(async()=>{
        try{
            const {account,email} = req.body;
            const updateOneResult = await User.updateOne({account:account},{email:email});
            res.json({
                state:200,
                message:'修改邮箱成功'
            })
        }catch(err){
            return res.status(500).send({ status: 1, message: '修改邮箱失败', error: err.message });
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.createAdmin = (req,res)=>{
    db(async()=>{
        try{
            
        }catch(err){

        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};
