const db = require("../db/index.js");
const User = require('../models/user.js');
const Product = require('../models/product.js');


exports.getProductLength = (req,res)=>{
    db(async () => {
        try {
            const result = await Product.find();
            res.send(result.length.toString());
        } catch (err) {
            console.log('getProductLength api failed somehow !');
            console.log('err: ',err);

            return res.status(500).send({ status: 1, message: '查询失败', error: err.message });
        }
    }, () => {
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.returnProductListData = (req,res)=>{
    db(async () => {
        try {
            const {page} = req.body;
            // console.log('page: ',page);
            const result = await Product.find({product_out_status:'出库'});
            const currentPage = [];
            for(let i=0;i<10;i++){
                if(i+10*(page-1)>=result.length){
                    break;
                }
                currentPage.push(result[i+10*(page-1)]);
            }
            // console.log('currentPage: ',firstPage)
            res.send(currentPage);
        } catch (err) {
            console.log('getProductLength api failed somehow !');
            console.log('err: ',err);
            return res.status(500).send({ status: 1, message: '查询失败', error: err.message });
        }
    }, () => {
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.returnApplyProductListData = (req,res)=>{
    db(async () => {
        try {
            const {page} = req.body;
            // console.log('page: ',page);
            const result = await Product.find({product_out_status:'申请出库'});
            // console.log('result: ',result);
            const currentPage = [];
            for(let i=0;i<10;i++){
                if(i+10*(page-1)>=result.length){
                    break;
                }
                currentPage.push(result[i+10*(page-1)]);
            }
            // console.log('currentPage: ',currentPage)
            res.send(currentPage);
            
        } catch (err) {
            console.log('getProductLength api failed somehow !');
            console.log('err: ',err);
            return res.status(500).send({ status: 1, message: '查询失败', error: err.message });
        }
    }, () => {
        console.log("db[ManageSystem] connection failed !");
    });
};


exports.createProduct = (req,res)=>{
    db(async () => {
        try {
            const data = req.body;
            console.log('data: ',data);
            const newProduct = new Product(data.data);
            
            console.log('newProduct: ',newProduct);

            newProduct.save();

            res.send('创建成功');
        } catch (err) {
            console.log('createProduct api failed somehow !');
            console.log('err: ',err);
            return res.status(500).send({ status: 1, message: '查询失败', error: err.message });
        }
    }, () => {
        console.log("db[ManageSystem] connection failed !");
    });
};