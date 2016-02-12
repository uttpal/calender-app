//REST API Endpoints


var user = require('../models/user.js');
var gcal = require('google-calendar');
var url  = require('url');

exports.allevents = function ( req, res ){

    	var accessToken = req.user.accessToken;
    	var googleUserId = req.user.email;
    	//console.log("15cal",accessToken,googleUserId)

		var google_calendar = new gcal.GoogleCalendar(accessToken);

	    google_calendar.events.list(googleUserId, {singleEvents: true,orderBy: 'startTime'}, 
	    	function(err, eventList){
		      if(err){
		        return res.status(500).json(err);
		      }
		      return res.status(200).json(eventList);
		  	});
};

exports.rangeofevents = function ( req, res ){


		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		var timeMin = query['timeMin'];
		var timeMax = query['timeMax'];
		try {
	    	timeMin = (new Date(timeMin)).toISOString();
			timeMax = (new Date(timeMax)).toISOString();
		}
		catch(err) {
		    return res.status(400).json({"error": "Unsupported time"});
		}


    	var accessToken = req.user.accessToken;
    	var googleUserId = req.user.email;
    	console.log("3333cal",query)

		var google_calendar = new gcal.GoogleCalendar(accessToken);

	    google_calendar.events.list(googleUserId, {singleEvents: true, orderBy: 'startTime', timeMin: timeMin, timeMax: timeMax}, 
	    	function(err, eventList){
		      if(err){
		        return res.status(500).json(err);
		      }
		      return res.status(200).json(eventList);
		  	});
};