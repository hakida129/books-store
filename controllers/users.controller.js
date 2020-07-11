var shortid = require('shortid');
var bcrypt = require('bcrypt');

var saltRounds = 10;

var db = require('../db');

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
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    req.body.password = hash;
    var errors = [];
    req.body.id = shortid.generate();
    req.body.isAdmin = false;
    var emailUser = db.get('users').find({ email : req.body.email}).value();
    if(emailUser){
      errors.push('Email đã tồn tại')
      res.render('users/create',{
        values: req.body,
        errors: errors
      });
      return;
    }
    
    db.get('users').push(req.body).write()
    res.redirect('/users');
  });
 
};