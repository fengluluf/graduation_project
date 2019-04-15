var express = require('express');
var router = express.Router();

const sql = require('../../service/drug');
const sql1 = sql.drugcate;
const sql2 = sql.drugcate2;
const sql3 = sql.drug;

/* GET home page. */
module.exports = router

  //药品一级分类
  .get('/getFirst', function (req, res, next) {
    sql1.show()
      .then(function (d) {
        if (d[0]) {
          res.send({
            resultcode: '0000',
            data: {
              result: '00',
              text: '查询成功',
              array: d
            }
          })
        } else {
          res.send({
            resultcode: '0000',
            data: {
              result: '01',
              text: '无此分类药品'
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })

  //药品二级分类
  .post('/getSecond', function (req, res, next) {
    sql2.select('drugcate', req.body.drugcate)
      .then(function (d) {
        if (d[0]) {
          res.send({
            result: '0000',
            data: {
              result: '00',
              text: '查询成功',
              array: d
            }
          })
        } else {
          res.send({
            resultcode: '0000',
            data: {
              result: '01',
              text: '无此分类药品'
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })

  //药品详情页
  .post('/drugInfo', function (req, res, next) {
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
              text: '无此药品'
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })

  //药品查询
  .post('/searchDrug', function (req, res, next) {
    var str = req.body.str;
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