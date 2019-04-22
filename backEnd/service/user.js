const db = require('../db/config');
let show = () => {
  return new  Promise((resolve, reject) => {
    db.query('select * from userinfo', (err, rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}//显示全部 （select*）

let select = (attributename, attribute) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from userinfo where ${attributename} = '${attribute}'`, (err, rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}//查询一行（传参,返回一个数组)

let update = (updateattributename, newdata,attributename,attribute) => {
  return new Promise((resolve, reject) => {
    db.query(`update userinfo set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`,(err,rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  }) 
}//修改

let insert = (attributenames, attributes) => {
  return new Promise((resolve, reject) => {
    db.query(`insert into userinfo (${attributenames}) values (${attributes[0]},'${attributes[1]}')`, (err,rows) => {
      if(err) {
        reject(err);
      }
      resolve(rows);
    })
  })
}//增加

exports.show = show
exports.select = select
exports.update =  update
exports.insert = insert