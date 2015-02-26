var express = require('express');
var server = express();
server.use(express.bodyParser());
var async = require('async');
server.use(express.logger());

var qs = require('querystring');
console.log('Avvio Server...');
var mongoose  = require('../serverapp/connectdb/connectMongo');
var db = mongoose.connection;
var Element = require('../serverapp/model/userModel');
var Picture = require('../serverapp/model/pictureModel');

var addPicture = require('../serverapp/picture/addPicture');
var addLike = require('../serverapp/picture/addLike');
var addDislike = require('../serverapp/picture/addDislike');
var removeLike = require('../serverapp/picture/removeLike');
var removeDislike = require('../serverapp/picture/removeDislike');
var addComment = require('../serverapp/picture/addComment');

var findString = require('../serverapp/picture/findString');
var findCoordinate = require('../serverapp/picture/findCoordinate');





var addFollower = require('../serverapp/user/addFollower');
var removeFollower = require('../serverapp/user/removeFollower');
var insertUser = require('../serverapp/user/insertUser');




db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

});



server.post('/addPicture',addPicture);


server.post('/addComment',addComment);


server.post('/insertUser',insertUser);
server.post('/addFollower',addFollower); 
server.post('/removeFollower',removeFollower); 


server.post('/findString',findString);
server.post('/findCoordinate',findCoordinate);






server.get('/count',function(req,res){
	//var post =  req.body;
	var city =  req.param('city');
	var category = ["Panorama","Place","People","Food","Animals","Things","Dress","Event"];
/*
	if((typeof post.city === 'undefined'))
	 {
	 	console.log('Undefined POST-Value');
  			res.send("Undefined POST-Value");
	 }
	 else
	 {
      */
                    
    Picture.count({"cityPicture":"San Francisco","categoryPicture":"Event"}, function( err, count){
    res.send( '{ "Num": '+ count + "}");
  })	
     	
     		
	// }	

}); //Close /findSort






server.get('/findSort',function(req,res){
	//var post =  req.body;
	var city =  req.param('city');
	var category =  req.param('category');
/*
	if((typeof post.city === 'undefined'))
	 {
	 	console.log('Undefined POST-Value');
  			res.send("Undefined POST-Value");
	 }
	 else
	 {
      */
                     
       var query = Picture.find({"cityPicture" : city,"categoryPicture": category},{"urlPicture": 1 , "categoryPicture": 1,"placePicture":1,"titlePicture":1,"countryPicture":1,"likesNumber":1,"cityPicture":1,"nameUser":1,"urlProfile":1});
       	   query.sort({likesNumber: -1});
       	   query.limit(8);
       query.exec(function(err,num){
	 			 		if(err){
                console.log(err);
		        }
		        else
		        {
                	
                		 		
                	                		
              
                res.send(num);
        		}

	 		
	 	});

		
	// }	

}); //Close /findSort

server.post('/findSort',function(req,res){
	var post =  req.body;
	

	if((typeof post.city === 'undefined') || (typeof post.category === 'undefined'))
	 {
	 	console.log('Undefined POST-Value');
  			res.send("Undefined POST-Value");
	 }
	 else
	 {
      
      if(post.category == "Top")
      {
      	var query = Picture.find({"cityPicture" : post.city},{"urlPicture": 1 , "categoryPicture": 1,"placePicture":1,"titlePicture":1,"countryPicture":1,"likesNumber":1,"cityPicture":1,"nameUser":1,"urlProfile":1});
      	query.sort({likesNumber: -1});

      }
       if(post.category == "Random")
      {
      	var query = Picture.find({"cityPicture" : post.city},{"urlPicture": 1 , "categoryPicture": 1,"placePicture":1,"titlePicture":1,"countryPicture":1,"likesNumber":1,"cityPicture":1,"nameUser":1,"urlProfile":1});
      	
      }
      else
      {               
       var query = Picture.find({"cityPicture" : post.city,"categoryPicture": post.category},{"urlPicture": 1 , "categoryPicture": 1,"placePicture":1,"titlePicture":1,"countryPicture":1,"likesNumber":1,"cityPicture":1,"nameUser":1,"urlProfile":1});
       query.sort({likesNumber: -1});

      }
       	          	   query.limit(8);
       query.exec(function(err,num){
	 			 		if(err){
                console.log(err);
		        }
		        else
		        {
                //console.log(num[0].picture[0].cityPicture);
                
                                		
               // console.log(num);		
                		 		
                	                		
                	
                
                res.send(num);
        		}

	 		
	 	});

		
	 }	

});



