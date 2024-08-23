const db = require("../db/index.js");
const CompanyInfo = require("../models/companyInfo.js");
const User = require('../models/user');


exports.getAllSwiper = (req,res)=>{
    db(async()=>{
        try{
            
        }catch(err){

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
            
        }catch(err){

        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};





