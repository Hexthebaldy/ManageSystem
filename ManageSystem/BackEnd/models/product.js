const mongoose = require('mongoose');

// 创建一个轮播图的 Schema
const productSchema = new mongoose.Schema({
    product_id:{ type: String },
    product_name:{ type: String },
    product_category:{ type: String },
    product_unit:{ type: String },
    product_in_warehouse_number:{ type: Number },
    product_single_price:{ type: Number },
    product_all_price:{ type: Number },
    product_status:{ type: String },
    product_create_person:{type: String},
    product_create_time:{
        type: Date,
        default: Date.now
    },
    product_update_time:{
        type: Date,
        default: Date.now
    },
    in_memo:{type: String},
    product_out_status:{type: String},
    // isApply:{type:Boolean}
});

// 创建模型
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
