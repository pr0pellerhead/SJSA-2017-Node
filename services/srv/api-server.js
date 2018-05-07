var express = require("express");
var cors = require("cors");
var jwt = require('express-jwt');
var bodyParser = require("body-parser")

var config = require("../config");
var DB = require("../config/db");

var PostController = require('../controllers/post/post');
var CommentController = require('../controllers/comment/comment');

DB.Init();

var app = express();
app.use(bodyParser.json());
app.use(cors());

var jwtCheck = () => {
    return jwt({ secret: config("jwt_secret") });
}

// post routes
app.post('/post', jwtCheck(), PostController.createPost);
app.patch('/post/:pid', jwtCheck(), PostController.updatePost);
app.delete('/post/:pid', jwtCheck(), PostController.deletePost);
app.get('/post/:pid', jwtCheck(), PostController.getPost);
app.get('/feed/:uid', jwtCheck(), PostController.getAllUserPosts);
app.get('/feed', jwtCheck(), PostController.getFeed);

// comment routes
app.post('/post/:pid/comments', jwtCheck(), CommentController.createComment);
app.patch('/comments/:cid', jwtCheck(), CommentController.updateComment);
app.delete('/comments/:cid', jwtCheck(), CommentController.deleteComment);
app.get('/post/:pid/comments', jwtCheck(), CommentController.getPostComments);

app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') {
        res.send('Invalid token');
    }
});

app.listen(config("servers")['api-server'].port, () => {
    console.log('Server started on port ' + config("servers")['api-server'].port);
});