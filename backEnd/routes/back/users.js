var express = require('express');
var router = express.Router();

const sql = require('../../service/backuser');
const uSql = require('../../service/user')

const request = require('request'),
  querystring = require('querystring'),
  utility = require('utility');

/* GET users listing. */
module.exports = router
  //判断用户是否登录
  .get('/', async (req, res, next) => {
    if (JSON.parse(req.sessionStore.sessions[Object.keys(req.sessionStore.sessions)[0]]).user) {
      res.send({
        resultcode: '0000',
        data: {
          result: '00',
          text: '已登录'
        }
      });
    } else {
      res.send({
        resultcode: '0000',
        data: {
          result: '11',
          text: '未登录'
        }
      });
    }
    console.log('success');
  })

  //注册发送验证码
  .post('/send', async (req, res, next) => {
    var sendNumber = Math.floor(Math.random() * 1000000 + 1);
    //存储对象
    var user = {
      userNumber: req.body.userNumber,
      sendNumber: sendNumber
    }
    req.session.user = user;

    // 发送验证码
    var queryData = querystring.stringify({
      "mobile": req.body.userNumber, // 接受短信的用户手机号码
      "tpl_id": "139613", // 您申请的短信模板ID，根据实际情况修改
      "tpl_value": "#code#=" + sendNumber, // 您设置的模板变量，根据实际情况修改
      "key": "2cca1ff8db0552c0426125ed2403cc8d", // 应用APPKEY(应用详细页查询)
    });

    var queryUrl = 'http://v.juhe.cn/sms/send?' + queryData;

    // console.log(queryData);
    // 接口转接，避免了跨域请求时浏览器阻断请求
    request(queryUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body) // 打印接口返回内容
        var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
        console.log(jsonObj)
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '发送成功',
            number:sendNumber
          }
        })
      } else {
        console.log('请求异常');
        res.send({
          resultcode: '0000',
          data: {
            result: '01',
            text: '发送失败'
          }
        })
      }
    })



  })

  //注册进行校验信息
  .post('/register', async (req, res, next) => {
    var userName = req.body.usernumber,
      password = req.body.password;
      password = utility.md5(password); 
      //判断用户是否存在
      sql.select('username', userName)
        .then(function (d) {
          if (d[0]) {
            res.send({
              'resultcode': '0000',
              data: {
                result: '01',
                text: '用户已存在'
              }
            })
          } else {
            sql.insert(['username', 'password'], [userName, password])
              .then(function (d) {
                console.log(JSON.stringify(d));
              })
              .catch(function (err) {
                console.log(err);
              });
            res.send({
              'resultcode': '0000',
              data: {
                result: '00',
                'text': '注册成功'
              }
            });
          }
        })
        .catch(function (err) {
          console.log(err);
        });

  })

  //前台注册
  .post('/registers', async (req, res, next) => {
    var userName = req.body.usernumber,
      password = req.body.password;
      console.log(req.body.usernumber,req.body.password);
      password = utility.md5(password); 
      console.log('11111',password);
      //判断用户是否存在
      uSql.select('username', userName)
        .then(function (d) {
          if (d[0]) {
            res.send({
              'resultcode': '0000',
              data: {
                result: '01',
                text: '用户已存在'
              }
            })
          } else {
            uSql.insert(['username', 'password'], [userName, password])
              .then(function (d) {
                console.log(JSON.stringify(d));
              })
              .catch(function (err) {
                console.log(err);
              });
            res.send({
              'resultcode': '0000',
              data: {
                result: '00',
                'text': '注册成功'
              }
            });
          }
        })
        .catch(function (err) {
          console.log(err);
        });

  })

  //用户登录
  .post('/login', async (req, res, next) => {
    var userName = req.body.userNumber,
      password = req.body.password;

    password = utility.md5(password);

    sql.select('username', userName)
      .then(function (d) {
        if (d[0]) {
          var user = d[0].username,
            pas = d[0].password;
          if (userName !== user || pas !== password) {
            res.send({
              resultcode: '0000',
              data: {
                result: '01',
                text: '用户名或者密码错误'
              }
            })
          } else {
            var user = {
              username: user,
              password: pas
            };
            req.session.user = user;
            res.send({
              resultcode: '0000',
              data: {
                result: '00',
                text: '登陆成功',
                userInfo: {
                  userId: d[0].id,
                  userNumber: req.body.userNumber
                }
              }
            })
          }
        } else {
          res.send({
            resultcode: '0000',
            data: {
              result: '10',
              text: '用户不存在'
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })

  //前台用户登录
  .post('/logins', async (req, res, next) => {
    var userName = req.body.usernumber,
      password = req.body.password;

    password = utility.md5(password);

    uSql.select('username', userName)
      .then(function (d) {
        console.log(d);
        if (d[0]) {
          var user = d[0].username,
            pas = d[0].password;
          if (userName !== user || pas !== password) {
            res.send({
              resultcode: '0000',
              data: {
                result: '01',
                text: '用户名或者密码错误'
              }
            })
          } else {
            var user = {
              username: user,
              password: pas
            };
            req.session.user = user;
            res.send({
              resultcode: '0000',
              data: {
                result: '00',
                text: '登陆成功',
                userInfo: {
                  userId: d[0].id,
                  userNumber: req.body.userNumber
                }
              }
            })
          }
        } else {
          res.send({
            resultcode: '0000',
            data: {
              result: '10',
              text: '用户不存在'
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  });