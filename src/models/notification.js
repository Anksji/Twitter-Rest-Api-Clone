const mongoose = require("mongoose");

const notificationSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:[String]
    },
    updateby:{
        type: Date,
        default: Date.now
    },
    deliveryTokens:[String],

},
{timestamps : true}

);


module.exports=mongoose.model("Notification",notificationSchema);

