async function db(sucess,error) {
    const mongoose = require('mongoose');
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/ManageSystem');
        console.log("linked to database : ManageSystem ");
        sucess();
    }catch(error){
        console.error('Error performing database operations:', error);
    }
    
}

module.exports = db;
