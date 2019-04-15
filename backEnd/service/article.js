const db = require('../db/config');
let show = () => {
  return new Promise((resolve, reject) => {
    db.query('select * from article', (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    })
  })
} //显示全部 （select*）

let select = (attributename, attribute) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from article where ${attributename} = '${attribute}'`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    })
  })
} //查询一行（传参)

let update = (updateattributename, newdata, attributename, attribute) => {
  return new Promise((resolve, reject) => {
    db.query(`update article set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    })
  })
} //修改

let insert = (attributenames, attributes) => {
  return new Promise((resolve, reject) => {
    //articleName,articleTxt,userId,time
    db.query(`insert into article (${attributenames}) values ('${attributes[0]}','${attributes[1]}',${attributes[2]},'${attributes[3]}')`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    })
  })
} //增加

let deletes = (attributenames, attributes) => {
  return new Promise((resolve, reject) => {
    db.query(`delete from article where ${attributenames} = '${attributes}';`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    })
  })
} //删除

exports.show = show
exports.select = select
exports.update = update
exports.insert = insert
exports.delete = deletes