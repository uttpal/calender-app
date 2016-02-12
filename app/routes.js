// app/routes.js
var calendar         = require('./apis/calendar.js'); //load endpoints

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
   
    //calendar

    app.get(  '/calendar',  ensureAuthenticated, function(req, res) {
        res.render('calendar.ejs'); 
    });

    //REST APIs

    app.get(  '/api/allevents',ensureAuthenticated,calendar.allevents );
    app.get(  '/api/rangeofevents',ensureAuthenticated,calendar.rangeofevents );


    //google+ auth routes--------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------  

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email','https://www.googleapis.com/auth/calendar'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/calendar',
                    failureRedirect : '/'
            }));


};

// ensure that user is authenticated else redirect
function ensureAuthenticated(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
