var express = require('express');
var router = express.Router();
var todosCtrl = require('../controllers/todos');

//all actual paths start with to '/todos'


// GET /todos
router.get('/', todosCtrl.index);

// GET /todos/new <-- define before show route
router.get('/new', todosCtrl.new);

// GET /todos/:id
router.get('/:id', todosCtrl.show);

// POST /todos
router.post('/', todosCtrl.create);

module.exports = router;
