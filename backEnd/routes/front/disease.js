var express = require('express');
var router = express.Router();

const sql = require('../../service/disease');
const sql1 = sql.diseaseCate;
const sql2 = sql.diseasecate2;
const sql3 = sql.disease;

/* GET home page. */
module.exports = router

  //获取一级分类
  .get('/getFirst',function(req,res,next){
    sql1.show()
      .then(function(d){
        console.log(d);
      })
      .catch(function(err){
        console.log(err);
      })
      res.send('success');
  })

  //获取二级分类
  .post('/getSecond', async (req, res, next) => {
    sql2.select('diseasecate', req.body.diseasecate)
      .then(function (d) {
        console.log(d);
        res.send(d);
      })
      .catch(function (err) {
        console.log(err);
      })
  })

  //获取详情
  .post('/diseaseInfo', function (req, res, next) {
    sql3.select('id', req.body.id)
      .then(function (d) {
        if (d[0]) {
          res.send({
            result: '0000',
            data: {
              result: '00',
              text: '查询成功',
              array: d[0]
            }
          })
        } else {
          res.send({
            resultcode: '0000',
            data: {
              result: '01',
              text: '无此疾病'
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })

  //查询疾病
  .get('/searchDisease', function (req, res, next) {
    console.log(req.query);
    var str = req.query.str;
    sql3.search(str)
      .then(function (d) {
        console.log(d);
        if (d.length != 0) {
          res.send({
            resultcode: '0000',
            data: {
              result: '00',
              text: '查询成功',
              arr: d
            }
          })
        } else {
          res.send({
            resultcode: '0000',
            data: {
              result: '01',
              text: '无查询结果'
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      })
  });