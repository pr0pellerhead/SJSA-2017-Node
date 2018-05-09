var UserModel = require('../../models/users');
var jwt = require("jsonwebtoken");
var config = require("../../config");

var createUser = (req, res) => {
    var isValid = req.body.fullname != undefined
                && req.body.fullname.length > 0
                && req.body.email != undefined
                && req.body.email.length > 0
                && req.body.pwd1 != undefined
                && req.body.pwd1.length > 0
                && req.body.pwd2 != undefined
                && req.body.pwd2.length > 0
                && req.body.handle != undefined
                && req.body.handle.length > 0
                && req.body.pwd1 == req.body.pwd2;
    if(isValid){
        UserModel.checkUser(req.body.email, req.body.handle)
            .then((data) => {
                if(data != null){
                    console.log('conflict');
                    throw new Error('Similar user already exists!');
                }
                return UserModel.createUser(req.body);
            })
            .then(() => {
                res.status(200);
                res.send("OK");
                return;
            })
            .catch((err) => {
                res.status(409);
                res.send("Conflict");
                return;
            });
    } else {
        res.status(400);
        res.send("Bad Request");
        return;
    }
}

var login = (req, res) => {
    var isValid = req.body.email != undefined
        && req.body.email.length > 0
        && req.body.password != undefined
        && req.body.password.length > 0;
    if(isValid){
        UserModel.validateUser(req.body.email, req.body.password, function (err, data) {
            if(err) {
                res.status(500);
                res.send("Internal Server Error");
                return;
            }
            if(data == null){
                res.status(404);
                res.send("Not Found");
                return;
            }
            // generate token!
            var claims = {
                uid: data._id,
                email: data.email,
                handle: data.handle,
                avatar: data.avatar
            };
            var token = jwt.sign(claims, config("jwt_secret"));
            res.status(200);
            res.json({ token: token });
            return;
        });
    } else {
        res.status(400);
        res.send("Bad Request");
        return;
    }
}

var renewToken = (req, res) => {
    var claims = {
        uid: req.user.uid,
        handle: req.user.handle,
        avatar: req.user.avatar,
    };
    var token = jwt.sign(claims, config("jwt_secret"));
    res.status(200);
    res.json({ token: token });
}

var changePassword = (req, res) => {
    var isValid = req.body.old_pwd != undefined 
        && req.body.pwd1 != undefined && req.body.pwd1.length > 0
        && req.body.pwd2 != undefined && req.body.pwd2.length > 0
        && req.body.pwd1 == req.body.pwd2;

        
        if(isValid){
            UserModel.changePassword(req.user.uid, req.body.old_pwd, req.body.pwd1, function(err){
            if(err){
                res.status(500);
                res.send('Internal server error');
                return;
            }
            res.status(200);
            res.send('OK');
            return;
        })
    } else {
        res.status(400);
        res.send('Bad request');
        return;
    }
}

var changeAvatar = (req, res) => {
    var isValid = req.body.avatar != undefined && req.body.avatar.length > 0;
    console.log (isValid)
    if(isValid){
        UserModel.changeAvatar(req.user.uid, req.body.avatar, function(err){
            if (err) {
                res.status(500);
                res.send('Internal server error');
                return;
            }
            res.status(200);
            res.send('OK');
            return;
        });
    } else {
        res.status(400);
        res.send('Bad request');
    }
}

var changeHandle = (req, res) => {
    var isValid = req.body.handle != undefined && req.body.handle.length > 0;
    if (isValid) {
        UserModel.changeHandle(req.user.uid, req.body.handle, function (err) {
            console.log(isValid);
            if (err) {
                res.status(500);
                res.send('Internal server error');
                return;
            }
            res.status(200);
            res.send('OK');
            return;
        });
    } else {
        res.status(400);
        res.send('Bad request');
    }
}

var follow = (req, res) => {
    var isValid = req.params.uid != undefined && req.params.uid.length > 0;
    if(isValid){
        var data = {
            uid: req.user.uid,
            avatar: req.user.avatar,
            handle: req.user.handle,
        };
        
    } else {
        res.status(400);
        res.send('Bad request');
    }
}

var unfollow = (req, res) => {
    var isValid = req.params.uid != undefined && req.params.uid.length > 0;
    if (isValid) {
        var data = {
            uid: req.user.uid,
            avatar: req.user.avatar,
            handle: req.user.handle,
        };
        
    } else {
        res.status(400);
        res.send('Bad request');
    }
}

var followers = (req, res) => {
    res.status(200);
    res.send('OK');
}

var following = (req, res) => {
    res.status(200);
    res.send('OK');
}

module.exports = {
    createUser,
    login,
    renewToken,
    changePassword,
    changeAvatar,
    changeHandle,
    follow,
    unfollow,
    followers,
    following,
}