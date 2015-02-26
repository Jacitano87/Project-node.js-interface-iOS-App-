var Picture = require('../model/pictureModel');

function findCoordinate (req,res){
	
	var post =  req.body;
	
	var latitudine =  post.latitudine;
		var longitudine =  post.longitudine;
		var distance =  post.distance;
		var radiusMeter = distance/111.32;
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

	
}
module.exports = findCoordinate;