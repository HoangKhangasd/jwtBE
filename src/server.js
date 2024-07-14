import express from "express";
import initWebRoutes from "./routes/web";
import configViewEngine from "./config/viewEngine";
import bodyParser from 'body-parser';
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
import connection from "./config/conectDB";
import {createJWT, verifyToken } from './middleware/JWTAction';
import cookieParse from 'cookie-parser';
const mysql = require("mysql");
require("dotenv").config();
const cors = require('cors');
 const app = express();
 const PORT = process.env.PORT || 8080;



// configCors(app);
 configViewEngine(app);

const corsOptions ={
    origin:true, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use('./Upload', express.static('Upload'));
 //test jwt
//  createJWT();
//  let decodedData = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemVybyIsImFkZHJlc3MiOiJoY20iLCJpYXQiOjE2OTc0MzM0MjN9.LTu_T_oxB8Zu96YGP1wpUSkItto21sKFzHdVUYCVGy0")
//  console.log(decodedData)

//config cookie parser
app.use(cookieParse());

//connection();

 initWebRoutes(app);
 initApiRoutes(app);
 const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jwt",
});

 app.use((req,res)=>{
  
 })

 app.listen(PORT, ()=>{
    console.log("jwt backend port = "+PORT);
 })

//  app.get("/api/getAllFood",(req,res)=>{
//   sql = "SELECT * FROM food ";
//   db.query(sql, (err, data) => {
//     console.log(data)
//     if (err) return res.json("Error");
//     return res.json(data);
//   });
//  })