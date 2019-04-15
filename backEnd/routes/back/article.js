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
        console.log(d);
      })
      .catch(function(err){
        console.log(err);
      })
    res.send({
      resultcode:'0000',
      result:'查询成功'
    });
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
          console.log('success');
        })
        .catch(function(err){
          console.log(err);
        })
       console.log(d);
     })
     .catch(function(err){
       console.log(err);
     })
    res.send({
      resultcode:'0000',
      result:'删除成功'
    });
  })

  //按用户id查询文章
  .get('/deleteArticle',async(req,res,next)=>{
    console.log(res);
    console.log(res.session);
    res.send('success');
  })

  //按时间查询文章
  .get('/deleteArticle',async(req,res,next)=>{
    console.log(res);
    console.log(res.session);
    res.send('success');
  });