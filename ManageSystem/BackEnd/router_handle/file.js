const db = require('../db/index');
const Companymessage = require("../models/companymessage.js");


exports.uploadFile = (req, res) => {
    db(async()=>{
        try{
            
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.bindFileAndUser = (req, res) => {
    db(async()=>{
        try{
            
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.updateDownload = (req, res) => {
    db(async()=>{
        try{
            
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};

exports.downloadFile = (req, res) => {
    db(async()=>{
        try{
            
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};

exports.fileList = (req, res) => {
    db(async()=>{
        try{
            
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.fileListLength = (req, res) => {
    db(async()=>{
        try{
            
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.returnFileListData = (req, res) => {
    db(async()=>{
        try{
            
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.searchFile = (req, res) => {
    db(async()=>{
        try{
            
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.deleteFile = (req, res) => {
    db(async()=>{
        try{
            
        }catch(err){
            console.err(err);
            res.status(500).send({message:'Database query failed'});
        }
    },()=>{
        console.log("db[ManageSystem] connection failed !");
    });
};