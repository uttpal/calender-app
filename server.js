/**
 * application on ExpressJS, Node, MongoDb.
 * @developer Kumar Uttpal
 */


//server.js

// Set-Up --------------------------------------------------------------------------

//setting all required modules and files


var express  	 = require('express');
var app      	 = express();
var port     	 = process.env.PORT || 8080; 			//environment port else
var mongoose 	 = require('mongoose');
var passport 	 = require('passport');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB 	 = require('./config/database.js');

// configuration 

mongoose.connect(configDB.url); 						// connect to database
require('./config/passport')(passport); 				// passport configuration


// application setup
app.use(morgan('dev')); 								// request logger
app.use(cookieParser()); 								// get user cookie for auth
app.use(bodyParser.json()); 							// extract info from form
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs'); 									

// auth requirements
app.use(session({ secret: 'mysupercalender' })); 	// secret key
app.use(passport.initialize());
app.use(passport.session()); 							// persistent login sessions


// routes-------------------------------------------------------------------------
require('./app/routes.js')(app, passport); 				// load our routes with passport

// launching ---------------------------------------------------------------------
app.listen(port);
console.log('Have Fun calendering on' + port);


