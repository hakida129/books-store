var express = require('express');
var shortid = require('shortid');

var db = require('../db');

var router = express.Router();

router.get('/', function(req, res){
  res.render('users/index',{
    users : db.get('users').value()
  });
});

router.get('/create', function(req, res){
  res.render('users/create');
});

router.get('/view/:id', function(req, res){
  var id = req.params.id;
  res.render('users/view', {
    user: db.get('users').find({id: id}).value()
  })
})

router.get('/delete/:id', function(req, res){
  var id = req.params.id;
  db.get('users').remove({id: id}).write();
  res.redirect('/users');
})

router.post('/create', function(req, res){
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write()
  res.redirect('/users');
})

module.exports = router;