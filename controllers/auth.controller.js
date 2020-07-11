const bcrypt = require('bcrypt');

var db = require("../db");

module.exports.login = function(req, res){
  res.render('auth/login')
};

module.exports.postLogin = function(req, res){
  var email = req.body.email;
  var password = req.body.password;

  var user = db.get('users').find({email: email}).value();
  if(!user){
    res.render('auth/login',{
      errors: [
        'Email does not exits !'
      ],
      values: req.body
    });
    return;
  }
  bcrypt.compare(req.body.password, user.password, function(err, result) {
    if(err){
    res.render('auth/login',{
      errors: [
        'Wrong password !'
      ],
      values: req.body
    });
    return;
  }
  });

  
  res.cookie('userId', user.id);
  res.redirect('/books'); 
};