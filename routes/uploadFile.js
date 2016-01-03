var express = require('express');
var router = express.Router();
var multer = require('multer');
var mkdirp = require('mkdirp');

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
    var path = createDir(req); //function call to create a dir in submissions folder
    console.log(path);
    cb(null,path)
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname + '-'+Date.now())
  }
});

router.get('/',isAuthenticate,function(req,res){
  res.render('uploadFile');
});

function createDir(req){
  // console.log(req.user);
  var username = req.user.username;
  mkdirp('submissions/'+username,function(err){
    if(!err){
      console.log('dir created');
    }
    else{
      console.log(err);
    }
  });
  var path = 'submissions/'+username;
  return path;
}

var upload = multer({storage : storage}).single('filename');

router.post('/',isAuthenticate,function(req,res){
  upload(req,res,function(err){
    if(err){
      console.log(err);
      res.send('Error occured');
    }
    else{
      console.log('done uploading');
      res.send('File uploaded successfully');
    }
  });
});

module.exports = router;
