var Picture = require('../model/pictureModel');

function findString (req,res){
	var post =  req.body;
	
	var valore = '^'+post.city;
	var re = new RegExp(valore, '');
	console.log(re);
	var query = Picture.distinct("cityPicture");
	query.regex('cityPicture', valore);
    query.exec(function(err,element){
		 if(err){console.log('errore'+err)}
		 res.send(element);
	});
}

module.exports = findString;