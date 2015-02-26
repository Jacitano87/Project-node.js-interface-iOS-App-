var mongoose = require('mongoose');

var picture = new  mongoose.Schema({
	
        
        			idUser: String,
        			nameUser: String,
        			urlProfile: String,
        		    countryPicture: String,
        			cityPicture: String,
        			categoryPicture: String,
        			placePicture: String,
        			titlePicture: String,
        			urlPicture: String,
        			
        			loc : { 
        				    lonPicture: Number,
        					latPicture: Number
        				  },
                    	  
                    	  
                    votes: [{
                                idUser: String,
                                  vote: Number,
                    }],	 
                    	       
                    
                    comments:[{ 
                    	         idUser: String,
                    	       nameUser: String,
                     		titleComment: String,
                    	  }],
                    dataPicture:  { type: Date, default: Date.now },	  	  
        		 
        
		
});

picture.index({loc : "2d"});
picture.index({categoryPicture:1,cityCountry:1,placePicture:1});
module.exports = picture;