const mongoose = require('mongoose');

const URL = process.env.DATABASE;

const DBS = mongoose.connection;
mongoose.connect(URL,({useNewUrlParser:true}));

DBS.once('open',_=>{
    console.log('Database connected');
})


DBS.on('error',err=>{
    console.log('error while connecting to database',err);
})