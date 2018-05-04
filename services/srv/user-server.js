var express = require("express");
var cors = require("cors");
var jwt = require('express-jwt');
var bodyParser = require("body-parser")

var config = require("../config");
var DB = require("../config/db");

var UsersController = require('../controllers/auth/users');

DB.Init();

var app = express();
app.use(bodyParser.json());
app.use(cors());

var jwtCheck = () => {
    return jwt({ secret: config("jwt_secret") });
}

app.patch('/user/change-password', UsersController.changePassword);
app.patch('/user/avatar', UsersController.changeAvatar);
app.patch('/user/handle', UsersController.changeHandle);
app.patch('/user/:uid/follow', UsersController.follow);
app.patch('/user/:uid/unfollow', UsersController.unfollow);
app.get('/user/:uid/followers', UsersController.followers);
app.get('/user/:uid/following', UsersController.following);

app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') {
        res.send('Invalid token');
    }
});

app.listen(config("servers")['user-server'].port, () => {
    console.log('Server started on port ' + config("servers")['user-server'].port);
});