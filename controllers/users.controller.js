
var shortid = require('shortid');

var db = require('../db');
const { values } = require('../db');

module.exports.index = function(req, res){
  res.render('users/index',{
    users : db.get('users').value()
  });
};

module.exports.create = function(req, res){
  res.render('users/create');
};

module.exports.view = function(req, res){
  var id = req.params.id;
  res.render('users/view', {
    user: db.get('users').find({id: id}).value()
  })
};

module.exports.delete = function(req, res){
  var id = req.params.id;
  db.get('users').remove({id: id}).write();
  res.redirect('/users');
};

module.exports.postCreate = function(req, res){
  req.body.id = shortid.generate();
  console.log(res.locals);
  db.get('users').push(req.body).write()
  res.redirect('/users');
};