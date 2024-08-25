const mongoose = require('mongoose');

// 创建一个轮播图的 Schema
const companymessageSchema = new mongoose.Schema({
    message_title: { type: String, required: true },
    message_level: { type: String }, 
    message_publish_department: { type: String },
    message_publish_time:{type:String} 
});

// 创建模型
const Companymessage = mongoose.model('Companymessage', companymessageSchema);

module.exports = Companymessage;
