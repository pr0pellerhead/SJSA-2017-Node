var mongoose = require("mongoose");
var config = require("./index");

var Init = () => {
    var dbname = config("database").dbname;
    var host = config("database").host;
    var connectionString = "mongodb://" + host + "/" + dbname;
    mongoose.connect(connectionString, (err) => {
        if (err) {
            console.error('Could not connect to database');
            console.error(err);
        }
    });
};

module.exports = {
    Init
};