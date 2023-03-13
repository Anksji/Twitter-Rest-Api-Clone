const mongoose = require("mongoose");

const hashTags=mongoose.Schema({
    _id: {
        type: String,
        require:true
      },
    
    trendingScore:{
        type:Number,
        require:true
    },
    category:{
        type:[String]
    }
    
},
{timestamps : true}

);

module.exports=mongoose.model("hashtag",hashTags);

