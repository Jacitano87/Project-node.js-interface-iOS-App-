var Element = require('../model/userModel');


function addFollower (req,res){
	var post =  req.body;
	
	 if((typeof post.seguire === 'undefined')||
	 	(typeof post.user === 'undefined'))
 {
  console.log('Undefined POST-Value');
  res.send("Undefined POST-Value");
  
 }
 else
 {
 	var newElement = new Element;
 	
 	Element.findOneAndUpdate({_id: post.seguire.idUser}, {$push: { followers : post.user.idUser}, $inc: {followers_number : 1}}, function(err,num) {
 		if(err){
                console.log(err);
        }
        
        else{
                console.log("Successfully added Follower");
                
        Element.findOneAndUpdate({_id: post.user.idUser}, {$push: { following : post.seguire.idUser }, $inc: {following_number : 1}}, function(err,num) {        
                
                if(err){
                console.log(err);
		        }
		        else
		        {
				console.log("Successfully added Following");
                res.send("Successfully added");
        		}
 				}); //CLOSE FINDONEANDUPDATE2
        }//else interno
       }); //CLOSE FINDONEANDUPDATE1
 	
 }//CLOSE ELSE CHECK VARIABLE
	
	
}

module.exports = addFollower;