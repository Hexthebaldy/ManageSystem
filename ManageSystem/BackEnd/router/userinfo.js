const express = require('express');
const router = express.Router();
const userinfoHandler = require('../router_handle/userinfo');

router.post('/uploadAvatar',userinfoHandler.uploadAvatar);





