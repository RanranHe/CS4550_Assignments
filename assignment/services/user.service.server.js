module.exports = function (app, models) {
    var userModel = models.userModel;
    //
    // var facebookConfig = {
    //     clientID: process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    //     profileFields: ['id', 'last_name', 'first_name', 'email']
    // };

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    // var FacebookStrategy = require('passport-facebook').Strategy;

    var bcrypt = require("bcrypt-nodejs");

    passport.use(new LocalStrategy(localStrategy));
    // passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.post("/api/login", passport.authenticate('local'), login);
    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebook', {
    //         successRedirect: '/assignment/#/profile',
    //         failureRedirect: '/assignment/#/login'
    //     }));
    app.get('/api/checkLoggedIn', checkLoggedIn);
    app.get("/api/loggedin", loggedin);
    app.post("/api/logout", logout);
    app.post ('/api/assignment/register', register);

    app.get("/api/user/:userId", findUserById);
    app.get('/api/user/', findUserByUsername);
    app.get("/api/assignment/user/", findUserByCredentials);
    app.post('/api/user', createUser);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    ////////////////////// Login /////////////////////////
    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function checkLoggedIn(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function loggedin(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }


    // var FacebookStrategy = require('passport-facebook').Strategy;
    // var facebookConfig = {
    //     clientID     : process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    // };
    //
    //
    // app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebook', {
    //         successRedirect: '/assignment/index.html#!/user',
    //         failureRedirect: '/assignment/index.html#!/login'
    //     }));
    //
    // passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    //
    // function facebookStrategy(token, refreshToken, profile, done) {
    //     userModel
    //         .findUserByFacebookId(profile.id)
    //         .then(function (user) {
    //             if (!user) {
    //                 var newUser = {
    //                     username: profile.displayName,
    //                     facebook: {
    //                         id: profile.id,
    //                         token: token
    //                     }
    //                 };
    //
    //                 return userModel
    //                     .createUser(newUser)
    //                     .then(function (response) {
    //                         return done(null, response);
    //                     })
    //             } else {
    //                 return userModel
    //                     .updateFacebookToken(user._id, profile.id, token)
    //                     .then(function (response) {
    //                         return done(null, user);
    //                     })
    //             }
    //         })
    // }
    ////////////////////// Logout /////////////////////////
    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    ////////////////////// Register/////////////////////////
    function register(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                req.login(user, function (status) {
                    res.json(user);
                });
            });
    }

    ///////////////////////////////////////////////////////
    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user !== null) {
                    res.json(user);
                } else {
                    res.send(null);
                }
            }, function (err) {
                res.send(null);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];

        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.send(null);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.send(null);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            });
    }

    function updateUser(req, res) {
        var id = req.body.id;
        var newUser = req.body.newUser;
        userModel
            .updateUser(id, newUser)
            .then(function (user) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(404).send("Unable to update User")
                });
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(404).send("Unable to remove user");

                });
    }
    /////////////////////////////////////////////////////////////////////////
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
};


