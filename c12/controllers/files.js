var FileModel = require("../models/files");

var uploadFile = (req, res) => {
    // console.log(req.files.dokument);
    // console.log(req.files.dokument.name);
    // console.log(req.files.dokument.encoding);

    var file = req.files.dokument;

    file.mv(__dirname + "/../uploads/" + file.name, (err) => {
        if(err){
            console.error('Could not upload file!');
            return;
        }

        var fileData = {
            file_name: file.name,
            object_name: file.md5 + "_" +file.name,
            mime: file.mimetype,
            md5: file.md5
        };

        FileModel.addFile(fileData);
        console.log('File uploaded!');
    });

    res.send("ok");
}

module.exports = {uploadFile};