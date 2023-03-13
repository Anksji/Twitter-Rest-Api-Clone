const mongoose = require("mongoose");

const topic=mongoose.Schema({
    _id: {
        type: String,
        require:true
      },
    topic:{
        type:String,
        require:true
    },
    content:{
        type:String,
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

module.exports=mongoose.model("Topic",topic);

