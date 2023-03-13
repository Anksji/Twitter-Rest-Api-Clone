const express =require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const dotenv=require("dotenv");
const cors =require("cors");
const apiRoutes = require("./routes/apiRoutes");


dotenv.config();

app.use(express.json());
app.use(cors());

app.use((req,res,next)=>{
    console.log("HTTPS METHOD = "+req.method);
    next();
});

///Add api routes
app.use("/api/v1",apiRoutes);

const PORT = process.env.PORT||3000;

mongoose.connect(dotenv.MONGODB_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started on port no. "+PORT);
    })
}).catch((error)=>{
    console.log(error);
});

app.get("/",(req,res)=>{
    res.send("**********Welcome to the Fake Twitter App Api Developed by Ankit Dwivedi**********");
});