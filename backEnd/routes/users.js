const express = require('express');
const router = express.Router();
const URL = require('url');
const axios = require('axios');
const request = require('request'),
  querystring = require('querystring');

/* GET users listing. */
module.exports = router

  //注册发送验证码
  .get('/hh-login/send', async (req, res, next) => {
    var sendNumber = Math.floor(Math.random() * 1000000 + 1);
    res.send('respond with a resource');
    //存储对象
    var user = {
      telNumber: '15732115283',
      sendNumber: sendNumber
    }
    req.session.user = user;

    //发送验证码
    var queryData = querystring.stringify({
      "mobile": '15732115283', // 接受短信的用户手机号码
      "tpl_id": "139613", // 您申请的短信模板ID，根据实际情况修改
      "tpl_value": "#code#=" + sendNumber, // 您设置的模板变量，根据实际情况修改
      "key": "2cca1ff8db0552c0426125ed2403cc8d", // 应用APPKEY(应用详细页查询)
    });

    var queryUrl = 'http://v.juhe.cn/sms/send?' + queryData;

    request(queryUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body) // 打印接口返回内容

        var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
        console.log(jsonObj)
      } else {
        console.log('请求异常');
      }
    })

  })

  //注册进行校验信息
  .post('/hh-login/register', async (req, res, next) => {
    // var user = new User();
    // var params = URL.parse(req.url, true).query;

    // if (params.id == '1') {
    //   user.name = "ligh";
    //   user.age = "1";
    //   user.city = "北京市";
    // } else {
    //   user.name = "SPTING";
    //   user.age = "1";
    //   user.city = "杭州市";
    // }

    // var response = {
    //   status: 1,
    //   data: user
    // };
    // res.send(JSON.stringify(response));

    if (req.session.user) {
      var user = req.session.user;
      var sendNumber1 = user.sendNumber,
          sendNumber2 = req.sendNumber;
      if(sendNumber1 === sendNumber2){

        res.send({'resultcode':'0000',data:{result:'00','text':'注册成功'}});
      }else{
        res.send({resultcode:'0000',data:{result:'01','text':'注册失败'}});
      }
    } else {
      res.send('您的验证码已过期，请重新发送！');
    }
  })

  //用户登录
  .post('/hh-login/login', async (req, res, next) => {
    var userName = req.telNumber;
  });