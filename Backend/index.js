const express = require('express');
const app = express();
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookiParser = require("cookie-parser")

app.use(cookiParser());
app.use(cors({origin: true, credentials: true}));app.use(bodyParser.json());
dotenv.config({path:'./config.env'})
require('./database/connection')
const port = process.env.PORT;
app.use(require('./router/auth'))

app.get('/',(req,res)=>{
    res.json({success:true,messge:'Welcome to backend Zone'});
})

app.listen(port,()=>{
    console.log(`server is running at the ${port}`);
})