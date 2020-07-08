
var shortid = require('shortid');

var db = require('../db');

module.exports.index = function(req, res){
  var transactions = db.get('transactions').value()
  var books = db.get('books').value()
  var users = db.get('users').value()
  res.render('transactions/index',{
    transactions : transactions,
    books: books,
    users: users
  });
};

module.exports.create = function(req, res){
  req.body.id = shortid.generate();
  req.body.isComplete = false
  db.get('transactions').push(req.body).write()
  res.redirect('/transactions');
};


module.exports.isComplete = function(req, res){
  var id = req.params.id
  db.get('transactions').find({ id: id}).assign({isComplete : true}).write()
  res.redirect('/transactions');
};