var express = require('express');
var todoController = require('./controllers/todoController');
var moment = require('moment-timezone');

var app = express();

// set up template engine
app.set('view engine', 'ejs');

// middleware, static files
// no route define, applied for all routes
app.use(express.static('./public'));

// fire controllers
todoController(app);

var currentTime = moment();
var tz = currentTime.tz.guess();
var currentHour = currentTime.tz(tz).get('hour');
console.log(currentHour);

//listen to port
app.listen(3000);
console.log('You are listening to post 3000');