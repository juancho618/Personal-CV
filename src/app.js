/**
 * Created by Juancho on 2/26/2017.
 */
'use strict';

var express = require('express'); // Access to the express set-up

var app = express();  // Instancing the app

app.use('/static', express.static(__dirname + '/static')); // use define the middleware

app.set('view engine', 'jade');  // how to render the app
app.set('views', __dirname + '/views');  // path to the views


// Creating the routes
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/portfolio', function (req, res) {
    res.render('portfolio');
});
app.get('/about', function (req, res) {
    res.render('about');
});
app.get('/locker', function (req, res) {
    res.setHeader('Content-Type','text/plain');
    res.send('Response From my web page');
});

app.listen(8080, function(){
    console.log('running in port 8080')
}); // Define the port that i want  to use



