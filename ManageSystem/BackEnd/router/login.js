const express = require('express');
const router = express.Router();

const loginHandler = require('../router_handle/login.js');

router.post('/register',loginHandler.register);

router.post('/login',loginHandler.login);

router.get('/test',(req,res)=>{
    res.send('This is test api')
})

module.exports = router;
