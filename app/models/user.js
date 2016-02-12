// app/models/user.js

var mongoose = require('mongoose');


// user schema for mongoDB
var userSchema = mongoose.Schema({

        email        : String,
        accessToken  : String,
       // refreshToken : String,
		name         : String

});

// model exposure to app
module.exports = mongoose.model('User', userSchema);
