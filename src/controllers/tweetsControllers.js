const tweetModel=require("../models/tweet")
const hashTagModel=require("../models/hashtags")
const {getSortOptions,saveHashTag,extractHashtagsAndMentions}=require("../util/publicMethods");



const createTweet = async(req,res) =>{
    const data = req.body;

    console.log("add twitt json "+JSON.stringify(req.body));

    const { hashtags, mentions } = extractHashtagsAndMentions(data.tweet);

    console.log("hastags value is "+hashtags+" all mentions "+mentions);

   const addTweetData=new tweetModel({
    tweet:data.tweet,
    imageTweetUrls:data.imageTweetUrls,
    added:Date.now,
    viewCount:0,
    popularityScore:50,
    tweetedUserId:req.userId,
    isReply:data.isReply,
    parentTweetId:data.parentTweetId,
    hashtags:hashtags,
    mentions:mentions

   });
   
   saveHashTag(hashtags);

   try{
     await addTweetData.save();
     res.status(201).json(addTweetData);
   }catch(error){
    console.log(error);
    res.status(500).json({message : "Something went wrong"});
   }
}



const updateTweet = async (req,res) =>{
    const id = req.params.id;
    const data=req.body;
    const userScore=req.params.userScore;
    try{
       const currentData= await tweetModel.findById(id);

    const updateTweet={
    };
    const userData={
    };

    if(data.reachCount){
        updateTweet.popularityScore=currentData.popularityScore+(3 / 100) * userScore;
        userData.userSocialScore=userScore+1;
        updateTweet.reachCount=currentData.reachCount+1;
    }

    if(data.tweetLikeUsers){
        updateTweet.popularityScore=currentData.popularityScore+(7 / 100) * userScore;
        userData.userSocialScore=userScore+3;
        currentData.tweetLikeUsers.push(req.userId);
        updateTweet.tweetLikeUsers=currentData.tweetLikeUsers;
    }

    if(data.tweetRepliedUsers){
        updateTweet.popularityScore=currentData.popularityScore+(5 / 100) * userScore;
        userData.userSocialScore=userScore+2;
        currentData.tweetRepliedUsers.push(req.userId);
        updateTweet.tweetRepliedUsers=currentData.tweetRepliedUsers;
    }

    if(data.retweetedUsers){
        userData.userSocialScore=userScore+5;
        updateTweet.popularityScore=currentData.popularityScore+(10 / 100) * userScore;
        currentData.retweetedUsers.push(req.userId);
        updateTweet.retweetedUsers=currentData.retweetedUsers;
    }

        const userUpdate = await tweetModel.findByIdAndUpdate(id,userData,{new:true});
        const tweetUpdate = await tweetModel.findByIdAndUpdate(id,updateTweet,{new:true});
        res.status(200).json({message:"success",user:userUpdate,data:tweetUpdate});
    } catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}

const deleteTweet = async (req,res) =>{
    const id=req.params.id;
    try{
        const note=await tweetModel.findByIdAndRemove(id);
        res.status(202).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}

const getFilteredTweets = async (req,res) =>{
    try{
       
        //const notes = await noteModel.find({userId : req.userId});
        //const id=req.params.id;
        var requestQuery={};
        const {page, limit} = req.query;
        
        if(req.query.topic){
            requestQuery={ $text: { $search: req.query.topic } };
        }

        if(req.query.hashtag){
            requestQuery={ $text: { $search: req.query.hashtag } };
        }

        /********* query sort options **********/
        const sortOptions = getSortOptions(req);
        
        console.log("sort by json data "+JSON.stringify(requestQuery));
        const skip = (page - 1) * limit;
    
        console.log("current requested query "+JSON.stringify(requestQuery));
        const newsArticles = await tweetModel.find(requestQuery).sort(sortOptions).skip(skip).limit(limit);
        res.status(200).json(newsArticles);

    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}


const getFeedTweets = async (req,res) =>{
    try{
       
        //const notes = await noteModel.find({userId : req.userId});
        //const id=req.params.id;
        var requestQuery={};
        const {page, limit,userScore} = req.query;
        console.log("current request query "+JSON.stringify(req.params));
        if(req.query.topic){
            requestQuery={ $text: { $search: req.query.topic } };
        }

        if(req.query.hashtag){
            requestQuery={ $text: { $search: req.query.hashtag } };
        }
        /********* query sort options **********/
        const sortOptions = getSortOptions(req);
        

        console.log("sort by json data userSocialScore "+userScore);

        const skip = (page - 1) * limit;
    
        console.log("current requested query "+JSON.stringify(requestQuery));
        const userFeedTweet = await tweetModel.find({
            $or:[
                {popularityScore: {$gt: userScore}},
                {tweetedUserId:req.userId}
            ]
          }).sort(sortOptions).skip(skip).limit(limit);
        res.status(200).json(userFeedTweet);

    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}



module.exports = {
    createTweet,updateTweet,deleteTweet,
    getFeedTweets,getFilteredTweets
}