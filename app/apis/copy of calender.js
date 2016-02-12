//REST API Endpoints


var user = require('../models/user.js');
var gcal = require('google-calendar');

exports.allevents = function ( req, res ){

	user.
    find({ email : req.user.email }).
    exec( function ( err, data ){

    	var accessToken = data[0].accessToken;
    	var googleUserId = data[0].email;
    	console.log("15cal",accessToken,googleUserId)

		var google_calendar = new gcal.GoogleCalendar(accessToken);

	    google_calendar.events.list(googleUserId, {'timeMin': new Date().toISOString()}, function(err, eventList){
	      if(err){
	        return res.status(500).json(err);
	      }
	      return res.status(200).json(eventList);
	  	});
	});

};