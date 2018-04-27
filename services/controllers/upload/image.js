var FileModel = require("../../models/files");
var fs = require("fs");
const path = require('path');

var uploadFile = (req, res) => {
    var allowedTypes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
    var maxFilesize = 1024 * 1024 * 5;
    var file = req.files.image;
    if(!allowedTypes.includes(file.mimetype)){
        res.status(400);
        res.send("Bad Request. Filetype not allowed.");
        return;
    }
    file.mv(__dirname + "/../../uploads/" + file.md5 + '_' + file.name, (err) => {
        if (err) {
            console.error('Could not upload file!');
            return;
        }
        var fileData = {
            file_name: file.name,
            object_name: file.md5 + "_" + file.name,
            mime: file.mimetype,
            md5: file.md5,
            user_id: req.user.uid
        };
        FileModel.addFile(fileData, function (err) {
            if (err) {
                res.status(500);
                res.send("Internal server error");
                return;
            }
            res.status(200);
            res.send("OK");
            return;
        });
    });
}

module.exports = {
    uploadFile
}