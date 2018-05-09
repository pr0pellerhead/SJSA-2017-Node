var mongoose = require("mongoose");

const Post = mongoose.model('posts', {
    user: {
        uid: String,
        handle: String,
        avatar: String
    },
    description: String,
    tags: [{type: String}],
    picture: String,
    publish_date: Date,
    deleted: Boolean,
    likes: [
        { 
            id: String, 
            handle: String 
        }
    ]
});

var addPost = (data, cb) => {
    var p = new Post(data);
    p.save((err) => {
        if(err){
            cb(err);
            return;
        }
        cb(null);
        return;
    });
};

var updatePost = (uid, pid, data, cb) => {
    Post.updateOne({_id: pid, 'user.id': uid}, {$set: {description: data.description, tags: data.tags}}, (err) => {
        if (err) {
            cb(err); var mongoose = require("mongoose");

            const Comment = mongoose.model('comments', {
                post_id: String,
                publish_date: Date,
                likes: [
                    {
                        id: String,
                        handle: String
                    }
                ],
                comment: String,
                user: {
                    id: String,
                    handle: String,
                    avatar: String
                },
                deleted: Boolean
            });
            return;
        }
        cb(null);
        return;
    });
};

var deletePost = (uid, pid, cb) => {
    Post.updateOne({_id: pid, 'user.uid': uid}, {$set: {deleted: true}}, (err) => {
        if (err) {
            cb(err);
            return;
        }
        cb(null);
        return;
    });
};

var getPost = (pid, cb) => {
    Post.findOne({_id: pid, deleted: false}, (err, data) => {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, data);
        return;
    });
}

var getAllUserPosts = (uid, cb) => {
    Post.find({ 'user.id': uid, deleted: false }, (err, data) => {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, data);
        return;
    });
}

var getFollowingPost = (ids) => {
    return new Promise (function (resolve, reject) {
        Post.find({ "user.uid": { $in: ids } }, {}, { sort: { publish_date: -1 } }, (err, data) => {
            if (err) {
                return reject(err);
            }          
            return resolve(data);
        });
    })
}


module.exports = {
    addPost,
    updatePost,
    deletePost,
    getPost,
    getAllUserPosts,
    getFollowingPost
}