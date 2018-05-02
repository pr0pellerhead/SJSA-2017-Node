var CommentsModel = require('../../models/comments');

var createComment = (req, res) => {
    var isValid = req.params.pid != undefined
        && req.body.comment != undefined && req.body.comment.length > 0;
    if(isValid){
        var publish_date = new Date();
        var likes = [];
        var user = req.user;
        var deleted = false;
        var data = {
            publish_date: publish_date,
            likes: likes,
            comment: req.body.comment,
            user: user,
            deleted: deleted
        };
        CommentsModel.addComment(data, function(err){
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

var updateComment = (req, res) => {
    var isValid = req.params.cid != undefined
        && req.body.comment != undefined && req.body.comment.length > 0;
    if (isValid) {
        CommentsModel.updateComment(req.params.cid, req.body.comment, req.user.uid, function(err){
            if (err) {
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
    }
}

var deleteComment = (req, res) => {
    var isValid = req.params.cid != undefined;
    if (isValid) {
        CommentsModel.deleteComment(req.params.cid, req.user.uid, function (err) {
            if (err) {
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
    }
}

var getPostComments = (req, res) => {
    var isValid = req.params.pid != undefined;
    if (isValid) { 
        CommentsModel.getPostComments(req.params.pid, function(err, data){
            if (err) {
                res.status(500);
                res.send('Internal server error');
                return;
            }
            res.status(200);
            res.json(data);
            return;
        })
    } else {
        res.status(400);
        res.send('Bad request');
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getPostComments,
}