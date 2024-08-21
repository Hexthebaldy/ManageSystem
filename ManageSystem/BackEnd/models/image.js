const mongoose = require('mongoose');

// 创建一个图片Schema
const imageSchema = new mongoose.Schema({
  account: { type: String ,required:true},
  filePath: { type: String, required: true },
});

// 创建模型
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;