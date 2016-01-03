var express = require('express');
var router = express.Router();
var multer = require('multer');

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

var storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null,'submissions')
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname + '-'+Date.now())
  }
});

router.get('/',function(req,res){
  res.render('uploadFile');
});

var upload = multer({storage : storage}).single('filename');

router.post('/',function(req,res){
  upload(req,res,function(err){
    if(err){
      console.log(err);
      res.send('Error occured');
    }
    else{
      console.log('done');
      res.send('File uploaded successfully');
    }
  });
});

module.exports = router;
