// https://cloud.mongodb.com/v2/66b46449d0467003bc1d2219#/security/network/accessList => link to navigate to mongodb 

// require('dotenv').config({path: './env'})
import dotenv from "dotenv"

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGODB connection failed !!! ", err)
})

// we have to add then and catch here bcz the function 
// connectDB will return a promise t;o handle that



/*
import express from "express";
const app = express();

// this is eif
( async () => {
    try{
    await mongoose.connect(`${process.env.MONGODB_URI}`)
    app.on("error", (error) => {
        console.log("error:", error);
        throw error
    })

    app.listen(process.env.PORT, () => {
        console.log(`App is listning on port ${process.env.PORT}`);
    })

    }
    catch(error){
        console.error("ERROR", error)
        throw err
    }
})()
*/