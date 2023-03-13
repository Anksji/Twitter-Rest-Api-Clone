const express = require("express");
const {createTweet,updateTweet,deleteTweet,getFeedTweets,
    getFilteredTweets} = require("../controllers/tweetsControllers");
const myAuth=require("../middlewares/auth");
const tweetRouter=express.Router();

tweetRouter.get("/feed/",myAuth,getFeedTweets);
tweetRouter.get("/filter/",myAuth,getFilteredTweets);

tweetRouter.post("/",myAuth,createTweet);

tweetRouter.put("/:id",myAuth,updateTweet);

tweetRouter.delete("/:id",myAuth,deleteTweet);

module.exports = tweetRouter;
