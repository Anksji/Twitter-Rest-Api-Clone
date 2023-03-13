const hashTagModel=require("../models/hashtags")
const topicModel=require("../models/topics")
const trendsModel=require("../models/trends")
const {getSortOptions,saveHashTag,extractHashtagsAndMentions}=require("../util/publicMethods");


const createNewTopic = async(req,res) =>{
    const data = req.body;

    console.log("add topic json "+JSON.stringify(req.body));

    const { topic,trendingScore}=req.body;


   const addNewTopic=new topicModel({
    topic:topic,
    trendingScore:trendingScore,
    category:req.body.category
   });
   
   try{
     await addNewTopic.save();
     res.status(201).json({message:"success",data:addNewTopic});
   }catch(error){
    console.log(error);
    res.status(500).json({message : "Something went wrong"});
   }
}

const updateTopic = async (req,res) =>{
    const id = req.params.id;
    const data=req.body;
    const trendingScore=req.params.trendingScore;
    try {
       const currentData= await topicModel.findById(id);

    if(data.topic){
        currentData.topic=data.topic;
    }

    if(data.trendingScore){
        currentData.trendingScore=data.trendingScore;
    }

    const topicUpdate=await currentData.save();

        res.status(200).json({message:"success",data:topicUpdate});
    } catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}


const createTrendingPost = async(req,res) =>{
    
    try{
    console.log("add topic json "+JSON.stringify(req.body));

    const {hashtags, mentions} = extractHashtagsAndMentions(req.body.content);

    
//    const addTweetData=new topicModel({
//     tweet:data.tweet,
//     imageTweetUrls:data.imageTweetUrls,
//     added:Date.now,
    
//     viewCount:0,
//     popularityScore:50,
//     tweetedUserId:req.userId,
//     isReply:data.isReply,
//     parentTweetId:data.parentTweetId,
//     hashtags:hashtags,
//     mentions:mentions

//    });

   const addTrendingPost=new trendsModel(req.body);
   
   addTrendingPost.postedUserId=req.userId;

    saveHashTag(hashtags,mentions);
     await addTrendingPost.save();
     res.status(201).json({message:"success",data:addTrendingPost});
   }catch(error){
    console.log(error);
    res.status(500).json({message : "Something went wrong"});
   }
}

const getTrendingPost = async (req,res) =>{
    try{
       
        var requestQuery={};
        const {page, limit} = req.query;
        

        /********* query sort options **********/
        const sortOptions = getSortOptions(req);
        
        console.log("sort by json data "+JSON.stringify(requestQuery));
        const skip = (page - 1) * limit;
    
        console.log("current requested query "+JSON.stringify(requestQuery));
        const trendingPost = await trendsModel.find(requestQuery).sort(sortOptions).skip(skip).limit(limit);
        res.status(200).json(trendingPost);

    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}


const updateTrendingPost = async (req,res)=>{
    
    const id = req.params.id;
    const data=req.body;

    try{
    const updatePost={};

    if(data.title){
        updatePost.title=data.title;
    }

    if(data.content){
        updatePost.content=data.content;
    }

    if(data.bannerUrl){
        updatePost.bannerUrl=data.bannerUrl;
    }

    if(data.postedUserId){
        updatePost.postedUserId=data.postedUserId;
    }

    if(data.hashtags){
        updatePost.hashtags=data.hashtags;
    }

    if(data.mentions){
        updatePost.mentions=data.mentions;
    }

    if(data.topics){
        updatePost.topics=data.topics;
    }
    
    if(data.popularityScore){
        updatePost.popularityScore=data.popularityScore;
    }

        const article = await trendsModel.findByIdAndUpdate(id,updatePost,{new:true});
        res.status(200).json({message:"success",data:article});
    } catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}

const deleteTrendingPost = async (req,res) =>{
    const id=req.params.id;
    try{
        const trendingTopic=await trendsModel.findByIdAndRemove(id);
        res.status(202).json({message:"success",data:trendingTopic});
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}


const deleteTopic = async (req,res) =>{
    const id=req.params.id;
    try{
        const topic=await topicModel.findByIdAndRemove(id);
        res.status(202).json({message:"success",data:topic});
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}

const deleteHashTag = async (req,res) =>{
    const id=req.params.id;
    try{
        const data=await hashTagModel.findByIdAndRemove(id);
        res.status(202).json({message:"success",data:data});
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}

const getHashTags = async (req,res) =>{
    const id=req.params.id;
    try{
        const {limit} = req.query;
        const hashTags = await hashTagModel.find(req.query).limit(limit);
        res.status(202).json({message:"success",data:hashTags});
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}



module.exports = {
   createNewTopic,deleteHashTag,getHashTags,deleteTopic,updateTopic,
   createTrendingPost,updateTrendingPost,deleteTrendingPost,getTrendingPost
}