server.post('/findSortCity',function(req,res){
	var post =  req.body;
	

	if((typeof post.city === 'undefined'))
	 {
	 	console.log('Undefined POST-Value');
  			res.send("Undefined POST-Value");
	 }
	 else
	 {
      
      
      	var query = Picture.find({"cityPicture" : post.city},{"urlPicture": 1 , "categoryPicture": 1,"placePicture":1,"titlePicture":1,"countryPicture":1,"likesNumber":1,"cityPicture":1,"nameUser":1,"urlProfile":1});
      	query.sort({likesNumber: -1});

 
       	          	   query.limit(8);
       query.exec(function(err,num){
	 			 		if(err){
                console.log(err);
		        }
		        else
		        {
                //console.log(num[0].picture[0].cityPicture);
                
                                		
               // console.log(num);		
                		 		
                	                		
                	
                
                res.send(num);
        		}

	 		
	 	});

		
	 }	

});

server.post('/findCategoryCity',function(req,res){
	var post =  req.body;
	

	if((typeof post.city === 'undefined') || (typeof post.category === 'undefined'))
	 {
	 	console.log('Undefined POST-Value');
  			res.send("Undefined POST-Value");
	 }
	 else
	 {
      
      
      	var query = Picture.find({"cityPicture" : post.city,"categoryPicture":post.category},{"urlPicture": 1 , "categoryPicture": 1,"placePicture":1,"titlePicture":1,"countryPicture":1,"likesNumber":1,"cityPicture":1,"nameUser":1,"urlProfile":1});
      	query.sort({likesNumber: -1,placePicture: -1});

 
       	          	   query.limit(20);
       query.exec(function(err,num){
	 			 		if(err){
                console.log(err);
		        }
		        else
		        {
                //console.log(num[0].picture[0].cityPicture);
                
                                		
               // console.log(num);		
                		 		
                	                		
                	
                
                res.send(num);
        		}

	 		
	 	});

		
	 }	

});



server.get('/findCategoryCity',function(req,res){
	      
      var city =  req.param('city');
      var category =  req.param('category');
      
      	var query = Picture.find({"cityPicture" : city,"categoryPicture":category},{"urlPicture": 1 , "categoryPicture": 1,"placePicture":1,"titlePicture":1,"countryPicture":1,"likesNumber":1,"cityPicture":1,"nameUser":1,"urlProfile":1});
      	query.sort({likesNumber: -1});

 
       	          	   query.limit(20);
       query.exec(function(err,num){
	 			 		if(err){
                console.log(err);
		        }
		        else
		        {
                //console.log(num[0].picture[0].cityPicture);
                
                                		
               // console.log(num);		
                		 		
                	                		
                	
                
                res.send(num);
        		}

	 		
	 	});

		
	 
	 

});






server.post('/findSort',function(req,res){
	var post =  req.body;
	

	if((typeof post.city === 'undefined') || (typeof post.category === 'undefined'))
	 {
	 	console.log('Undefined POST-Value');
  			res.send("Undefined POST-Value");
	 }
	 else
	 {
      
      if(post.category == "Top")
      {
      	var query = Picture.find({"cityPicture" : post.city},{"urlPicture": 1 , "categoryPicture": 1,"placePicture":1,"titlePicture":1,"countryPicture":1,"likesNumber":1,"cityPicture":1,"nameUser":1,"urlProfile":1});
      	query.sort({likesNumber: -1});

      }
       if(post.category == "Random")
      {
      	var query = Picture.find({"cityPicture" : post.city},{"urlPicture": 1 , "categoryPicture": 1,"placePicture":1,"titlePicture":1,"countryPicture":1,"likesNumber":1,"cityPicture":1,"nameUser":1,"urlProfile":1});
      	
      }
      else
      {               
       var query = Picture.find({"cityPicture" : post.city,"categoryPicture": post.category},{"urlPicture": 1 , "categoryPicture": 1,"placePicture":1,"titlePicture":1,"countryPicture":1,"likesNumber":1,"cityPicture":1,"nameUser":1,"urlProfile":1});
       query.sort({likesNumber: -1});

      }
       	          	   query.limit(8);
       query.exec(function(err,num){
	 			 		if(err){
                console.log(err);
		        }
		        else
		        {
                //console.log(num[0].picture[0].cityPicture);
                
                                		
               // console.log(num);		
                		 		
                	                		
                	
                
                res.send(num);
        		}

	 		
	 	});

		
	 }	

});

