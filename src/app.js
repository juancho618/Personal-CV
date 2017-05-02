/**
 * Created by Juancho on 2/26/2017.
 */
'use strict';

var express = require('express'); // Access to the express set-up
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const register = require('./functions/register');
const login = require('./functions/login');
var bodyParser = require('body-parser');
const helper = require('sendgrid').mail; //mail with sendngrid
var PythonShell = require('python-shell');

var app = express();  // Instancing the app

app.use('/static', express.static(__dirname + '/static')); // use define the middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'pug');  // how to render the app
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
app.get('/resume', function (req, res) {
    res.render('resume');
});
app.get('/contact', function (req, res) {
    res.render('contact');
});
app.post('/contact', function (req, res) {
    console.log(req.body);
    var from_email = new helper.Email(req.body.email);
    var to_email = new helper.Email("jjsorianoe@gmail.com");
    var subject = "Contact Message";
    var content = new helper.Content("text/plain", req.body.message);
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    })
    res.end('It worked!');
});
app.get('/classifier', function (req, res) {
    res.render('classifier');
});
app.post('/classifier', function (req,res) {
  console.log(req.body);
  var options = {
  mode: 'text',
  args: [req.body.healthInsurance, req.body.age, req.body.diagnosis, req.body.specialty, req.body.gender, req.body.day]
};
  PythonShell.run('classifier.py', options, function (err,results) {
    if (err) throw err;
    console.log('results: %j', results);
    console.log('finished');
    res.send(results);
  });
});
//portfolio image
app.get('/project', function (req, res) {
    res.render('project');
});
app.listen(8080, function(){
    console.log('running in port 8080')
}); // Define the port that i want  to use

// Register a new user
app.post('/register', function (req, res) {
    var token = req.body.encode;
    var secret = 'keytest123';
   var decoded =  jwt.verify(token, new Buffer( secret, 'base64' ));
   var msg = decoded.sub;
   var splitMsg = msg.split('|');


    var name = splitMsg[1];
    var email = splitMsg[2];
    var password = splitMsg[3];

    if (!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {

        res.status(400).json({ message: 'Invalid Request !' });
    } else {

        register.registerUser(name, email, password).then(function (result) {

            res.setHeader('Location', '/register/' + email);
            res.status(result.status).json({ message: result.message });
            console.log(res);
        }).catch(function (err) {
            return res.status(err.status).json({ message: err.message });
        });
    }
});

// Login with user
app.post('/login', function (req, res) {

    var token = req.body.encode;
    var secret = 'keytest123';
    var decoded =  jwt.verify(token, new Buffer( secret, 'base64' ));
    var msg = decoded.sub;
    var splitMsg = msg.split('|');
    var name = splitMsg[1];
    var password = splitMsg[2];

    if (!splitMsg) {

        res.status(400).json({ message: 'Invalid Request !' });
    } else {

        login.loginUser(name, password).then(function (result) {
            //var token = jwt.sign(result, config.secret, { expiresIn: 1440 }); not sure if I need this token!.
            res.status(result.status).json({ message: result.message, token: token, status: 200 });
        }).catch(function (err) {
            return res.status(err.status).json({ message: err.message });
        });
    }

});
