var mongoose = require("mongoose");

const User = mongoose.model('user', {
    fullname: String,
    handle: String, 
    email: String,
    password: String,
    avatar: String,
    followers: [
        {
            id: String,
            handle: String,
            avatar: String
        }
    ],
    following: [
        {
            id: String,
            handle: String,
            avatar: String
        }
    ],
});

var checkUser = (email, handle) => {
    return new Promise((resolve, reject) => {
        User.findOne({$or: [{email: email}, {handle: handle}]}, (err, data) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
};

var createUser = (data) => {
    return new Promise((resolve, reject) => {
        data.password = data.pwd1;
        var user = new User(data);
        user.save(function(err) {
            if(err){
                return reject(err);
            }
            return resolve();
        });
    });
};

var validateUser = (email, password, cb) => {
    User.findOne({email: email, password: password}, function (err, data) {
        if(err){
            cb(err, null);
            return;
        }
        cb(null, data);
    });
}

module.exports = {
    checkUser,
    createUser,
    validateUser
}