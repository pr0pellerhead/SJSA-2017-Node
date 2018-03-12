var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    var path = './public' + req.url;

    if (fs.existsSync(path)) {

        var body = fs.readFile(path, function(err, content){
            res.writeHead(200, 'OK');
            res.end(content);
        })

    } else {
        res.writeHead(404, 'Not Found');
        res.end('Not Found');
    }

}).listen(8000);