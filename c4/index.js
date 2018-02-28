var http = require('http');

var routes = {GET: [], POST: [], PATCH: [], PUT: [], DELETE: []};

routes.GET['/users'] = function (req, res) {
    res.writeHead(200, 'OK');
    res.end('GET USERS');
};

// routes.GET['^\/users\/[0-9]+$'] = function (req, res) {
routes.GET['/users/[0-9]'] = function (req, res) {
    res.writeHead(200, 'OK');
    res.end('GET ALL USERS');
};

routes.POST['/users'] = function (req, res) {
    res.writeHead(200, 'OK');
    res.end('POST USERS');
};

http.createServer(function (req, res) {
    if(typeof routes[req.method][req.url] == 'function'){
        routes[req.method][req.url](req, res);
    } else {
        res.writeHead(404, 'NOT FOUND');
        res.end();    
    }
}).listen(3000);

// /users/12345
// /users/67890
// /users/12345/firstname
// /users/67890/lastname
// /users/67890/birthday
// /users

// ^\/users\/[0-9]+$
// ^\/users\/[0-9]+\/(firstname|lastname|birthday)$
// ^\/users\/[0-9]+\/[a-z]+$
