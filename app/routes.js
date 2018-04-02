// app/routes.js

module.exports = function(app, passport) {

    // HOME ========================================================

    app.get('/', function(req, res) {
        res.render('index.ejs', {
            success: req.flash('success')
        });
    });

    // LOGIN =======================================================

    // Show the login form
    app.get('/login', function(req, res) {
        res.render('login.ejs', { error: req.flash('error') });
    });

    // Process login request
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // REGISTER ====================================================

    // Show the register form
    app.get('/register', function(req, res) {
        res.render('register.ejs', { error: req.flash('error') });
    });

    // Process register request
    app.post('/register', passport.authenticate('local-register', {
        successRedirect: '/profile',
        failureRedirect: '/register',
        failureFlash: true
    }));

    // PROFILE =====================================================

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user,
            success: req.flash('success')
        });
    });

    // LOGOUT ======================================================

    app.get('/logout', function(req, res) {
        req.logout();
        req.flash('success', 'Logged out successfully.');
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}