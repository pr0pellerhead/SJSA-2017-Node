var express = require("express");
var cors = require("cors");
var jwt = require('express-jwt');
var bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

var config = require("../config");
var DB = require("../config/db");

var AuthUploadController = require('../controllers/upload/image');

DB.Init();

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}));

var jwtCheck = () => {
    return jwt({ secret: config("jwt_secret") });
}

app.post("/upload", jwtCheck(), AuthUploadController.uploadFile);

app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') {
        res.send('Invalid token');
    }
});

app.listen(config("servers")['upload-server'].port, () => {
    console.log('Server started on port ' + config("servers")['upload-server'].port);
});