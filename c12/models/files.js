var mongoose = require("mongoose");

const File = mongoose.model('file', {
    file_name: String, // original file name
    object_name: String, // prefixed file name
    mime: String, // mimetype
    md5: String, // md5 hash
});

var addFile = (fileData, cb) => {
    var f = new File(fileData)
    f.save((err) => {
        if(err){
            cb(err);
            return;
        }
        cb(null);
    });
}

var deleteFile = (id, cb) => {
    File.remove({_id: id}, (err) => {
        if(err){
            cb(err);
            return;
        }
        cb(null);
        return;
    });
}

var getAllFiles = (cb) => {
    File.find({}, (err, data) => {
        if(err){
            cb(err, null);
            return;
        }
        cb(null, data);
        return;
    });
}

var getOneFile = (id, cb) => {
    File.findOne({_id: id}, (err, data) => {
        if (err) {
            cb(err, null);
            return;
        }
        cb(null, data);
        return;
    });
}

module.exports = {
    addFile,
    deleteFile,
    getAllFiles,
    getOneFile
}