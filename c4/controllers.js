// users datastore
var DATA = [];

var GetAllUsers = function (req, res) {
    res.writeHead(200, 'OK');
    res.end(JSON.stringify(DATA));
};

var GetSingleUser = function (req, res) {
    var url = req.url.split('/');
    var id = parseInt(url[url.length - 1]);

    if (DATA[id] != undefined) {
        res.writeHead(200, 'OK');
        res.end(JSON.stringify(DATA[id]));
    } else {
        res.writeHead(404, 'Not Found');
        res.end('Not Found');
    }
};

var AddUser = function (req, res) {
    var d = '';

    req.on('data', function (data) {
        d += data;
    });

    req.on('end', function () {
        DATA.push(JSON.parse(d));
        res.writeHead(200, 'OK');
        res.end('POST USERS');
    });
};

var DeleteUser = function (req, res) {
    var url = req.url.split('/');
    var id = parseInt(url[url.length - 1]);

    if (DATA[id] != undefined) {
        // delete DATA[id];
        DATA.splice(id, 1);
        res.writeHead(200, 'OK');
        res.end('');
    } else {
        res.writeHead(404, 'Not Found');
        res.end('Not Found');
    }
};

var EditUser = function (req, res) {
    var url = req.url.split('/');
    var id = parseInt(url[url.length - 1]);
    var d = '';

    req.on('data', function (data) {
        d += data;
    });

    req.on('end', function () {
        if (DATA[id] != undefined) {
            DATA[id] = JSON.parse(d);
            res.writeHead(200, 'OK');
            res.end('POST USERS');
        } else {
            res.writeHead(404, 'Not Found');
            res.end('Not Found');
        }
    });
};

var UpdateUser = function (req, res) {
    var d = '';
    var url = req.url.split('/');

    var id = parseInt(url[url.length - 2]);
    var property = url[url.length - 1];

    req.on('data', function (data) {
        d += data;
    });

    req.on('end', function () {
        if (DATA[id] != undefined && JSON.parse(d)[property] != undefined) {
            DATA[id][property] = JSON.parse(d)[property];
            res.writeHead(200, 'OK');
            res.end('');
        } else {
            res.writeHead(404, 'Not Found');
            res.end('Not Found');
        }
    });
};

module.exports = {GetAllUsers, GetSingleUser, AddUser, DeleteUser, EditUser, UpdateUser};