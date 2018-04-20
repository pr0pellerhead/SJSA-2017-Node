var UserModel = require('../../models/users');

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
        UserModel.checkUser(email, handle)
            .then((data) => {
                if(data != null){
                    return new Error('Similar user already exists!');
                }
                return UserModel.createUser(req.body);
            })
            .then((data) => {
                
            })
            .catch((err) => {
                res.status(400);
                res.send("Bad Request");
                break;
            });

        res.status(200);
        res.send("OK");
        break;
    }
    res.status(400);
    res.send("Bad Request");
    break;
}

var login = (req, res) => {
    res.status(200);
    res.send("OK");
}

var renewToken = (req, res) => {
    res.status(200);
    res.send("OK");
}

module.exports = {
    createUser,
    login,
    renewToken
}