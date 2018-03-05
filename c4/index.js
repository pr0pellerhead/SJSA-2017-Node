var http = require('http');

function URLToRegex(url) {
    var output = url.replace(new RegExp('/', 'g'), '\\/')
        .replace(new RegExp('{num}', 'g'), '[0-9]+')
        .replace(new RegExp('{alnum}', 'g'), '[a-z0-9]+')
        .replace(new RegExp('{alpha}', 'g'), '[a-z]+')

    return '^' + output + '$';
}

var routes = {GET: [], POST: [], PATCH: [], PUT: [], DELETE: []};

routes.GET['/users'] = function (req, res) {
    res.writeHead(200, 'OK');
    res.end('GET ALL USERS');
};

routes.GET['/users/{num}'] = function (req, res) {
    res.writeHead(200, 'OK');
    res.end('GET SINGLE USER');
};

routes.POST['/users'] = function (req, res) {
    res.writeHead(200, 'OK');
    res.end('POST USERS');
};

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
