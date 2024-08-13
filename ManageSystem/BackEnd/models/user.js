const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    account: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    identity: {
        type: String,
        // required: true,
        trim: true
    },
    department: {
        type: String,
        // required: true,
        trim: true
    },
    name: {
        type: String,
        // required: true,
        trim: true
    },
    sex: {
        type: String,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        // required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    update_time: {
        type: Date,
        default: Date.now
    }
}, { timestamps: { createdAt: 'create_time', updatedAt: 'update_time' } });

const User = mongoose.model('User', userSchema);

module.exports = User;
