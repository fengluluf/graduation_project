var express = require('express');
var router = express.Router();

const uSql = require('../../service/user');
const aSql = require('../../service/article');

//去除数组中某个元素
function remove (array,val) {
  var index = array.indexOf(val);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};

module.exports = router
  //获取文章列表
  .get('/getArticle',async(req,res,next)=>{
    aSql.show()
      .then(function(d){
        res.send({
          resultcode:'0000',
          data: {
            result: '00',
            text: '获取成功',
            array:d
          }
        })
      })
      .catch(function(err){
        console.log(err);
      })
  })

  //删除文章
  .post('/deleteArticle',async(req,res,next)=>{
    var userId = req.body.userId,
           id = req.body.id;

    //删除article
    aSql.delete('id',id)
      .then(function(d){
        console.log(d);
      })
      .catch(function(err){
        console.log(err);
      })

    //删除userinfo
    uSql.select('id',userId)
     .then(function(d){
      var pushId = d[0].pushId.split('|');
      pushId = remove(pushId,id.toString());
      pushId = pushId.join('|');
       uSql.update('pushId',pushId,'id',d[0].id)
        .then(function(d){
          res.send({
            resultcode:'0000',
            data: {
              result: '00',
              text: '删除成功',
            }
          })
        })
        .catch(function(err){
          console.log(err);
        })
       console.log(d);
     })
     .catch(function(err){
       console.log(err);
     })
  })

  //获取首页推荐文章
  .get('/getArticles',async(req,res,next)=>{
    aSql.shows()
      .then(function(d){
        res.send({
          resultcode:'0000',
          data: {
            result: '00',
            text: '获取成功',
            array:d
          }
        })
      })
  })

  //添加首页文章
  .post('/addArticles',async(req,res,next)=>{
    aSql.inserts(['advername','advertext'],[req.body.advername,req.body.advertext])
      .then(function(d){
        res.send({
          resultcode:'0000',
          data: {
            result: '00',
            text: '添加成功',
          }
        })
      })
      .catch(function(err){
        console.log(err);
      })
  })

  //获取首页文章详情
  .post('/getInfos',async(req,res,next)=>{
    aSql.info('id',req.body.id)
    .then(function(d){
      console.log(d);
      res.send({
        resultcode:'0000',
        data: {
          result: '00',
          text: '查询成功',
          array:d
        }
      })
    })
    .catch(function(err){
      console.log(err);
    })
  })

  //删除首页文章
 .post('/deleteArticles',async(req,res,next)=>{
    aSql.deletess('id',req.body.id)
    .then(function(d){
      console.log(d);
      res.send({
        resultcode:'0000',
        data: {
          result: '00',
          text: '删除成功',
        }
      })
    })
    .catch(function(err){
      console.log(err);
    })
  })

  //按用户id查询文章
  .post('/searchchArticle',async(req,res,next)=>{
    aSql.select('userId',req.body.userId)
      .then(function(d){
        res.send({
          resultcode:'0000',
          data: {
            result: '00',
            text: '查询成功',
            array: d
          }
        })
      })
  })

  //按时间查询文章
  .post('/timeArticle',async(req,res,next)=>{
    var startTime = req.body.startTime,
        endTime = req.body.endTime;
    aSql.time(startTime,endTime)
      .then(function(d){
        res.send({
          resultcode:'0000',
          data:{
            result:'00',
            text:'查询成功',
            array:d
          }
        })
      })
      .catch(function(err){
        console.log(err);
      })
  });