server.get('/addVote',function (req,res){
	var idUser =  req.param('idUser');
		var voteUser =  req.param('vote');
		var idPicture =  req.param('idPicture');
	
	
	 
	 	var newElement = new Element;
	 	
	 	var voteElement =  {
                          	    	idUser: idUser,
	 						 	      vote: voteUser,
	 						
	 					    }
	 						 
	 	
	 	Picture.findOneAndUpdate({ '_id' : idPicture},{$push :  { votes :  voteElement  }} , function(err,num){
	 		
	 		if(err){
                console.log(err);
		        }
		        else
		        {
                console.log("Successfully added Vote");
                res.send("Successfully added Vote");
        		}

	 		
	 	});
	  	
	 

})

server.get('/findCoordinate',function(req,res){
	
	var latitudine =  req.param('latitude');
		var longitudine =  req.param('longitude');
		var distance =  req.param('distance');
		var radiusMeter = distance/111.32;

		
		var contatore = 0;
		var query = Picture.find({loc : {$within : {$center : [[longitudine,latitudine], radiusMeter]}}},{"urlPicture":1,"placePicture":1,"countryPicture":1,"categoryPicture":1,"cityPicture":1,"urlProfile":1,"nameUser":1,"likesNumber":1,"titlePicture":1,"votes":1});
	    //query.limit(2);
		query.exec(function(err,element){
	 			 		if(err){
                console.log(err);
		        }
		        else
		        {
		        var elementi = [];	
                	for(var i=0; i<element.length; i++)
                		{
                			contatore=0;
                			for (var j=0; j< element[i].votes.length ; j++)
                			{
                				contatore=contatore+parseInt(element[i].votes[j].vote);
                				//console.log(element[i].votes[j].vote);
                			}
                			contatore=contatore/element[i].votes.length;
                			elementi.push({ totaleVoti : contatore.toString() , categoryPicture : element[i].categoryPicture , cityPicture : element[i].cityPicture , countryPicture : element[i].countryPicture, nameUser : element[i].nameUser, placePicture : element[i].placePicture , titlePicture : element[i].titlePicture , urlProfile : element[i].urlProfile , urlPicture : element[i].urlPicture});

                				

                			
                		}
              //  console.log(elementi);
                res.send(elementi);
                
        		}

	 		
	 	});

	
});





server.post('/findPlace',function(req,res){
	
	var post =  req.body;
	
	var city =  post.city;
	
	var elementi = [] ;
 
 

 

function final() { res.send(elementi); }
 
 
     

					
    	var query = Picture.distinct("placePicture");
       	    query.where('cityPicture').equals(city);
       	    query.sort({likesNumber: -1});
      						    query.exec(function(err,element){
	 										if(err){ console.log(err); }
		    								else
		    								      {
		    			      		    	 element.forEach(function (place) 
		    			      		    	 {
		    			      		    			 
		    			      		    	 
		        										
var query = Picture.find({"placePicture": place},{"urlPicture":1,"placePicture":1,"countryPicture":1,"categoryPicture":1,"cityPicture":1});
									query.sort({likesNumber: -1});
		        										 	query.limit(1);
		        											query.exec(function(err,ele){
															 		if(err){console.log('errore'+err)}
																		else
																		{
			elementi.push({ placePicture : ele[0].placePicture , urlPicture : ele[0].urlPicture , countryPicture : ele[0].countryPicture, cityPicture : ele[0].cityPicture, categoryPicture : ele[0].categoryPicture });
																
																			if(elementi.length == element.length) {
      																					final();
      																					
      																					
  																					  }
  																				
																					    								       																								
																		}
		        											});	
       											
		    								       	
		        										
		     	
		        						    					    								       		
		        						   
		        						       });
		    								      
		    								      }
		        						    		
		        							});
		        							
		
	 	

 		
     
     
     
            	    
});



