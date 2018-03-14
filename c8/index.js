const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

var DATA = [];

app.get('/api/users', (req, res) => {
    res.send(JSON.stringify(DATA));
});

app.get('/api/users/:id', (req, res) => {
    res.send(JSON.stringify(DATA[req.params.id]));
});

app.post('/api/users', (req, res) => {
    DATA.push(req.body);
    res.send('OK');
});

app.delete('/api/users/:id', (req, res) => {
    DATA.splice(req.params.id, 1);
    res.send('OK');
});

app.put('/api/users/:id', (req, res) => {
    DATA[req.params.id] = req.body;
    res.send('OK');
});

app.patch('/api/users/:id/:param', (req, res) => {
    DATA[req.params.id][req.params.param] = req.body[req.params.param];
    res.send('OK');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
