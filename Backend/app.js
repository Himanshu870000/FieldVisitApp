/**
 * Author : DeaGle
 * description: entry point for the node app
 */

const dotenv = require('dotenv')
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config({path:'./config.env'})

//app specifc routes TODO:

const authRoutes = require("./routes/auth");


//DB Connection
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       /*  useCreateIndex: true,
        useFindAndModify: false, */
    })
    .then(() => {
        console.log("DB CONNECTED");
    });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

//My Routes
app.use("/api", authRoutes);

//PORT
const port = process.env.PORT || 8000; //default PORT

//Start the server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});