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
        console.log(d);
        arr = d;
        res.send(d);
      })
      .catch(function (err) {
        console.log(err);
      })
    // res.send('000');
  })
  //获取二级分类
  .post('/getSecond', async (req, res, next) => {
    sql2.select('drugcate', req.body.drugcate)
      .then(function (d) {
        console.log(d);
        res.send(d);
      })
      .catch(function (err) {
        console.log(err);
      })
  })
  //获取三级分类
  .post('/getThird', async (req, res, next) => {
    sql3.select('drugCate2', req.body.drugcate2)
      .then(function (d) {
        res.send(d);
      })
      .catch(function (err) {
        console.log(err);
      })
  })
  //增加一级分类
  .post('/addFirst', async (req, res, next) => {
    sql1.insert('drugname', req.body.drugname)
      .then(function (d) {
        console.log(d);
        res.send('success');
      })
      .catch(function (err) {
        console.log(err);
      })
  })
  //增加二级分类
  .post('/addSecond', async (req, res, next) => {
    sql2.insert(['drugcate', 'drugname'], [req.body.drugcate, req.body.drugname])
      .then(function (d) {
        console.log(d);
        res.send('success');
      })
      .catch(function (err) {
        console.log(err);
      })
  })

  //增加药品
  .post('/add', async (req, res, next) => {
    sql3.insert([drugCate, drugCate2, drugName, drugTxt, drugUsage, drugAtten], [req.body.drugcate, req.body.drugCate2, req.body.drugname, req.body.drugTxt, req.body.drugUsage, req.body.drugAtten])
      .then(function (d) {
        console.log(d);
        res.send('success');
      })
      .catch(function (err) {
        console.log(err);
      })
    res.send('success');
  })
  //删除一级分类
  .post('/deleteFirst', async (req, res, next) => {
    sql1.deletes('id', req.body.id)
      .then(function (d) {
        console.log(d);
      })
      .catch(function (err) {
        console.log(err);
      })
    sql2.deletes('drugcate', req.body.id)
      .then(function (d) {
        console.log(d);
      })
      .catch(function (err) {
        console.log(err);
      })
    sql3.deletes('drugCate', req.body.id)
      .then(function (d) {
        console.log(d);
      })
      .catch(function (err) {
        console.log(err);
      })
    res.send('success');
  })
  //删除二级分类
  .post('/deleteSecond', async (req, res, next) => {
    sql2.deletes('id', req.body.id)
      .then(function (d) {
        console.log(d);
        res.send('success');
      })
      .catch(function (err) {
        console.log(err);
      })
    sql3.deletes('drugCate2', req.body.id)
      .then(function (d) {
        console.log(d);
      })
      .catch(function (err) {
        console.log(err);
      })
    res.send('success');
  })
  //删除药品
  .post('/delete', async (req, res, next) => {
    sql3.deletes('id', req.body.id)
      .then(function (d) {
        console.log(d);
      })
      .catch(function (err) {
        console.log(err);
      })
    res.send('success');
  })
  //更改一级分类
  .post('/updateFirst', async (req, res, next) => {
    sql1.update('drugname', req.body.drugname, 'id', req.body.id)
      .then(function (d) {
        console.log(d);
      })
      .catch(function (err) {
        console.log(err);
      })
    res.send('success');
  })
  //更改二级分类
  .post('/updateSecond', async (req, res, next) => {
    sql2.update(req.body.updatename, req.body.newdata, 'id', req.body.id)
      .then(function (d) {
        console.log(d);
      })
      .catch(function (err) {
        console.log(err);
      })
    res.send('success');
  })
  //更改药品信息
  .post('/update', async (req, res, next) => {
    sql3.update(req.body.updatename, req.body.newdata, 'id', req.body.id)
      .then(function (d) {
        console.log(d);
      })
      .catch(function (err) {
        console.log(err);
      })
    res.send('success');
  });