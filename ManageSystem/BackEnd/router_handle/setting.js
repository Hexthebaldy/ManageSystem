const db = require("../db/index.js");
const CompanyInfo = require("../models/companyInfo.js");
const User = require('../models/user.js');
const Swiper = require('../models/swiper.js')

exports.getAllSwiper = (req,res)=>{
    db(async()=>{
        try{
            const result = await Swiper.find();
            console.log('find swipers result: ',result);
            res.send(result);
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.uploadSwiper = (req,res)=>{
    db(async()=>{
        try{
            

        }catch(err){

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


exports.getCompanyName = (req,res)=>{
    db(async()=>{
        try{
            
        }catch(err){

        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.changeCompanyName = (req,res)=>{
    db(async()=>{
        try{

        }catch(err){

        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.getCompanyIntroduce = (req,res)=>{
    db(async()=>{
        try{
            const {set_name} = req.body;
            const result = await CompanyInfo.findOne();            
            if (result && set_name in result) {
                const introduction = result[set_name];
                res.send(introduction);
                console.log('introduction: ',introduction);
            } else {
                res.status(407).send({ message: 'Field not found or document is empty' });
            }

        }catch(err){
            console.error(err);
            res.status(500).send({ message: 'Database query failed' });
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.changeCompanyIntroduce = (req,res)=>{
    db(async()=>{
        try{
            let {set_text,set_name} = req.body;
            console.log('set_name: ',set_name);
            console.log('set_text: ',set_text);
            
            if (set_name === '编辑公司介绍') {
                set_name = 'introduction';
            } else if (set_name === '编辑公司架构') {
                set_name = 'frame';
            } else if (set_name === '编辑公司战略') {
                set_name = 'strategy';
            } else if (set_name === '编辑高层介绍') {
                set_name = 'leaders';
            }

            const updateObj = {[set_name]:set_text};

            const result = await CompanyInfo.updateOne({name:'GGG'},{$set:updateObj});
        }catch(err){
            console.error(err);
            res.status(500).send({ message: 'Database query failed' });
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};





