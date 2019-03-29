var express = require('express');
var router = express.Router();

const uSql = require('../../service/user');
const aSql = require('../../service/article');

module.exports = router
  .get('/a',async(req,res,next)=>{
    req.session.ok = 'abcd';
    res.send('success!');
  })
  .get('/b',async(req,res,next)=>{
    // console.log(req);
    // console.log(req.session[0]);
    // console.log(typeof(req.session));
    console.log('---------');
    console.log(JSON.parse(req.sessionStore.sessions[Object.keys(req.sessionStore.sessions)[0]]).ok);
    console.log(req.session);
    console.log('-----------');
    res.send('success');
  });