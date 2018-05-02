var mongoose = require("mongoose");

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

var addComment = (data, cb) => {
    var c = new Comment(data);
    c.save(function(err){
        if(err){
            cb(err);
            return;
        }
        cb(null);
        return;
    });
}

var updateComment = (cid, comment, uid, cb) => {
    Comment.updateOne({'user.id': uid, _id: cid}, {$set: {comment: comment}}, function(err){
        if(err){
            cb(err);
            return;
        }
        cb(null);
        return;
    });
}

var deleteComment = (cid, uid, cb) => {
    Comment.deleteOne({_id: cid, 'user.id': uid}, function(err){
        if(err){
            cb(err);
            return;
        }
        cb(null);
        return;
    });
}

var getPostComments = (pid, cb) => {
    Comment.find({post_id: pid}, function(err, data){
        if(err){
            cb(err, null);
            return;
        }
        cb(null, data);
        return;
    });
}

module.exports = {
    addComment,
    updateComment,
    deleteComment,
    getPostComments,
};