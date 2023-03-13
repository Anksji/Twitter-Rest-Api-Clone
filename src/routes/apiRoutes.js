const express = require("express");
const userRouter = require("./userRoutes");
const tweetRouter = require("./tweetRoutes");
const trendsRouter=require("./trendRoutes");
const allRoutes=express.Router();


allRoutes.use("/users",userRouter);
allRoutes.use("/tweets",tweetRouter);
allRoutes.use("/trends",trendsRouter);


allRoutes.get("/",(req,res)=>{
    res.send("**********Current api version 1**********");
});

module.exports =  allRoutes;

