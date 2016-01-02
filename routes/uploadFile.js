var express = require('express');
var router = express.Router();

//note !!! note !!! note !!!
//so where this method came from
//well this method came bt the passport bidu!!!!
//it checks whether the session is created or not
//as evertime a request is made the deserializable is invoked and chcked
function isAuthenticate(req,res,next){
  if(req.isAuthenticated()){
    next();
  }
  else{
    res.redirect('/');
  }
}

router.get('/',isAuthenticate,function(req,res){
  res.render('uploadFile');
});

router.post('/',isAuthenticate,function(req,res){
  res.send("hello post uploadFile");
});

module.exports = router;
