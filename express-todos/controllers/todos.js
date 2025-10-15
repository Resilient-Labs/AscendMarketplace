const Todo = require('../models/todo');

module.exports = {
    index,
    show,
    new: newTodo,
    create
};

function create(req, res) {
  Todo.create(req.body);
  res.redirect('/todos');
}

function newTodo(req, res) {
res.render('todos/new', { title: 'New Todo' });
}

function show (req, res) {
  res.render('todos/show', {
    todo: Todo.getOne(req.params.id)
  });
}

function index(req, res) {
    res.render('todos/index', {
      todos: Todo.getAll()
    });
  }
  