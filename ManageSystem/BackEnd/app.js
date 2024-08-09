const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors);
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json);




app.listen(3007,()=>{
    console.log('Server Started !');
})