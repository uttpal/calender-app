//REST API Endpoints


var user = require('../models/user.js');
var gcal = require('google-calendar');
var url  = require('url');

exports.allevents = function ( req, res ){

    	var accessToken = req.user.accessToken;
    	var googleUserId = req.user.email;
    	console.log("15cal",accessToken,googleUserId)

		var google_calendar = new gcal.GoogleCalendar(accessToken);

	    google_calendar.events.list(googleUserId, {singleEvents: true,orderBy: 'startTime'}, 
	    	function(err, eventList){
		      if(err){
		        return res.status(500).json(err);
		      }
		      return res.status(200).json(eventList);
		  	});

exports.rangeofevents = function ( req, res ){


		var url_parts = url.parse(request.url, true);
		var query = url_parts.query;

    	var accessToken = req.user.accessToken;
    	var googleUserId = req.user.email;
    	console.log("15cal",accessToken,googleUserId)

		var google_calendar = new gcal.GoogleCalendar(accessToken);

	    google_calendar.events.list(googleUserId, {singleEvents: true,orderBy: 'startTime'}, 
	    	function(err, eventList){
		      if(err){
		        return res.status(500).json(err);
		      }
		      return res.status(200).json(eventList);
		  	});
};