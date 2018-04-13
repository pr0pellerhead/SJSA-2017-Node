var FileModel = require("../models/files");
var fs = require("fs");
const path = require('path');

var uploadFile = (req, res) => {
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
    });
    res.send("ok");
}

var getAllFiles = (req, res) => {
    FileModel.getAllFiles((err, data) => {
        if(err){
            res.status(500);
            res.send("Internal server error");
            return;
        }
        res.status(200);
        res.json(data);
    });
}

var getOneFile = (req, res) => {
    FileModel.getOneFile(req.params.id, (err, data) => {
        if (err) {
            res.status(500);
            res.send("Internal server error");
            return;
        }
        res.status(200);
        res.json(data);
    });
}

var deleteFile = (req, res) => {
    FileModel.getOneFile(req.params.id, (err, data) => {
        if(err) {
            res.status(500);
            res.send("Internal server error. Could not get file name.");
            return;
        }
        fs.unlink(path.join(__dirname, "/../uploads/", data.object_name), (err) => {
            if(err){
                res.status(500);
                res.send("Internal server error. Could not remove file from filesystem.");
                return;
            }
            FileModel.deleteFile(req.params.id, (err) => {
                if(err){
                    res.status(500);
                    res.send("Internal server error. Could not remove file from database.");
                    return; 
                }
                res.status(200);
                res.send("OK");
                return; 
            });
        });
    });
}

var downloadFile = (req, res) => {
    // *************************
    // download logic goes here!
    // *************************
    res.status(200);
    res.send("OK");
    return; 
}

module.exports = {
    uploadFile,
    getAllFiles,
    deleteFile,
    getOneFile,
    downloadFile
};