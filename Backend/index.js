const express = require('express');
const app = express();
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookiParser = require("cookie-parser")
const jsforce = require('jsforce')


app.use(cookiParser());
app.use(cors({origin: true, credentials: true}));app.use(bodyParser.json());
dotenv.config({path:'./config.env'})
require('./database/connection')
const port = process.env.PORT;
// app.use(require('./router/auth'))

const{SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD} = process.env
const conn = new jsforce.Connection({
    loginUrl:SF_LOGIN_URL
})

conn.login(SF_USERNAME,SF_PASSWORD,(err,userInfo)=>{
    if(err){
        console.log(err)
    }else{
        console.log("user ID------>",userInfo.id)
        console.log("org Info--->",userInfo.organizationId)
    }
})


app.get('/',(req,res)=>{
    conn.query("SELECT  Id,	Account__c,	Geo_Location__c,Job_Status__c FROM Visit__c",(err,result)=>{
        if(err){
            res.send(err)
        }else{
            console.log("Total record", result.totalSize)
            res.json(result.records)
        }
    })
  //  res.send("Salesforce integration with nodejs")
})

app.listen(port,()=>{
    console.log(`server is running at the ${port}`);
})

