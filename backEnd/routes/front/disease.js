var express = require('express');
var router = express.Router();

const {sql1,sql2} = require('../../service/disease');

/* GET home page. */
module.exports = router

  //获取分类
  .get('/diseaseCate',function(req,res,next){
    // sql.diseaseCate.show()
    //   .then(function(d){
    //     console.log(d);
    //   })
    //   .catch(function(err){
    //     console.log(err);
    //   })
    console.log(sql);
      res.send('success');
  })

  //获取详情
  .get('/diseaseInfo',function(req,res,next){

  });