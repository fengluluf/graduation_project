var express = require('express');
var router = express.Router();

const sql = require('../../service/drug');

/* GET home page. */
module.exports = router

  //药品分类展示
  .post('/', function (req, res, next) {
    var cate = req.body.cate;
    sql.select('drugCate',cate)
      .then(function(d){
        if(d[0]){
          res.send({
            result:'0000',
            // data:[]
          })          
        }else{
          res.send({
            resultcode:'0000',
            data:{
              result:'01',
              text:'无此分类药品'
            }
          })
        }
      })
      .catch(function(err){
        console.log(err);
      })
  })

  //药品详情页
  .post('/drugInfo',function(req,res,next){
    
  })

  //药品查询
  .get('/indexBanner',function(req,res,next){
    sql.select('drugCate','1')
      .then(function(d){
        if(d[0]){
          console.log(d);
          res.send({
            result:'0000',
            // data:[]
          })          
        }else{
          res.send({
            resultcode:'0000',
            data:{
              result:'01',
              text:'无此分类药品'
            }
          })
        }
      })
      .catch(function(err){
        console.log(err);
      })
  });