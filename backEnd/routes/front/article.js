var express = require('express');
var router = express.Router();

const uSql = require('../../service/user');
const aSql = require('../../service/article');

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
};

//去除数组中某个元素
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

/* GET home page. */
module.exports = router

  //测试
  .get('/', function (req, res, next) {
    aSql.insert(('articleName', 'articleTxt'), ('"45123"', '"你说呢"'))
      .then(function (d) {
        console.log(d.insertId);
      })
      .catch(function (err) {
        console.log(err);
      })
    res.render('index', {
      title: 'Express'
    });
  })

  //文章收藏
  .get('/articleCollect', function (req, res, next) {
    var collectId = req.query.collectId,
      userId = req.query.userId;

    uSql.select('id', userId)
      .then(function (d) {
        console.log(d);
        console.log(d[0].collectId);
        //判断是否是第一次存储
        if (d[0].collectId === null) {
          collectId = collectId;
          update(collectId, userId);
        } else {
          if (d[0].collectId.split('|').indexOf(collectId) === -1) {
            collectId = d[0].collectId + '|' + collectId;
            update(collectId, userId);
          } else {
            //取消收藏
            var middle = d[0].collectId.split('|').remove(collectId);
            middle = middle.join('|');
            uSql.update('collectId', middle, 'id', userId)
              .then(function (d) {
                res.send({
                  resultcode: '0000',
                  data: {
                    result: '01',
                    text: '取消收藏成功'
                  }
                })
              })
              .catch(function (err) {
                console.log(err);
              })
          }
        }

        function update(collectId, userId) {
          uSql.update('collectId', collectId, 'id', userId)
            .then(function (d) {
              res.send({
                resultcode: '0000',
                data: {
                  result: '00',
                  text: '收藏成功'
                }
              })
              console.log(d);
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      })
      .catch(function (err) {
        console.log(err);
      });

    res.send('success');
  })

  //发表文章
  .post('/articlePush', function (req, res, next) {

    var articleName = req.body.articleName,
      articleTxt = req.body.articleTxt,
      userId = req.body.userId;
    var time = getNowFormatDate();

    //记录文章id
    var pushId = '';

    //存储文章
    aSql.insert(['articleName', 'articleTxt', 'userId', 'time'], [articleName, articleTxt, userId, time])
      .then(function (d) {
        console.log(d.insertId);
        pushId = d.insertId;
        res.send('success');
      })
      .catch(function (err) {
        console.log(err);
      });

    //将用户编写的文章id存入user
    uSql.select('id', userId)
      .then(function (d) {
        if (d[0].pushId === null) {
          uSql.update('pushId', pushId, 'userId', userId)
            .then(function (d) {
              console.log(d);
              res.send({
                resultcode:'0000',
                data:{
                  result:'00',
                  text:"发表成功"
                }
              })
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          var pushId2 = d[0].pushId;
          pushId2 = '|' + pushId;
          uSql.update('pushId', pushId2, 'userId', userId)
            .then(function (d) {
              console.log(d);
              res.send({
                resultcode:'0000',
                data:{
                  result:'00',
                  text:"发表成功"
                }
              })
            })
            .catch(function (err) {
              console.log(err);
            });
        }
      })
      .catch(function (err) {
        console.log(err);
      })
  })

  //获取发表文章
  .get('/getPush', function (req, res, next) {
    var userId = req.query.userId;

    uSql.select('id', userId)
      .then(function (d) {
        if (d[0].pushId === null) {
          res.send({
            resultcode: '0000',
            data: {
              result: '00',
              text: '发表文章为空'
            }
          });
        } else {
          var array = d[0].pushId.split('|'),
            arrayObj = [];
          for (var i = 0; i < array.length; i++) {
            aSql.select('id', array[i])
              .then(function (d) {
                arrayObj.push(d[0]);
              })
              .catch(function (err) {
                console.log(err);
              });
          }
          console.log(arrayObj);
          res.send({
            resultcode:'0000',
            data:{
              result:'00',
              text:'查询成功',
              array:arrayObj
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })

  //获取收藏文章
  .get('/getCollect', function (req, res, next) {
    var userId = req.query.userId;

    uSql.select('id', userId)
      .then(function (d) {
        if (d[0].collectId === null) {
          res.send({
            resultcode: '0000',
            data: {
              result: '00',
              text: '发表文章为空'
            }
          });
        } else {
          var array = d[0].collectId.split('|'),
              arrayObj = [];
          for(var i=0;i<array.length;i++){
            aSql.select('id',array[i])
              .then(function(d){
                arrayObj.push(d[0]);
              })
              .catch(function(err){
                console.log(err);
              })
          }
          res.send({
            resultcode:'0000',
            data:{
              result:'00',
              text:'查询成功',
              array:arrayObj
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  });