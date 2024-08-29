// 导入数据库操作模块
const db = require('../db/index')
// const moment = require('moment')
const { func } = require('joi')
const ProductType = require('../models/producttype');
const Companymessage = require('../models/companymessage')

// 获取产品类别和总价
exports.getCategoryAndNumber = (req, res) => {
    db(async()=>{
        try{
            const result = await ProductType.find();
            const data2 = result.data;
            const data = {
                category: [],
                price: []
            };

            for(let i=0 ;i<result.length;i++){
                data['category'][i] = result[i]['category'];
                data['price'][i] = result[i]['price'];
            }
            
            // console.log('send data: ',data);
            res.send({
                data:data
            })
        }catch(err){
            console.log(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
}

// 获取不同角色与数量
exports.getAdminAndNumber = (req,res) =>{
    db(async()=>{
        try{
            const data = [{
                value:1,
                name:'超级管理员'
            },
            {
                value:2,
                name:'产品管理员'
            },
            {
                value:3,
                name:'用户管理员'
            },
            {
                value:4,
                name:'消息管理员'
            },
            {
                value:5,
                name:'用户'
            }
            ]
            // console.log('send data: ',data);
            res.send({
                data:data
            })
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });	
}

// 获取不同消息等级与数量
exports.getLevelAndNumber = (req,res) =>{
	db(async()=>{
        try{
            const data = [{
                "name": "一般",    // 公告等级名称
                "value": 0        // 对应的数量
            },
            {
                "name": "重要",
                "value": 0
            },
            {
                "name": "必要",
                "value": 0
            }];
            const result = await Companymessage.find();
            for(let i=0;i<result.length;i++){
                if(result[i]['message_level'] == '重要'){
                    data[1].value++;
                }else if(result[i]['message_level'] == '一般'){
                    data[0].value++;
                }else{
                    data[2].value++;
                }
            }

            console.log('send data: ',data);
            res.send({
                data:data
            })
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });	
}