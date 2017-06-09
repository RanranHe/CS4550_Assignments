module.exports = function (app, models) {
    var userModel = models.userModel;

    app.get("/api/user/:userId", findUserById);
    app.get('/api/user/', findUserByUsername);
    app.get("/api/assignment/user/", findUserByCredentials);
    app.post('/api/user', createUser);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);


    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

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
                    // res.sendStatus(404);
                }
            }, function (err) {
                res.send(null);
                // res.sendStatus(404);
            });
        // var username = req.query['username'];
        // var password = req.query['password'];
        // for(var u in users) {
        //     var user = users[u];
        //     if( user.username === username &&
        //         user.password === password) {
        //         res.json(user);
        //         return;
        //     }
        // }
        // res.send(null);
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];

        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                // res.status(400).send(err);
                res.send(null);
            });
        // var username = req.query['username'];
        // for (var u in users) {
        //     var user = users[u];
        //     if (user.username === username) {
        //         res.json(user);
        //         return;
        //     }
        // }
        // res.send(null);
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
                    // res.status(400).send(err);
                }
            );
        // var userId = req.params.userId;
        // var user = users.find(function (user) {
        //     return user._id === userId;
        // });
        // res.send(user);
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
        // var id = req.body.id;
        // var newUser = req.body.newUser;
        // for (var i in users) {
        //     if(users[i]._id === id) {
        //         users[i].firstName = newUser.firstName;
        //         users[i].lastName = newUser.lastName;
        //         res.sendStatus(200);
        //     }
        // }
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
        // var userId = req.params.userId;
        // var user = users.find(function (user) {
        //     return user._id === userId;
        // });
        // var index = users.indexOf(user);
        // users.splice(index, 1);
        // res.sendStatus(200);
    }

};


