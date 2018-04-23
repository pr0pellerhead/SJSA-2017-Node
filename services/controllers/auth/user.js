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
                handle: data.handle
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
        email: req.user.email,
        handle: req.user.handle
    };
    var token = jwt.sign(claims, config("jwt_secret"));
    res.status(200);
    res.json({ token: token });
}

module.exports = {
    createUser,
    login,
    renewToken
}