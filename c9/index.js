var express = require('express');
var hbs = require('hbs');
var cors = require('cors');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');

var app = express();
app.set('view engine', 'html');
app.engine('html', hbs.__express);
hbs.registerPartials(__dirname + '/views');

app.get('/', (req, res) => {

    var data = {
        message: 'Pero!',
        // gradovi: [
        //     'New York', 'Paris', 'London', 'Tokyo', 'Rome'
        // ]
        gradovi: [
            { grad: 'New York', wiki: 'https://en.wikipedia.org/wiki/New_York'},
            { grad: 'Paris', wiki: 'https://en.wikipedia.org/wiki/Paris'},
            { grad: 'London', wiki: 'https://en.wikipedia.org/wiki/London'},
            { grad: 'Tokyo', wiki: 'https://en.wikipedia.org/wiki/Tokyo'},
            { grad: 'Rome', wiki: 'https://en.wikipedia.org/wiki/Rome'},
        ]
    };

    res.render('main', data);
});

app.get('/posts', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((r) => r.json())
    .then((data) => {
        res.render('posts', {posts: data});
    });
});

app.listen(3000, '0.0.0.0', function (err) {
    if (err){
        console.log(err);
    }
    console.log('Server started on port 3000');
});