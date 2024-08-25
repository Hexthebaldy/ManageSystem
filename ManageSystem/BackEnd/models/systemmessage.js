const mongoose = require('mongoose');

// 创建一个轮播图的 Schema
const systemmessageSchema = new mongoose.Schema({
    message_title: { type: String, required: true },
    message_publish_time:{type:String} 
});

// 创建模型
const Systemmessage = mongoose.model('Systemmessage', systemmessageSchema);

module.exports = Systemmessage;