server.get('/findPlace',function(req,res){
	
	var city =  req.param('city');
	
	var elementi = [] ;
 
 

 

function final() { res.send(elementi); }
 
 
     

					
    	var query = Picture.distinct("placePicture");
       	    query.where('cityPicture').equals(city);
       	    query.sort({likesNumber: -1});
      						    query.exec(function(err,element){
	 										if(err){ console.log(err); }
		    								else
		    								      {
		    			      		    	 element.forEach(function (place) 
		    			      		    	 {
		    			      		    			 
		    			      		    	 
		        										
var query = Picture.find({"placePicture": place},{"urlPicture":1,"placePicture":1,"countryPicture":1,"categoryPicture":1,"cityPicture":1});
									query.sort({likesNumber: -1});
		        										 	query.limit(1);
		        											query.exec(function(err,ele){
															 		if(err){console.log('errore'+err)}
																		else
																		{
			elementi.push({ placePicture : ele[0].placePicture , urlPicture : ele[0].urlPicture , countryPicture : ele[0].countryPicture, cityPicture : ele[0].cityPicture, categoryPicture : ele[0].categoryPicture });
																
																			if(elementi.length == element.length) {
      																					final();
      																					
      																					
  																					  }
  																				
																					    								       																								
																		}
		        											});	
       											
		    								       	
		        										
		     	
		        						    					    								       		
		        						   
		        						       });
		    								      
		    								      }
		        						    		
		        							});
		        							
		
	 	

 		
     
     
     
            	    
});
/*
	
	
	var city =  req.param('city');
	
	var elementi = [];
	var contatore = [];
	
 function final() { //res.json(elementi); 
 }
 async.parallel({
    one: function(callback){
    	
    	var query = Picture.distinct("placePicture");
       	    query.where('cityPicture').equals(city);
      						    query.exec(function(err,element){
	 										if(err){ console.log(err); }
		    								else
		    								      {
		    			      		    	 for(var i=0; i< element.length; i++)
		    			      		    	 {
		    			      		    			 
		  		        			var query = Picture.find({"placePicture": element[i]},{"urlPicture":1,"placePicture":1,"countryPicture":1});
		        											query.sort({likesNumber: -1});
		        										 	query.limit(1);
		        											query.exec(function(err,ele){
															 		if(err){console.log('errore'+err)}
																		else
																		{
																																																							
			 elementi.push({ placePicture : ele[0].placePicture , urlPicture : ele[0].urlPicture , countryPicture : ele[0].countryPicture });
																			
																			if(elementi.length == element.length) {
      																					
      																					callback(null, "ok1");
      																					//final();
      																					
      																					
  																					  }
  																				
																					    								       																								
																		}
		        											});	
       											
		    								       	
		        										
		     	
		        						    					    								       		
		        						   
		        						       }
		    								      
		    								      }
		        						    		
		        							});

    	
            console.log("ok1"); 
            
        
    },
    two: function(callback){
       
       					var query = Picture.distinct("placePicture");
       	    query.where('cityPicture').equals(city);
      						    query.exec(function(err,element){
	 										if(err){ console.log(err); }
		    								else
		    								      {
		    			      		    	 element.forEach(function (place) 
		    			      		    	 {
		    			      		    			 
		  		        			var query = Picture.count({"placePicture": place});
		        											
		        											query.exec(function(err,count){
															 		if(err){console.log('errore'+err)}
																		else
																		{
																				console.log(count);																																			
	//		 elementi.push({ placePicture : ele[0].placePicture , urlPicture : ele[0].urlPicture , countryPicture : ele[0].countryPicture });
																			
																			
      																					
      																					//callback(null, "ok2");
      																					//final();
      																			contatore.push({ contatore : count});
																			
																			if(contatore.length == element.length) {
      																					
      																					callback(null, "ok2");
      																					//final();
      																					
      																					
  																					  }			
      																					
  																					  
  																				
																					    								       																								
																		}
		        											});	
       											
		    								       	
		        										
		     	
		        						    					    								       		
		        						   
		        						       });
		    								      
		    								      }
		        						    		
		        							});
       
       
       
       
  
        
    }
},
function(err, results) {
	
	console.log(results);
	console.log(contatore);
	res.json(elementi);
	
    // results is now equals to: {one: 1, two: 2}
}); 

 
/*
function final() { //res.json(elementi); 
}
 
 var query = Picture.distinct("placePicture");
       	    query.where('cityPicture').equals(city);
      						    query.exec(function(err,element){
	 										if(err){ console.log(err); }
		    								else
		    								      {
		    			      		    	 element.forEach(function (place) 
		    			      		    	 {
		    			      		    			 
		  		        			var query = Picture.find({"placePicture": place},{"urlPicture":1,"placePicture":1,"countryPicture":1});
		        											query.sort({likesNumber: -1});
		        										 	query.limit(1);
		        											query.exec(function(err,ele){
															 		if(err){console.log('errore'+err)}
																		else
																		{
																																																							
			 elementi.push({ placePicture : ele[0].placePicture , urlPicture : ele[0].urlPicture , countryPicture : ele[0].countryPicture });
																			
																			if(elementi.length == element.length) {
      																					final();
      																					
      																					
  																					  }
  																				
																					    								       																								
																		}
		        											});	
       											
		    								       	
		        										
		     	
		        						    					    								       		
		        						   
		        						       });
		    								      
		    								      }
		        						    		
		        							});
     

 		
     
     
     
            	    
});
*/



