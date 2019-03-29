var express = require('express');
var router = express.Router();

const uSql = require('../../service/user');
const aSql = require('../../service/article');

module.exports = router
  .get('/a',async(req,res,next)=>{
    res.session.ok = 'ok';
    res.send('success!');
  })
  .get('/b',async(req,res,next)=>{
    console.log(res);
    console.log(res.session);
    res.send('success');
  });