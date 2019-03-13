var express = require('express');
var router = express.Router();

const sql = require('../../service/drug');

/* GET home page. */
module.exports = router

  //药品分类展示
  .post('/drugShow', function (req, res, next) {
    sql.select('drugCate',req.body.cate)
      .then(function(d){
        if(d[0]){
          res.send({
            result:'0000',
            data:{
              result:'00',
              text:'查询成功',
              array:d
            }
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
      });
  })

  //药品详情页
  .get('/drugInfo',function(req,res,next){
    sql.select('drugId',req.body.drugId)
      .then(function(d){
        if(d[0]){
          res.send({
            result:'0000',
            data:{
              result:'00',
              text:'查询成功',
              array:d[0]
            }
          })          
        }else{
          res.send({
            resultcode:'0000',
            data:{
              result:'01',
              text:'无此药品'
            }
          })
        }
      })
      .catch(function(err){
        console.log(err);
      });
  })

  //药品查询
  .get('/indexBanner',function(req,res,next){
    console.log(req.query);
    res.send('success');
  });