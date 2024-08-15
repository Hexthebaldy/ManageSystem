const db = require("../db/index.js");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
fs = require('fs');

exports.uploadAvatar = (req,res)=>{
    const onlyId = crypto.randomUUID;

}