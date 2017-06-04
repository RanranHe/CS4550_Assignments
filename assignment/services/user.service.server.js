module.exports = function (app) {


    app.get("/api/user/:userId", findUserById);
    app.get('/api/user/', findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.post('/api/user', createUser);
    app.put('/api/user/:userId', updateUser);
    app.delete ('/api/user/:userId', deleteUser);


    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    function findUserByCredentials (req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        for(var u in users) {
            var user = users[u];
            if( user.username === username &&
                user.password === password) {
                res.json(user);
                return;
            }
        }
        res.send(null);
    }

    function findUserByUsername (req, res) {
        var username = req.query['username'];
        for (var u in users) {
            var user = users[u];
            if (user.username === username) {
                res.json(user);
                return;
            }
        }
        res.send(null);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (user) {
            return user._id === userId;
        });
        res.send(user);
    }

    function createUser (req, res) {
        var user = req.body;
        user._id = (new Date()).getTime() + "";
        user.created = new Date();
        users.push(user);
        res.send(user);
    }

    function updateUser (req, res) {
        var id = req.body.id;
        var newUser = req.body.newUser;
        for (var i in users) {
            if(users[i]._id === id) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                res.sendStatus(200);
            }
        }
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (user) {
            return user._id === userId;
        });
        var index = users.indexOf(user);
        users.splice(index, 1);
        res.sendStatus(200);
    }

};


