var http = require('http');

// users datastore
var DATA = [];

function URLToRegex(url) {
    var output = url.replace(new RegExp('/', 'g'), '\\/')
        .replace(new RegExp('{num}', 'g'), '[0-9]+')
        .replace(new RegExp('{alnum}', 'g'), '[a-z0-9]+')
        .replace(new RegExp('{alpha}', 'g'), '[a-z]+')

    return '^' + output + '$';
}

var routes = {GET: [], POST: [], PATCH: [], PUT: [], DELETE: []};

// Get all users from the datastore
routes.GET['/users'] = function (req, res) {
    res.writeHead(200, 'OK');
    res.end(JSON.stringify(DATA));
};

// Get user by ID
routes.GET['/users/{num}'] = function (req, res) {
    var url = req.url.split('/');
    var id = parseInt(url[url.length - 1]);

    if(DATA[id] != undefined){
        res.writeHead(200, 'OK');
        res.end(JSON.stringify(DATA[id]));
    } else {
        res.writeHead(404, 'Not Found');
        res.end('Not Found');
    }
};

// Create/add new user to the datastore
routes.POST['/users'] = function (req, res) {
    var d = '';

    req.on('data', function(data){
        d += data;
    });

    req.on('end', function(){
        DATA.push(JSON.parse(d));
        res.writeHead(200, 'OK');
        res.end('POST USERS');
    });
};

// Delete user from the datastore
routes.DELETE['/users/{num}'] = function(req, res){
    var url = req.url.split('/');
    var id = parseInt(url[url.length - 1]);

    if(DATA[id] != undefined){
        // delete DATA[id];
        DATA.splice(id, 1);
        res.writeHead(200, 'OK');
        res.end('');
    } else {
        res.writeHead(404, 'Not Found');
        res.end('Not Found');
    }
}

// Update complete user data
routes.PUT['/users/{num}'] = function (req, res) {
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
}

// Update part od user's data
routes.PATCH['/users/{num}/(firstname|lastname|birtdate|password|email)'] = function (req, res) {
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
}

http.createServer(function (req, res) {
    var error = true;

    for(i in routes[req.method]){
        var regex = new RegExp(URLToRegex(i));

        if (regex.test(req.url)) {
            if (typeof routes[req.method][i] == 'function'){
                error = false;
                routes[req.method][i](req, res);
            } else {
                res.writeHead(500, 'Internal Server Error');
                res.end('');
            }
            break;
        }
    }

    if(error){
        res.writeHead(404, 'Not Found');
        res.end('Not Found');
    }
}).listen(3000);
