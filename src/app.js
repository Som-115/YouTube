// app.js is always written in express so first install js
// npm install express

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
// routes import

import userRouter from './routes/user.routes.js';
const app = express();

// app.use is mainly used for the middleware

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// now we will get the data from many different resources such as
// we can get data from forms, json format, from some urls 
// so this is how we have to handle the data
// for file data we use multer

app.use(express. json({limit: "16kb"}))

// to get data from url
app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public"))
app.use(cookieParser())


// // routes import

// import userRouter from './routes/user.routes.js'

// routes declaration 
app.use("/api/v1/users", userRouter)

export { app };