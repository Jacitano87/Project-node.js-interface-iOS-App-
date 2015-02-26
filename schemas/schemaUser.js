var mongoose = require('mongoose');



var user = new  mongoose.Schema({
	
	  	    idUser: String,
      	   nameUser: String,
     	   dataUser: String,
     	   mailUser: String,
        	urlProfile: String,
        	
	        followers: [String],
                    
        followers_number: Number,
        
        following: [String],
                    
        following_number: Number,
        achievement : [String],
         registrationData:  { type: Date, default: Date.now },

                
		
});




module.exports = user;

