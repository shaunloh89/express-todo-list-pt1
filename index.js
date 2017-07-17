const mongoose = require('mongoose')
const todosController = require('./controllers/todos_controller')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Todo = require('./models/todo')

// connect to database
const url = 'mongodb://localhost27017/mongo-todo-list'

mongoose.connect(url, {
  useMongoClient: true
})
mongoose.Promise = global.Promise

const app = express()

app.use(express.static('public'))

// to read req.body
app.use(bodyParser.urlencoded({
  extended: true
}))

// TODO. include express and body-parser, plugin in the todos controller and start listening

app.engine('handlebars', exphbs(
  {
    defaultLayout: 'main'
  }
))
app.set('view engine', 'handlebars')

// app.get('/', function (req, res) {
//   res.render('home')
// })


app.get('/todos', function (req, res) {
  Todo.find({}, function (err, allTodos) {
    if (err) throw err
    res.render('todos/index', {
      todos: allTodos
    }
  )
  })
})

// listen to the post request
// read the form data
app.post('/todos', function (req, res) {
  res.send(req.body)
  var newTodo = new Todo({
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  })
  newTodo.save(function (err, newTodo) {
    console.log('new Todo is saved')
    res.redirect('/todos')
  })
})

const port = 5500
app.listen(port, function () {
  console.log('running mongo-todo-list at ' + port)
})