server.post('/findPlace',function(req,res){
	var post =  req.body;
	
	var elementi = [] ;
 
 

 

function final() { res.send(elementi); }
 
 
     

					
    	var query = Picture.distinct("placePicture");
       	    query.where('cityPicture').equals(post.city);
      						    query.exec(function(err,element){
	 										if(err){ console.log(err); }
		    								else
		    								      {
		    			      		    	 element.forEach(function (place) 
		    			      		    	 {
		    			      		    			 
		    			      		    	 
		        										
		var query = Picture.find({"placePicture": place},{"urlPicture":1,"placePicture":1,"countryPicture":1,"categoryPicture":1,"cityPicture":1});
		        											query.sort({likesNumber: -1});
		        										 	query.limit(1);
		        											query.exec(function(err,ele){
															 		if(err){console.log('errore'+err)}
																		else
																		{
			elementi.push({ placePicture : ele[0].placePicture , urlPicture : ele[0].urlPicture , countryPicture : ele[0].countryPicture, cityPicture : ele[0].cityPicture, categoryPicture : ele[0].categoryPicture });
																			
																			if(elementi.length == element.length) {
      																					final();
      																					
      																					
  																					  }
  																				
																					    								       																								
																		}
		        											});	
       											
		    								       	
		        										
		     	
		        						    					    								       		
		        						   
		        						       });
		    								      
		    								      }
		        						    		
		        							});
		        							
		
	 	

 		
     
     
     
            	    
});





server.get('/findString',function(req,res){
	var city =  req.param('city');
	
	var valore = '^'+city;
	var re = new RegExp(valore, '');
	console.log(re);
	var query = Picture.distinct("cityPicture");
	query.regex('cityPicture', valore);
    query.exec(function(err,element){
		 if(err){console.log('errore'+err)}
		 res.send(element);
	});
});




server.post('/findUser',function(req,res){
	var post =  req.body;
	var newElement = new Element;
	
	Element.find({},function(err,element){
		 if(err){console.log('errore'+err)}
		 res.send(element);
	});
});

server.get('/findUser',function(req,res){
	var post =  req.body;
	
	
	Element.find({},function(err,element){
		 if(err){console.log('errore'+err)}
		 res.send(element);
	});
});

server.get('/findPicture',function(req,res){
	var post =  req.body;
	
	
	Picture.find({},function(err,element){
		 if(err){console.log('errore'+err)}
		 res.send(element);
	});
});




server.listen(4000);