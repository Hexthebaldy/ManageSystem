const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());

const loginRouter = require('./router/login.js');

app.use('/api',loginRouter);

app.get('/',(req,res)=>{
    res.end('Welcome to Manage System ');
});

const jwtconfig = require('./jwt_config/index.js');
const {expressjwt:jwt} = require('express-jwt');

app.use(jwt({
    secret:jwtconfig.jwtSecretKey,algorithms:['HS256']
}).unless({
    path:[/^\/api\//]
}))


app.listen(3007,()=>{
    console.log('Server Started !');
})