const mongoose = require('mongoose');

// 创建一个图片Schema
const companyInfoSchema = new mongoose.Schema({
    name:{type:String},
    introduction: { type: String },
    strategy:{type: String},
    frame: { type: String },
    leaders: { type: String },

});

// 创建模型
// const CompanyInfo = mongoose.model('companyInfo', companyInfoSchema);
const CompanyInfo = mongoose.model('CompanyInfo', companyInfoSchema, 'companyInfo');


module.exports = CompanyInfo;