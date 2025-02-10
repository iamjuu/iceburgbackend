const express = require('express')
const path =require("path")
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const Port = 8000
const productRouter = require('./Router/adminrouter')
const DataBaseConnection = require('./config/dataBase')
DataBaseConnection()

app.use('/',productRouter)
app.use(cors({
  origin: 'http://localhost:5173',
    credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.listen(Port,()=>{
  console.log(`port is running on ${Port}`)  
})




