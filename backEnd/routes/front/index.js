var express = require('express');
var router = express.Router();

const aSql = require('../../service/article');

/* GET home page. */
module.exports = router

  .get('/', function (req, res, next) {
    res.render('index', {
      title: 'Express'
    });
  })

  //首页banner图
  .get('/indexBanner',function(req,res,next){
    
  })

  //首页推荐文章
  .get('/indexArticle',function(req,res,next){
    console.log('111');
    aSql.select('index','0')
      .then(function(d){
        console.log(d);
        res.send({
          resultcode:'0000',
          data:{
            result:'00',
            text:'查询成功',
            arr:d
          }
        })
      })
      .catch(function(err){
        console.log(err);
      })
  })

  .get('/index',function(req,res,next){
    aSql.show()
      .then(function(d){
        console.log(d);
      })
      .catch(function(err){
        console.log(err);
      })
    res.send('success');
  });