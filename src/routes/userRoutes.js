const express = require("express");
const {signup,signin,updateUserProfile,
    getFollowersList,updateUserFollower,getUserProfile,deleteAccount} = require("../controllers/userControllers");
const userRouter=express.Router();
const myAuth=require("../middlewares/auth");

userRouter.post("/signup/",signup);
userRouter.post("/signin/",signin);


userRouter.get("/followers/",myAuth,getFollowersList);
userRouter.post("/followers/",myAuth,updateUserFollower);

userRouter.put("/profile/",myAuth,updateUserProfile);
userRouter.post("/profile/",myAuth,updateUserProfile);
userRouter.get("/profile/:id",myAuth,getUserProfile);
userRouter.delete('/profile/:id',deleteAccount);



module.exports = userRouter;