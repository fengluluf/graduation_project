var express = require('express');
var router = express.Router();

const sql = require('../../service/drug');
const sql1 = sql.drugcate;
const sql2 = sql.drugcate2;
const sql3 = sql.drug;

let arr = {};

//记录药品

module.exports = router
  //获取一级分类
  .get('/getFirst', async (req, res, next) => {
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
  //获取二级分类
  .post('/getSecond', async (req, res, next) => {
    sql2.select('drugcate', req.body.drugcate)
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

  //获取全部二级分类
  .get('/getallSecond', async (req, res, next) => {
    sql2.show()
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
              text: '查询失败'
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  })
  //获取三级分类
  .post('/getThird', async (req, res, next) => {
    sql3.select('drugCate2', req.body.drugcate2)
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
              text: '无此药品'
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      })
  })

  //获取全部三级分类
  .get('/getallThird', async (req, res, next) => {
    sql3.show()
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
              text: '无此药品'
            }
          })
        }
      })
      .catch(function (err) {
        console.log(err);
      })
  })

  //药品详情页
  .post('/drugInfo', function (req, res, next) {
    sql3.select('id', req.body.id)
      .then(function (d) {
        if (d[0]) {
          res.send({
            resultcode: '0000',
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

  //增加一级分类
  .post('/addFirst', async (req, res, next) => {
    sql1.insert('drugname', req.body.drugname)
      .then(function (d) {
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '增加成功',
            array: d[0]
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      })
  })
  //增加二级分类
  .post('/addSecond', async (req, res, next) => {
    sql2.insert(['drugcate', 'drugname'], [req.body.drugcate, req.body.drugname])
      .then(function (d) {
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '增加成功',
            array: d[0]
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      })
  })

  //增加药品
  .post('/add', async (req, res, next) => {
    sql3.insert([drugCate, drugCate2, drugName, drugTxt, drugUsage, drugAtten], [req.body.drugcate, req.body.drugCate2, req.body.drugname, req.body.drugTxt, req.body.drugUsage, req.body.drugAtten])
      .then(function (d) {
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '增加成功',
            array: d[0]
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      })
  })
  //删除一级分类
  .post('/deleteFirst', async (req, res, next) => {
    sql1.deletes('id', req.body.id)
      .then(function (d) {
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '删除成功',
            array: d[0]
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      })
    sql2.deletes('drugcate', req.body.id)
      .then(function (d) {
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '删除成功',
            array: d[0]
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      })
    sql3.deletes('drugCate', req.body.id)
      .then(function (d) {
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '删除成功',
            array: d[0]
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      })
  })
  //删除二级分类
  .post('/deleteSecond', async (req, res, next) => {
    sql2.deletes('id', req.body.id)
      .then(function (d) {
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '删除成功',
            array: d[0]
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      })
    sql3.deletes('drugCate2', req.body.id)
      .then(function (d) {
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '删除成功',
            array: d[0]
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      })
  })
  //删除药品
  .post('/delete', async (req, res, next) => {
    sql3.deletes('id', req.body.id)
      .then(function (d) {
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '删除成功',
            array: d[0]
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      })
  })
  //更改一级分类
  .post('/updateFirst', async (req, res, next) => {
    sql1.update('drugname', req.body.drugname, 'id', req.body.id)
      .then(function (d) {
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '更改成功',
            array: d[0]
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      })
  })
  //更改二级分类
  .post('/updateSecond', async (req, res, next) => {
    sql2.update(req.body.updatename, req.body.newdata, 'id', req.body.id)
      .then(function (d) {
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '更改成功',
            array: d[0]
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      })
  })
  //更改药品信息
  .post('/update', async (req, res, next) => {
    sql3.update(req.body.updatename, req.body.newdata, 'id', req.body.id)
      .then(function (d) {
        res.send({
          resultcode: '0000',
          data: {
            result: '00',
            text: '更改成功',
            array: d[0]
          }
        })
      })
      .catch(function (err) {
        console.log(err);
      })
  });