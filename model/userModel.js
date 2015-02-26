var mongoose = require('mongoose');

var userSchema = require('../schemas/schemaUser');


var Element = mongoose.model('UserModel010',userSchema);


module.exports = Element;



