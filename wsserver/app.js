const WebSocket = require('ws');

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
    connections.push(ws);
    ws.send('welcome');
    ws.on('close', function close() {
        console.log('CLOSING CONNECTION');
    });
    ws.on('message', sendMessage);
});

var sendMessage = function(message) {
    console.log('received: %s', message);
    var l = connections.length;
    while (l--) {
        if (connections[l].readyState != 3) {
            connections[l].send(message);
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