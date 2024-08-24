const mongoose = require('mongoose');

// 创建一个轮播图的 Schema
const swiperSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true }, // 图片的 URL
    description: { type: String }, // 可选：图片的描述
    order: { type: Number } // 可选：图片的顺序
});

// 创建模型
const Swiper = mongoose.model('Swiper', swiperSchema);

module.exports = Swiper;
