const db = require("../db/index.js");
const bcrypt = require('bcryptjs');
const saltRounds = 10;
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

//没写
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



// ----------------------------------------用户管理

exports.getAdminList = (req,res)=>{
    db(async()=>{
        try{

        }catch(err){
            
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    })
};


exports.searchUser = async(req, res)=>{
    db(async()=>{
        try{
            const {account} = req.body;
            const result = await User.findOne({account});
            const users = [];
            users.push(result);
            if(users){
                res.send(users);
            }else{
                res.json({
                    state:404,
                    message:'no user found'
                })
                // console.log('no user found');
            }
        }catch(err){
            console.log('searchUser api failed somehow !');
            return res.status(500).send({ status: 1, message: '查询失败', error: err.message });
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.returnListData = (req, res)=>{
    db(async()=>{
        try{
            const {page,identity} = req.body;
            const result = await User.find({identity});

            let arr = [];
            for(let i=0;i<10;i++){
                if(!result[10*(page-1)+i]){
                    break;
                }
                arr.push(result[10*(page-1)+i]);
            }

            if(arr){
                // console.log('sent arr : ',arr);
                res.send(arr);
            }else{
                res.json({
                    state:404,
                    message:'no user found'
                })
                console.log('no user found');
            }
        }catch(err){
            console.log('returnListData api failed somehow !');
            return res.status(500).send({ status: 1, message: '查询失败', error: err.message });
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.getAdminListLength = (req,res)=>{
    db(async()=>{
        try{
            const {identity} = req.body;
            const result = await User.find({identity});
            const length = result.length;
            if(length>-1){
                res.send(length.toString());
            }else{
                res.json({
                    state:404,
                    message:'no user found'
                })
                console.log('no user found');
            }
        }catch(err){
            console.log('getAdminListLength api failed somehow !');
            return res.status(500).send({ status: 1, message: '查询失败', error: err.message });
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};

//添加管理员
exports.createAdmin = (req,res)=>{
    db(async()=>{
        try{
            const {
                account,
                password,
                name,
                sex,
                department,
                email,
                identity
            } = req.body;

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                account,
                password:hashedPassword,
                name,
                sex,
                department,
                email,
                identity
            });

            await newUser.save();
            console.log('added newUser: ',newUser);
            res.status(201).send('管理员添加成功');
        }catch(err){
            console.error('Error during addtion:', err);
            res.status(500).send('服务器错误');
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.editAdmin = (req,res)=>{
    db(async()=>{
        try{
            const {
                account,
                password,
                name,
                sex,
                department,
                email,
                identity
            } = req.body;

            console.log(req.body);
            const data = req.body;

            const updateFields = {};
            for(let key in data){
                if(key !== 'account'){
                    updateFields[key] = data[key];
                }
            }

            const result = await User.findOneAndUpdate(
                {account:account},
                {$set:updateFields},
                { new: true, runValidators: true } 
            );
            res.send('201');
        }catch(err){
            console.error('Error during addtion:', err);
            res.status(500).send('服务器错误');
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    })
}


exports.changeIdentityToUser = (req,res)=>{
    db(async()=>{
        try{
            const {
                account,
            } = req.body;

            const result = await User.findOneAndUpdate(
                {account:account},
                {identity:'用户'},
            );
            console.log('result: ',result);
            res.send('降级成功');
        }catch(err){
            console.error('Error during addtion:', err);
            res.status(500).send('服务器错误');
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    })
}