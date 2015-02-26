

var Picture = require('../model/pictureModel');

function addComment (req,res){
	var post =  req.body;
	
	if((typeof post.picture === 'undefined'))
	 {
	 	console.log('Undefined POST-Value');
  			res.send("Undefined POST-Value");
	 }
	 else
	 {
	 	var newElement = new Element;
	 	
	 	var commentElement =  {
                          	    	idUser: post.picture.idUser,
	 						 commentName: post.picture.nameUser,
	 						titleComment: post.picture.titleComment,
	 					    }
	 						 
	 	
	 	Picture.findOneAndUpdate({ '_id' : post.picture.idPicture},{$push :  { comments :  commentElement  }} , function(err,num){
	 		
	 		if(err){
                console.log(err);
		        }
		        else
		        {
                console.log("Successfully added Comment");
                res.send("Successfully added Comment");
        		}

	 		
	 	});
	  	
	 }

}

module.exports = addComment;