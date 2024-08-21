const db = require('../db/index.js');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtconfig = require('../jwt_config/index.js');

exports.register = async (req, res) => {
    db(async () => {
        try {
            const { account, password} = req.body;

            // 验证是否所有字段都已提供
            if (!account || !password) {
                return res.status(400).send('所有字段均为必填项');
            }

            // 检查账号是否已存在
            const existingUser = await User.findOne({ $or: [{ account }] });
            if (existingUser) {
                console.log('账号被占用')
                return res.status(201).send('账号已被使用');
            }

            // 使用 bcrypt 对密码进行加密
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // 创建新用户并使用加密后的密码
            const newUser = new User({
                account,
                password: hashedPassword,

            });

            console.log('new user info: ', newUser);

            // 保存用户到数据库
            await newUser.save();

            // 返回成功响应
            res.status(201).send('注册成功');
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).send('服务器错误');
        }
    }, () => {
        console.log("db[ManageSystem] connection failed !");
    });
};



exports.login = async (req, res) => {
    db(async()=>{
        try {
            const { account, password } = req.body;
    
            // 检查是否提供了账号和密码
            if (!account || !password) {
                return res.status(400).send('账号和密码是必填项');
            }
    
    
            // 查找用户
            const user = await User.findOne({ account });
            if (!user) {
                return res.status(400).send('账号或密码错误');
            }
    
            // 验证密码
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send('账号或密码错误');
            }

            console.log("账号密码正确");
    
            // 生成 JWT 令牌
            const token = jwt.sign(
                { userId: user._id, account: user.account },
                jwtconfig.jwtSecretKey, // 替换为你的 JWT 秘钥
                { expiresIn: '24h' } // 令牌过期时间
            );
    
            

            // 返回响应
            // res.status(200).json({ message: '登录成功', token });
            res.send({
                status:200,
                message:'登录成功',
                token:token,
            })
            console.log('登录成功');
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).send('服务器错误');
        }
    },() => {
        console.log("db[ManageSystem] connection failed !");
    })
};

