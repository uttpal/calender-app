// app/routes.js

module.exports = function(app, passport) {

    //homepage
    app.get('/', function(req, res) {
        res.render('index.ejs'); 
    });

    //local auth routes-------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    
    //login form
    app.get('/login', function(req, res) {
        res.render('login.ejs'); 
    });

    //signup
    app.get('/signup', function(req, res) {

        res.render('signup.ejs');
    });

   //logout
   app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    //google+ auth routes--------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------  

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

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
