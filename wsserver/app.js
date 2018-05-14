var express = require("express");
const WebSocket = require('ws');

// web server
app = express();
app.use('/', express.static('wsserver/public'));
app.listen(8000);

// web socket server
const wss = new WebSocket.Server({
    port: 8080,
    perMessageDeflate: {
        zlibDeflateOptions: {chunkSize: 1024, memLevel: 7, level: 3},
        zlibInflateOptions: {chunkSize: 10 * 1024},
        clientNoContextTakeover: true,
        serverNoContextTakeover: true,
        clientMaxWindowBits: 10,
        serverMaxWindowBits: 10,
        concurrencyLimit: 10,
        threshold: 1024,               
    }
});

var connections = [];

wss.on('connection', function connection(ws) {
    var user = {
        conn: ws,
        handle: ''
    };
    connections.push(user);
    var initMsg = {type: 'chat', data: 'welcome'};
    ws.send(JSON.stringify(initMsg));
    ws.on('close', function close() {
        console.log('CLOSING CONNECTION');
    });
    ws.on('message', onMessage);
});

var onMessage = function(msg){
    var m = JSON.parse(msg);
    switch (m.type){
        case 'chat':
            sendMessage(msg);
            break;
        case 'system':
            systemMessage(m);
            break;
    }
}

var systemMessage = function(msg){
    switch (msg.data.action){
        case 'join':
            console.log('NEW USER!');
            addUserToList(msg.data.handle);
            sendUsersList();
            break;
    }
};

var addUserToList = function(handle){
    var l = connections.length;
    while(l--){
        if(connections[l].conn.readyState != 3 && connections[l].handle == ''){
            connections[l].handle = handle;
        }
    }
}

var sendUsersList = function(){
    // var list = connections.map(function(c){
    //     if(c.conn.readyState != 3){
    //         return c.handle;
    //     }
    // });
    var list = [];
    var l = connections.length;
    while (l--) {
        if (connections[l].conn.readyState != 3) {
            list.push(connections[l].handle);
        }
    }
    console.log(list);
    var msg = {
        type: 'system',
        data: {
            action: 'list',
            data: list
        }
    };
    sendMessage(JSON.stringify(msg));
}

var sendMessage = function(message) {
    console.log('received: %s', message);
    var l = connections.length;
    while (l--) {
        if (connections[l].conn.readyState != 3) {
            connections[l].conn.send(message);
        }
    }
}

// setInterval(() => {
//     var d = new Date().toString();
//     var l = connections.length;
//     console.log(l);
//     while(l--){
//         if (connections[l] == null){
//             connections[l].send(d);
//         }
//     }
// }, 1000);