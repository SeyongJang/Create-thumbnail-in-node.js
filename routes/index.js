var express = require('express');
var Thumbnail = require('thumbnail');
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req,file, cb){
      cb(null, './temp')
    },
    filename: function(req, file, cb){
      cb(null, file.originalname)
    }
});

var upload = multer({storage:storage});

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var imgList = [];
  fs.readdir('./thumbnails/', function(err, files){
    if(err) console.error(err);
    imgList = files;
    console.log(imgList);
    res.render('index', { title: 'Express', files:imgList });
  });
});

router.post('/upload', upload.single('uploadImg'), function(req,res){
  console.log(req.file);
  var filename = req.file.filename;

  var thumbnail = new Thumbnail('./temp',  './thumbnails');
  //ensureThumbnail(filename, imgWidth, imgHeight, callback)
  thumbnail.ensureThumbnail(filename, null, 100, function(err, filename){
      if(err) console.error(err);
      console.log(filename);
      res.redirect('/');
  });

});

module.exports = router;
