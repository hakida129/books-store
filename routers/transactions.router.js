var express = require('express');
var shortid = require('shortid');

var db = require('../db');

var router = express.Router();

router.get('/', function(req, res){
  var transactions = db.get('transactions').value()
  var books = db.get('books').value()
  var users = db.get('users').value()
  res.render('transactions/index',{
    transactions : transactions,
    books: books,
    users: users
  });
});

router.post('/create', function(req, res){
  req.body.id = shortid.generate();
  db.get('transactions').push(req.body).write()
  res.redirect('/transactions');
})

module.exports = router;