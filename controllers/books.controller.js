var shortid = require('shortid');

var db = require('../db');

module.exports.index = function(req, res){
  res.render('books/index', {
    books: db.get('books').value()
  })
};

module.exports.view = function(req, res){
  var id = req.params.id;
  var book = db.get('books').find({ id : id}).value()
  res.render('books/view', {
    book : book
  })
};

module.exports.delete = function(req, res){
  var id = req.params.id;
  db.get('books').remove({ id : id}).write()
  res.redirect('/books')
};

module.exports.update = function(req, res){
  res.render('books/update')
};

module.exports.create = function(req, res){
  res.render('books/create');
};

module.exports.postUpdate = function(req, res){
  var id = req.params.id;
  db.get('books').find({ id : id }).assign({ title: req.body.title}).write()
  res.redirect('/books')
};

module.exports.postCreate = function(req, res){
  req.body.id = shortid.generate();
  req.body.coverUrl = req.file.path.split("/").slice(1).join("/");
  db.get('books').push(req.body).write();
  res.redirect('/books');
};