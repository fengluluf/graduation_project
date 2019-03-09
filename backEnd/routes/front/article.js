var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = router

  .get('/', function (req, res, next) {
    res.render('index', {
      title: 'Express'
    });
  })

  //文章点赞
  .get('/indexBanner',function(req,res,next){
    
  });