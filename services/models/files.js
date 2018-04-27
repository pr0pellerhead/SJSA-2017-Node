var mongoose = require("mongoose");

const File = mongoose.model('file', {
    file_name: String, // original file name
    object_name: String, // prefixed file name
    mime: String, // mimetype
    md5: String, // md5 hash
    user_id: String
});

var addFile = (fileData, cb) => {
    var f = new File(fileData)
    f.save((err) => {
        if (err) {
            cb(err);
            return;
        }
        cb(null);
    });
}

module.exports = {
    addFile
}