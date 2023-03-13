const mongoose = require("mongoose");

const trendingArticles=mongoose.Schema({
   
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    bannerUrl:{
        type:[String]
    },
    postedUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    popularityScore:{
        type:Number
    },
    
    hashtags:[String],
    mentions:[String],
    topics:{
        type:[String],
        ref:"Topic"
    },
    reachCount:Number,

},
{timestamps : true}

);


module.exports=mongoose.model("TrendingArticles",trendingArticles);

