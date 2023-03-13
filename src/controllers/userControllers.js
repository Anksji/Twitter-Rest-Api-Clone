const userModel = require("../models/user");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");
const SECRET_KEY="secret_key_value";
const getSortOptions=require("../util/publicMethods");


const signup = async (req,res)=> {

    const {username,phoneNumber,password,userhandel}=req.body;
    try{

        console.log("signup is going");

    //check existing user
    const existingUser = await userModel.findOne({
        phoneNumber:phoneNumber
    });
 
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const result=await userModel.create({
        phoneNumber:phoneNumber,
        password:hashedPassword,
        username:username,
        userhandel:userhandel
    });

    const token = jwt.sign({
        phoneNumber:result.phoneNumber,id:result._id
    },SECRET_KEY);

    res.status(201).json({user:result,token:token});
    
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong error "+error});
    }
}

const deleteAccount = async(req,res)=>{
    userModel.findByIdAndRemove(req.params.id)
    .then(user =>{
        if(user){
            return res.status(200).json({success:true,message:"User deleted successfully"})
        }else{
            return res.status(404).json({
                success:false, message : "User not found"
            })
        }
    });
}



const signin = async(req,res) =>{
    const {phoneNumber,password}=req.body;
    try{
        const existingUser = await userModel.findOne({phoneNumber:phoneNumber}).select("+password");
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }

        console.log("current user db password "+JSON.stringify(existingUser)+" user input "+password);
        const matchPassword= await bcrypt.compare(password,existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token = jwt.sign({
            phoneNumber:existingUser.phoneNumber,id:existingUser._id
        },SECRET_KEY);
    
        res.status(200).json({user:existingUser,token:token});
        

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong error "+error});
    }
}

const updateUserFollower = async(req,res)=>{
    try{
    const data=req.body;
    const followedId=req.body.followedId;

    

    const currentUserData = await userModel.findById(req.userId);
    console.log("current user body id "+req.userId);
    const otherUserData=await userModel.findById(followedId);
    console.log("other user body "+JSON.stringify(otherUserData));

    var userProfile = {

    }

    if(currentUserData.userFollows!==null){
        if (currentUserData.userFollows.includes(followedId)) {
            //remove him/his as follower

            const index = currentUserData.userFollows.indexOf(followedId);
            if (index > -1) {
                currentUserData.userFollows.splice(index, 1);
            }
            //userProfile={ $pull: { userFollows: followedId } };
    
            //subtract follower count from followedId user
            otherUserData.followerCount--;
            //subtract following count from own user id req.userId
            currentUserData.followingCount--;
        
        }else{
            //made him/her as follower

            currentUserData.userFollows.push(followedId);
            //userProfile={ $push: { userFollows: followedId } };
    
            //add follower count from followedId user
            otherUserData.followerCount++;
            //add following count from own user id req.userId
            currentUserData.followingCount++;
            
        }
    }else{
        //made him/her as follower
        currentUserData.userFollows.push(followedId);
        //userProfile={ $push: { userFollows:  followedId} };
    
        //add follower count from followedId user
        otherUserData.followerCount++;
        //add following count from own user id req.userId
        currentUserData.followingCount++;
    }

    
        const otherUser=await otherUserData.save();
        const updatedProfile = await currentUserData.save();
        
        res.status(200).json({message:"success", currUser : updatedProfile,otherUser:otherUser});
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}

const getFollowersList = async (req,res)=>{
    try{
       
        //const notes = await noteModel.find({userId : req.userId});
        const queryUserId=req.params.queryUserId;
        const action=req.params.action;
        const {page, limit} = req.query;
        
        const sortOptions = getSortOptions(req);
        const skip = (page - 1) * limit;
        var dataArray;
        if(action==="Follower"){
            //search for followers
            dataArray = await userModel.find({ userFollows: { $in: [queryUserId] } }).sort(sortOptions).skip(skip).limit(limit);
            
        }else{
            //search for following
            dataArray = await userModel.findById(queryUserId).populate('userFollows').sort(sortOptions).skip(skip).limit(limit);
        }

        res.status(200).json({message:"success",data:dataArray});

    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}




const updateUserProfile = async (req,res) =>{
    const data=req.body;

    const userProfile={
        updated:Date.now,
    };
    if(data.username){
        userProfile.username=data.username;
    }
    if(data.userImage){
        userProfile.userImage=data.userImage;
    }
    if(data.userSubscribeTopic){
        userProfile.userSubscribeTopic=data.userSubscribeTopic;
    }
    if(data.userBio){
        userProfile.userBio=data.userBio;
    }
    if(data.userProfileImg){
        userProfile.userProfileImg=data.userProfileImg;
    }
    if(data.userProfileBanner){
        userProfile.userProfileBanner=data.userProfileBanner;
    }
    if(data.userSubscribeTopic){
        userProfile.userSubscribeTopic=data.userSubscribeTopic;
    }


    try{
        const updatedProfile=await userModel.findByIdAndUpdate(req.userId,userProfile,{new:true});
        res.status(200).json({message:"success", data : updatedProfile});
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}

const getUserProfile = async (req,res) =>{
    const requestUserId=req.body.requestUserId;

    try{
        const userProfile=await userModel.findById(requestUserId);
        res.status(200).json({message:"success", data : userProfile});
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}


module.exports={signin,signup,updateUserProfile,updateUserFollower,
    getFollowersList,getUserProfile,deleteAccount};