const mongoose = require('mongoose');

// 创建一个轮播图的 Schema
const productSchema = new mongoose.Schema({
    category: { type: String, required: true }, // 图片的 URL
    price: { type: String }, // 可选：图片的描述
});

// 创建模型
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
