const db = require('../db/config');

//疾病
let disease = {
  show: () => {
    return new Promise((resolve, reject) => {
      db.query('select * from disease', (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //显示全部 （select*）

  select: (attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from disease where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //查询一行（传参,返回一个数组)

  update: (updateattributename, newdata, attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`update disease set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //修改

  insert: (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
      db.query(`insert into disease (${attributenames}) values (${attributes})`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  } //增加
}

//疾病种类
let diseaseCate = {
  show: () => {
    return new Promise((resolve, reject) => {
      db.query('select * from diseaseCate', (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //显示全部 （select*）

  select: (attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from diseaseCate where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //查询一行（传参,返回一个数组)

  update: (updateattributename, newdata, attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`update diseaseCate set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //修改

  insert: (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
      db.query(`insert into diseaseCate (${attributenames}) values (${attributes})`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  } //增加
}

exports.disease = disease
        diseaseCate = diseaseCate;