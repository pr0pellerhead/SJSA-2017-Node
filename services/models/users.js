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

var changePassword = (id, old_pwd, new_pwd, cb) => {
    console.log('pero');
    User.update({_id: id, password: old_pwd}, {$set: {password: new_pwd}}, function(err){
        if(err){
            cb(err);
            return;
        }
        cb(null);
        return;
    });
};

var changeAvatar = (id, avatar, cb) => {
    User.update({_id: id}, {$set: {avatar: avatar}}, function(err){
        if (err) {
            cb(err);
            return;
        }
        cb(null);
        return;
    });
};

var changeHandle = (id, handle, cb) => {
    User.update({_id: id}, {$set: {handle: handle}}, function(err){
        if (err) {
            cb(err);
            return;
        }
        cb(null);
        return;
    });
};

var follow = (id, data, cb) => {
    return new Promise(function(resolve, reject){
        User.update({_id: id}, {$addToSet: {followers: data}}, function(err){
            if (err) {
                return reject(err);
            }
            return resolve(null);
        });
    })
};

var following = (id, data, cb) => {
    return new Promise(function (resolve, reject) {
        User.update({ _id: id }, { $addToSet: { following: data } }, function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(null);
        });
    })
};

var unfollow = (id, data, cb) => {
    return new Promise(function(resolve, reject){
        User.update({_id: id}, {$pull: {followers: data}}, function(err){
            if (err) {
                return reject(err);
            }
            return resolve(null);
        });
    })
};

var unfollowing = (id, data, cb) => {
    return new Promise(function (resolve, reject) {
        User.update({ _id: id }, { $pull: { following: data } }, function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(null);
        });
    })
};

var getFollowing = (uid, cb) => {
    return new Promise(function (resolve, reject) {
        User.findOne({_id: uid}, {following: 1}, function (err, data) {
            if (err){
                return reject(err);
            }
            return resolve(data);
        });
    })
};

module.exports = {
    checkUser,
    createUser,
    validateUser,
    changePassword,
    changeAvatar,
    follow,
    unfollow,
    following,
    unfollowing,
    getFollowing,
    changeHandle
}