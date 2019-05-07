var express = require('express');
var router = express.Router();

const uSql = require('../../service/user');
const aSql = require('../../service/article');

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
    " " + date.getHours() + seperator2 + date.getMinutes() +
    seperator2 + date.getSeconds();
  return currentdate;
}

//去除数组空字符
function removeStr(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == '' || array[i] == null || typeof (array[i]) == undefined) {
      array.splice(i, 1);
      i = i - 1;
    }
  }
  return array;
}

//去除数组中某个元素
function remove (array,val) {
  var index = array.indexOf(val);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
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
  .post('/articleCollect', function (req, res, next) {
    var collectId = req.body.collectId,
      userId = req.body.userId;
    
    uSql.select('id', userId)
      .then(function (d) {
        //判断是否是第一次存储
        if (d[0].collectId === null) {
          collectId = collectId;
          update(collectId,userId);
          res.send({
            resultcode: '0000',
            data: {
              result: '00',
              text: '收藏成功'
            }
          })
        } else {
          //收藏文章
          if (d[0].collectId.split('|').indexOf((collectId).toString()) === -1) {
            collectId = d[0].collectId + '|' + collectId;
            update(collectId,userId);
            res.send({
              resultcode: '0000',
              data: {
                result: '00',
                text: '收藏成功'
              }
            })
          } else {
            //取消收藏
            var middle = remove(d[0].collectId.split('|'),collectId.toString());
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
      })
      .catch(function (err) {
        console.log(err);
      });

    //将用户编写的文章id存入user
    uSql.select('id', userId)
      .then(function (d) {
        if (d[0].pushId === null) {
          uSql.update('pushId', pushId, 'id', userId)
            .then(function (d) {
              console.log(d);
              res.send({
                resultcode: '0000',
                data: {
                  result: '00',
                  text: "发表成功"
                }
              })
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          var pushId2 = d[0].pushId;
          pushId2 += '|' + pushId;
          uSql.update('pushId', pushId2, 'id', userId)
            .then(function (d) {
              console.log(d);
              res.send({
                resultcode: '0000',
                data: {
                  result: '00',
                  text: "发表成功"
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
  .post('/getPush', function (req, res, next) {
    var userId = req.body.userId;

    uSql.select('id', userId)
      .then(function (d) {
        if (d[0].pushId === null) {
          res.send({
            resultcode: '0000',
            data: {
              result: '01',
              text: '发表文章为空'
            }
          });
        } else {
          var array = d[0].pushId.split('|'),
              arrayObj = [];
          array = removeStr(array);
          for (let i = 0; i < array.length; i++) {
            aSql.select('id', array[i])
              .then(function (d) {
                arrayObj.push(d[0]);
              })
              .catch(function (err) {
                console.log(err);
              })
          }
          setTimeout(() => {
            console.log(arrayObj);
            res.send({
              resultcode: '0000',
              data: {
                result: '00',
                text: '查询成功',
                array: arrayObj
              }
            })
          }, 1000);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })

  //获取收藏文章
  .post('/getCollect', function (req, res, next) {
    var userId = req.body.userId;

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
          for (var i = 0; i < array.length; i++) {
            aSql.select('id', array[i])
              .then(function (d) {
                arrayObj.push(d[0]);
              })
              .catch(function (err) {
                console.log(err);
              })
          }
          setTimeout(() => {
            res.send({
              resultcode: '0000',
              data: {
                result: '00',
                text: '查询成功',
                array: arrayObj
              }
            })
          }, 1000);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })

  //根据id获取文章详情
  .post('/getArticleInfo', function (req, res, next) {
    var id = req.body.id;
    aSql.select('id', id)
      .then(function (d) {
        if(d){
          res.send({
            resultcode: '0000',
            data: {
              result: '00',
              text: '获取成功',
              array:d
            }
          });
        }else{
          res.send({
            resultcode: '0000',
            data: {
              result: '01',
              text: '获取文章失败'
            }
          });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })