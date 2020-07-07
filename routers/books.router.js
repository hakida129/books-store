var express = require('express');
var shortid = require('shortid');

var db = require('../db');

var router = express.Router();

router.get('/', function(req, res){
  res.render('books/index', {
    books: db.get('books').value()
  })
})

router.get('/view/:id', function(req, res){
  var id = req.params.id;
  var book = db.get('books').find({ id : id}).value()
  res.render('books/view', {
    book : book
  })
})

router.get('/delete/:id', function(req, res){
  var id = req.params.id;
  db.get('books').remove({ id : id}).write()
  res.redirect('/books')
})

router.get('/update/:id', function(req, res){
  res.render('books/update')
})

router.get('/create', function(req, res){
  res.render('books/create');
})

router.post('/update/:id', function(req, res){
  var id = req.params.id;
  db.get('books').find({ id : id }).assign({ title: req.body.title}).write()
  res.redirect('/books')
})

router.post('/create', function(req, res){
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write();
  res.redirect('/books');
})

module.exports = router;