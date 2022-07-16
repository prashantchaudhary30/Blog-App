const express = require('express');
const app  = express()
const mongoose = require('mongoose')

const authRoute = require('./routes/auth');

const dotenv = require('dotenv')
dotenv.config();
app.use(express.json())

mongoose.connect((process.env.MONGO_URL),{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("connected to mongoose"))
.catch((err)=>{console.log("Error"+err)})

app.use("/auth",authRoute)

app.listen("5000",()=>{
    console.log("Server running");
})