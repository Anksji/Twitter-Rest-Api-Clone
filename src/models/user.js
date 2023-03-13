const mongoose = require("mongoose");
const validator = require("validator");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please enter your username"],
    },
    userhandel:{
        type:String,
        unique:[true,"Handel is not available"],
        
    },
    userBio:String,
    userProfileImg:String,
    userProfileBanner:String,
    userSubscribeTopic:[String],
    userSocialScore:{
      type:Number,
      default:10,
      min:3
    },
    followerCount:{
      type:Number,
      default:0,
      min:0
    },
    followingCount:{
      type:Number,
      default:0,
      min:0
    },
    userFollows:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:"User"
    },
    dateOfJoin: {
        type: Date,
        default: Date.now
      },
      userStrength:Number,
      phoneNumber:{
        type:Number,
        unique:true,
        required:[true,"Please enter your phonenumber"],
      },
    
},{timestamps:true});

userSchema.index({ userhandel: 'text', username: 'text' });


module.exports = mongoose.model("User",userSchema);