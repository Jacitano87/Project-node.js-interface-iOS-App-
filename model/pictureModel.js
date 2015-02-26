var mongoose = require('mongoose');


var pictureSchema = require('../schemas/schemaPicture');


var Picture = mongoose.model('pictureModel0378',pictureSchema);


module.exports = Picture;