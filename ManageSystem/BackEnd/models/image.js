const mongoose = require('mongoose');

// 创建一个图片Schema
const imageSchema = new mongoose.Schema({
  image_url: { type: String, required: true },
  onlyId: { type: String, required: true },
  account: { type: String }
});

// 创建模型
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;