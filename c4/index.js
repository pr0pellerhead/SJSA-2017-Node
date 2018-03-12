var http = require('http');
var controllers = require('./controllers');
var utils = require('./utils');

var routes = {GET: [], POST: [], PATCH: [], PUT: [], DELETE: []};

// Get all users from the datastore
routes.GET['/users'] = controllers.GetAllUsers;
// Get user by ID
routes.GET['/users/{num}'] = controllers.GetSingleUser;
// Create/add new user to the datastore
routes.POST['/users'] = controllers.AddUser;
// Delete user from the datastore
routes.DELETE['/users/{num}'] = controllers.DeleteUser;
// Update complete user data
routes.PUT['/users/{num}'] = controllers.EditUser;
// Update part od user's data
routes.PATCH['/users/{num}/(firstname|lastname|birtdate|password|email)'] = controllers.UpdateUser;

http.createServer(function (req, res) {

    if(req.method == 'OPTIONS'){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.end('');
        return;
    }

    var error = true;

    for(i in routes[req.method]){
        var regex = new RegExp(utils.URLToRegex(i));

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
