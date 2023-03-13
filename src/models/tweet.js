const mongoose = require("mongoose");

const tweetSchema=mongoose.Schema({
    
    tweet:{
        type:String,
        required:true
    },
    imageTweetUrls:{
        type:[String]
    },
    tweetedUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    popularityScore:{
        type:Number
    },
    isReply:Boolean,
    parentTweetId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet"
    },
    hashtags:[String],
    mentions:[String],
    topics:[String],
    tweetLikeUsers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"
    },
    tweetRepliedUsers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"
    },
    retweetedUsers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"
    },
    reachCount:Number,

},
{timestamps : true}

);

//NewsSchema.index({ category: 'text', content: 'text', keywords: 'text', title: 'text', topic: 'text' });
tweetSchema.index({ tweet: 'text'});

module.exports=mongoose.model("Tweet",tweetSchema);

