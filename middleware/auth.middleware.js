var db = require('../db')

module.exports.requireAuth = function(req, res, next){

  var user = db.get('users').find({ id: req.signedCookies.userId }).value();

  if(!req.signedCookies.userId){
    res.redirect('/auth/login');
    return
  }

  if(!user){
    res.redirect('/auth/login');
    return
  }


  res.locals.user = user
  next();
};

