const db = require('../db/index');
const Companymessage = require("../models/companymessage.js");
const Systemmessage = require("../models/systemmessage.js");



exports.companyMessageList = (req, res) => {
    db(async()=>{
        try{
            const result = await Companymessage.find();
            console.log('find company messages result: ',result);
            res.send(result);
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
}

exports.systemMessageList = (req, res) => {
    db(async()=>{
        try{
            const result = await Systemmessage.find();
            console.log('find system messages result: ',result);
            res.send(result);
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
}