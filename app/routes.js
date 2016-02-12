// app/routes.js
var calender         = require('./apis/calender.js'); //load endpoints

module.exports = function(app, passport) {

    //homepage
    app.get('/', function(req, res) {
        res.render('index.ejs'); 
    });


   //logout
   app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
   
    //calender

    app.get(  '/calender',  ensureAuthenticated, function(req, res) {
        res.render('calender.ejs'); 
    });

    //REST APIs

    app.get(  '/api/allevents',ensureAuthenticated,calender.allevents );
    app.get(  '/api/rangeofevents',ensureAuthenticated,calender.allevents );


    //google+ auth routes--------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------  

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email','https://www.googleapis.com/auth/calendar'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/calender',
                    failureRedirect : '/'
            }));


};

// ensure that user is authenticated else redirect
function ensureAuthenticated(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
