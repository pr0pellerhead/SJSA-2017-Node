var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var config = require("./config");
var DB = require("./config/db");
const fileUpload = require('express-fileupload');

var userControllers = require("./controllers/users");
var fileControllers = require("./controllers/files");

DB.Init();

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());


/*************************************/
/************ user routes ************/
/*************************************/

// get all users
app.get("/api/users", userControllers.getAllUsers);
// get specified user
app.get("/api/users/:id", userControllers.getSingleUser);
// create new user
app.post("/api/users", userControllers.createUser);
// deactivate a user
app.delete("/api/users/:id", userControllers.deleteUser);
// manage file uploads
app.post("/api/files", fileControllers.uploadFile);

app.listen(config("server").port, () => {
    console.log('Server started on port ' + config("server").port);
});
