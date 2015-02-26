var Picture = require('../model/pictureModel');

function addLike (req,res){
	var post =  req.body;
	
	if((typeof post.picture === 'undefined'))
	 {
	 	console.log('Undefined POST-Value');
  			res.send("Undefined POST-Value");
	 }
	 else
	 {		 	
	 	Picture.findOneAndUpdate({ '_id' : post.picture._id},{$push :  { likes :  post.picture.idUser  } ,$inc: {likesNumber : 1}} , function(err,num){
	 		
	 		if(err){
                console.log(err);
		        }
		        else
		        {
                console.log("Successfully added Like");
                res.send("Successfully Like added");
        		}
	 	});
	 }

}

module.exports = addLike;