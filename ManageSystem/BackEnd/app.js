const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const loginRouter = require('./router/login.js');
const userRouter = require('./router/userinfo.js');
// const multer = require("multer");
const jwtconfig = require('./jwt_config/index.js');
const {expressjwt:jwt} = require('express-jwt');



app.use(cors());
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());
// app.use((req,res,next)=>{
//     res.cc = (err,status = 1)=>{
//         res.send({
//             status,
//             message:err instanceof Error ?err.message : err
//         })
//     }
// })
app.use('/api',loginRouter);
app.use('/user',userRouter);


// Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。
// const upload = multer({
//     dest:'./public/upload'
// });
// app.use(upload.any());
//静态托管
app.use(express.static("./public"));



// app.use(jwt({
//     secret:jwtconfig.jwtSecretKey,algorithms:['HS256']
// }).unless({
//     path:[/^\/api\//]
// }))





app.get('/',(req,res)=>{
    res.end('Welcome to Manage System ');
});

app.listen(3007,()=>{
    console.log('Server Started !');
})