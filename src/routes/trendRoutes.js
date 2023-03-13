const express = require("express");
const {createNewTopic,deleteHashTag,deleteTopic,updateTopic,
    createTrendingPost,updateTrendingPost,deleteTrendingPost,getTrendingPost,getHashTags} = require("../controllers/trendsControllers");
const myAuth=require("../middlewares/auth");
const tweetRouter=express.Router();

/***************  TRENDING POST ********************************* */
tweetRouter.post("/trendingPost/",myAuth,createTrendingPost);
tweetRouter.get("/trendingPost/",myAuth,getTrendingPost);
tweetRouter.put("/trendingPost/:id",myAuth,updateTrendingPost);
tweetRouter.delete("/trendingPost/:id",myAuth,deleteTrendingPost);

tweetRouter.post("/topic/",myAuth,createNewTopic);
tweetRouter.put("/topic/:id",myAuth,updateTopic);
tweetRouter.delete("/topic/:id",myAuth,deleteTopic);
tweetRouter.get("/topic/",myAuth,getTrendingPost);

tweetRouter.get("/hashtag/",myAuth,getHashTags);
tweetRouter.delete("/hashtag/:id",myAuth,deleteHashTag);

module.exports = tweetRouter;
