const db = require('../db/config');

//banner图
let adverObj = {
  show: () => {
    return new Promise((resolve, reject) => {
      db.query('select * from advertisement', (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //显示全部 （select*）

  select: (attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from advertisement where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //查询一行（传参)

  update: (updateattributename, newdata, attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`update advertisement set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //修改

  insert: (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
      db.query(`insert into advertisement (${attributenames}) values (${attributes})`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  } //增加
}

exports.adverObj = adverObj;