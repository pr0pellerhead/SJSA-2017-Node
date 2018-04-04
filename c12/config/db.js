var mongoose = require("mongoose");

var Init = () => {
    mongoose.connect("mongodb://127.0.0.1/reactgram", (err) => {
        if (err) {
            console.error('Could not connect to database');
            console.error(err);
        }
    });
};

module.exports = {
    Init
};