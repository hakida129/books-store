var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var shortid = require('shortid');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

db.defaults({ books: [] }).write();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var PORT = 3000;

app.get('/', function(req, res){
  res.render('index');
})

app.get('/books', function(req, res){
  res.render('books/index', {
    books: db.get('books').value()
  })
})

app.get('/books/view/:id', function(req, res){
  var id = req.params.id;
  var book = db.get('books').find({ id : id}).value()
  res.render('books/view', {
    book : book
  })
})

app.get('/books/delete/:id', function(req, res){
  var id = req.params.id;
  var book = db.get('books').remove({ id : id}).write()
  res.redirect('/books')
})

app.get('/books/update/:id', function(req, res){
  res.render('books/update')
})

app.get('/books/create', function(req, res){
  res.render('books/create');
})

app.post('/books/update/:id', function(req, res){
  var id = req.params.id;
  db.get('books').find({ id : id }).assign({ title: req.body.title}).write()
  res.redirect('/books')
})

app.post('/books/create', function(req, res){
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect('/books');
})

app.listen(PORT, function(){
  console.log(`Server running at http://localhost:${PORT} `);
})  