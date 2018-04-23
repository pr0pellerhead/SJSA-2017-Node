var express = require("express");
var cors = require("cors");
var jwt = require('express-jwt');
var bodyParser = require("body-parser")

var config = require("../config");
var DB = require("../config/db");

var AuthUsersController = require('../controllers/auth/user');

DB.Init();

var app = express();
app.use(bodyParser.json());
app.use(cors());

var jwtCheck = () => {
    return jwt({ secret: config("jwt_secret") });
}

app.post("/create", AuthUsersController.createUser);
app.post("/login", AuthUsersController.login);
app.get("/renew-token", jwtCheck(), AuthUsersController.renewToken);

app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') {
        res.send('Invalid token');
    }
});

app.listen(config("servers")['auth-server'].port, () => {
    console.log('Server started on port ' + config("servers")['auth-server'].port);
});