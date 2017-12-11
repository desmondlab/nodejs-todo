var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var moment = require('moment-timezone');

// Connect to the database
mongoose.connect('mongodb://test:test@ds147534.mlab.com:47534/todo-demo');

var currentTime = moment();
var tz = moment.tz.guess();
var currentHour = currentTime.tz(tz).get('hour');

// create a schema - this is like a blueprint, define what kind of information expected
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

    app.get('/todo', function(req, res){
        // get data from mongodb and pass it to view
        // empty object means all data
        Todo.find({}, function(err, data){
            console.log(tz);
            console.log(currentHour);
            if (err) throw err;
            res.render('todo', {todos: data});
        });
        
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item', function(req, res){
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            console.log(tz);
            console.log(currentHour);
            if (err) throw err;
            res.json(data);
        });
    });
    
};