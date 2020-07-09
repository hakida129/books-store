module.exports.countCookie = function(req, res, next){
  if(res.locals.countCookie){
    ++countCookie;
  }else{
    res.locals.countCookie = 1;
  }

  next()
}