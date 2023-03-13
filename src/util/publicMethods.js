const hashTagModel=require("../models/hashtags");

function getSortOptions(req){
    const sortOptions={};
    if(req.query.sortBy){
        const sortByArray = req.query.sortBy.split(',');
        var sortOrder;
        if(req.query.sortOrder){
            sortOrder=req.query.sortOrder.split(',');
        }else{
            sortOrder=[-1];
        }
        
        for(let i=0;i<sortByArray.length;i++){
            console.log("inside loop i value "+i);
            let sortOrderIndex;
            if(sortOrder.length>i){
                sortOrderIndex=i;
            }else{
                console.log("current sort order is in else part "+sortOrder.length);
                sortOrderIndex=0;
                sortOrder[0]=-1;
                console.log("current sort order at index 0 "+sortOrder[0]);
            }

            sortOptions[sortByArray[i]] = sortOrder[i] === null ? -1 : sortOrder[sortOrderIndex];
        }
    }
    return sortOptions;
}

async function saveHashTag (hashtag) {
    try{

        for (const id of hashtag) {
            // Find a document
            const document = await hashTagModel.findOne({ _id: id });
      
            if (document) {
              // If the document exists, update the trendingScore field
              document.trendingScore += 1;
              await document.save();
            } else {
              // If the document doesn't exist, create a new document
              await hashTagModel.create({ _id: id, trendingScore: 1 });
            }
          }
    }catch(error){
        console.log(error);

    }
}

function extractHashtagsAndMentions(str) {
    const hashtags = (str.match(/#\w+/g) || []).map(tag => tag.slice(1));
    const mentions = (str.match(/@\w+/g) || []).map(tag=>tag.slice(1));
    return {
      hashtags,
      mentions
    };
  }



module.exports={getSortOptions,saveHashTag,extractHashtagsAndMentions};