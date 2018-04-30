var express = require("express");
var cors = require("cors");
var jwt = require('express-jwt');
var bodyParser = require("body-parser")

var config = require("../config");
var DB = require("../config/db");

DB.Init();

var app = express();
app.use(bodyParser.json());
app.use(cors());

var jwtCheck = () => {
    return jwt({ secret: config("jwt_secret") });
}

// post routes
app.post('/post', function(){});
app.patch('/post/:pid', function(){});
app.delete('/post/:pid', function(){});
app.get('/post/:pid', function(){});
app.get('/post/:uid/:pid', function(){});
app.get('/feed', function(){});

// comment routes
app.post('/comments', function(){});
app.patch('/comments/:cid', function(){});
app.get('/comments/:pid/comments', function(){});
app.delete('/comments/:cid', function(){});


app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') {
        res.send('Invalid token');
    }
});

app.listen(config("servers")['auth-server'].port, () => {
    console.log('Server started on port ' + config("servers")['auth-server'].port);
});