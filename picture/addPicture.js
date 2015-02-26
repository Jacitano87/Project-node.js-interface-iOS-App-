var Picture = require('../model/pictureModel');

function addPicture (req,res){
	var post =  req.body;
	
	 if((typeof post.picture === 'undefined'))
	 {
  			console.log('Undefined POST-Value');
  			res.send("Undefined POST-Value");
    	}
  	else
		{
			var newPicture = new Picture(post.picture);
		   
		   
		   newPicture.save(function(err, product){
  				if(err){}
  				console.log("saved : [{ _id:" + product._id + "}]");
  				res.send("[{ _id:" + product._id + "}]");

   		}); //CLOSE SAVE
   				   		   
		}
 
}

module.exports = addPicture;