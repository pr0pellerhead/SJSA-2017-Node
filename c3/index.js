var fs = require('fs');
var http = require('http');

// fs.writeFile('poraka.txt', 'NodeJs е најдобар јазик на свет... и пошироко...', (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
// });

// fs.appendFile('poraka.txt', 'nova linija', (err) => {
//     if (err) throw err;
//     console.log('The "data to append" was appended to file!');
// });

// fs.readFile('users.json', 'utf8', (err, data) => {
//     // console.log(data);
//     var jsonData = JSON.parse(data);
//     // console.log(jsonData);

//     jsonData.forEach((user, i) => {
//         console.log('Name: ' + user.name + '\t' + 'Lastname: ' + user.lastname + '\t' + 'Email: ' + user.email + '\t' + 'Password: ' + user.password);
//     });
// });

// http.createServer(function (request, response) { // req, res | r, w
//     if(request.url === '/hello'){
//         response.writeHead(200, 'OK');
//         response.end('Hello World!');
//     } else {
//         response.writeHead(404, 'Not Found');
//         response.end('Page not found...');
//     }
// }).listen(3000); // 1337

// http://localhost:3000/hello -> HELLO WORLD
// http://localhost:3000/
// http://localhost:3000/ruwyeiurywe
// http://localhost:3000/gc764d782ho876 // 404 NOT FOUND


http.createServer(function (request, response) { // req, res | r, w
    var filepath = '.' + request.url + '.json';
    fs.exists(filepath, function(e){
        if(e){
            fs.readFile(filepath, function(err, data){
                if(!err){
                    response.writeHead(200, 'OK');
                    response.end(data + '\n');
                }
            });
        } else {
            response.writeHead(404, 'NOT FOUND');
            response.end('The URL you requested does not exist\n');
        }
    });
}).listen(3000); // 1337


http://192.168.100.81/

