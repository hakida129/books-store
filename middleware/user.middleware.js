module.exports.postCreate = function(req, res, next){
  var errors = [];
  if (!req.body.name){
    errors.push('Name is required !');
  }
  if (!req.body.phone){
    errors.push('Phone is required !');
  }if (req.body.name.length > 30){
    errors.push('Name is shorter than 30 characters !');
  }
  if (errors.length){
    res.render('users/create',{
      errors: errors,
      values: req.body
    });
    return;
  }

  next();
}