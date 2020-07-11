module.exports.countCookie = function(req, res, next){
  if(!req.cookies.countCookie){
    res.cookie('countCookie', 1);
  }else{
    res.cookie('countCookie', ++req.cookies.countCookie);
  }
  next()
} 