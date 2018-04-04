var UserModel = require("../models/users");

var getAllUsers = (req, res) => {
   UserModel.getAll((err, data) => {
        if(err){
            res.status(500);
            res.send("Internal server error");
            return;
        }
       res.status(200);
       res.json(data);
       return;
   });
};

var getSingleUser = (req, res) => {
    UserModel.getOne(req.params.id, (err, data) => {
        if(err){
            res.status(500);
            res.send("Internal server error");
            return;
        }
        res.status(200);
        res.json(data);
        return;
    });
};

var createUser = (req, res) => {
    var isValid =
        req.body.handle != undefined && req.body.handle != "" &&
        req.body.email != undefined && req.body.email != "" &&
        req.body.password != undefined && req.body.password != "";

    if (isValid) {
        UserModel.create(req.body, (err) => {
            if(err){
                res.status(500);
                res.send("Internal server error");
                return;
            }
            res.status(200);
            res.send("OK");
            return;
        });
    } else {
        res.status(400);
        res.send("Bad request");
        return;
    }
};

var deleteUser = (req, res) => {
    UserModel.remove(req.params.id, (err) => {
        if (err) {
            res.status(500);
            res.send("Internal server error");
            return;
        }
        res.status(200);
        res.send("OK");
        return;
    });
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser
}