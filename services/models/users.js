var mongoose = require("mongoose");

const User = mongoose.model('user', {
    fullname: String,
    handle: String, // mandatory
    email: String,
    password: String
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
        User.save({
            fullname: data.fullname,
            handle: data.handle,
            email: data.email,
            password: data.password
        });
    });
};

module.exports = {
    checkUser,
    createUser
}