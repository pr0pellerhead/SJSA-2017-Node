var express = require('express');
var hbs = require('hbs');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.urlencoded());
app.set('view engine', 'html');
app.engine('html', hbs.__express);
hbs.registerPartials(__dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', (req, res) => {
    var err = 0;
    var form = req.body;
    if(form.fn == undefined || form.fn.length == 0){err++;}
    if(form.ln == undefined || form.ln.length == 0){err++;}
    if(form.eml == undefined || form.eml.length == 0){err++;}
    if(form.p1 == undefined || form.p1.length == 0){err++;}
    if(form.p2 == undefined || form.p2.length == 0){err++;}
    if(form.p1 != form.p2){err++;}

    var data = {
        message: ''
    };

    if(err == 0){
        fs.writeFile('user.txt', JSON.stringify(form), (err) => {});
        data.message = 'Success!';
    } else {
        data.message = 'Registration failed!';
    }

    res.render('register', data);
});

app.listen(3000, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Server started on port 3000');
});