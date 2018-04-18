var mongoose = require("mongoose");

const User = mongoose.model('user', {
    firstname: String,
    lastname: String,
    handle: String, // mandatory
    email: String, // mandatory
    date_of_birth: Date,
    location: {
        country: String,
        city: String,
        gps: {
            lng: Number,
            lat: Number,
        }
    },
    password: String, // mandatory
    avatar: String
});

var getAll = (cb) => {
    User.find({}, { password: 0, __v: 0 }, (err, data) => {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, data);
        return;
    });
};

var getOne = (id, cb) => {
    User.findOne({ _id: id }, { handle: 1 }, (err, data) => {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, data);
        return;
    });
}

var create = (data, cb) => {
    var u = new User(data);
    u.save((err) => {
        if (err) {
            cb(err);
            return;
        }
        cb(null);
        return;
    });
};

var remove = (id, cb) => {
    User.deleteOne({ _id: id }, (err) => {
        if (err) {
            cb(err);
            return;
        }
        cb(null);
        return;
    });
}

var userLogin = (email, password, cb) => {
    User.findOne({email: email, password: password}, (err, data) => {
        if(err){
            cb(err, null);
            return;
        }
        cb(null, data);
        return;
    });
}

module.exports = {
    getAll,
    getOne,
    create,
    remove,
    userLogin
}