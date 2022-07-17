const express = require('express');
const app  = express()
const mongoose = require('mongoose')

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const catgoryRoute = require('./routes/categories');

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer')

const dotenv = require('dotenv')
dotenv.config();
app.use(express.json())

mongoose.connect((process.env.MONGO_URL),{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("connected to mongoose"))
.catch((err)=>{console.log("Error"+err)})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "BlogApp",
    },
});

const upload = multer({ storage: storage });
app.post("/posts", upload.single("photo"), async (req, res) => {
    return res.json({ photo: req.file.path });
});

app.use("/auth",authRoute)
app.use("/users",userRoute)
app.use("/posts",postRoute)
app.use("/categories",catgoryRoute)

app.listen("5000",()=>{
    console.log("Server running");
})