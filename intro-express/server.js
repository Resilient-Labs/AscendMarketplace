// Load express
const express = require('express');
const path = require('path');

// require the todo data base
const todoDb = require('./data/todo-db');

// Create our express app
const app = express();

// Configure the app (app.set)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mount middleware (app.use)

//Mount routes
// Define a "root" route directly on app
// Tomorrow, we'll use best practice routing
app.get('/', function (req, res) {
    // path must strat with a leading slash
  res.redirect('/todos');
});

app.get('/home', function(req, res) {
    // never begin the name of the template 
    //with a forward slask
    res.render('home');
});

app.get('/todos', function(req, res) {
   const todos = todoDb.getAll();
   res.render('todos/index', { todos });
  });

// Tell the app to listen on port 3000
// for HTTP requests from clients
app.listen(3000, function () {
  console.log('Listening on port 3000');
});

