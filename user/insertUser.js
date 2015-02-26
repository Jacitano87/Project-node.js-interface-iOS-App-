var Element = require('../model/userModel');

function insertUser (req,res){
	var post =  req.body;
	//console.log(post); 
 
 if((typeof post.user === 'undefined'))
 {
  console.log('Undefined POST-Value');
  res.send("Undefined POST-Value");
  
 }
 else
 {
	
	
	
	Element.find({ idUser: post.user.idUser, nameUser: post.user.nameUser, dataUser: post.user.dataUser }, '_id',function (err, elem) {
	 if(err){console.log('errore'+err)}
	 
	
	 
	 if(elem.length == 0)
	 {
	 	console.log("User not found ");
	 
	 var newElement = new Element(post.user);
	    	 
		 newElement.save(function(err, product){
  				if(err){}
  				console.log("saved : [{ _id:" + product._id + "}]");
  				res.send("[{ _id:" + product._id + "}]");

   		}); //CLOSE SAVE
	 }	
	 else
	 {
	 	console.log('updated : ' + elem);
	 	 res.send(elem);
	 }
	
	 
  		

	});// CLOSE Element.find
 }//ELSE UNDEFINED POST DATA	
}

module.exports = insertUser;