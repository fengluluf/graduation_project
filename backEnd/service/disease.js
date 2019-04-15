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
      //diseaseCate,diseaseCate2,diseaseName,pathology,symptom,treatment
      db.query(`insert into disease (${attributenames}) values (${attributes[0]},${attributes[1]},'${attributes[2]}','${attributes[3]}','${attributes[4]}','${attributes[5]}')`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //增加

  search : (param) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from disease where diseaseName like '%${param}%'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  } //模糊查询
}

//疾病一级分类
let diseasecate = {
  show: () => {
    console.log('111');
    return new Promise((resolve, reject) => {
      db.query('select * from diseasecate', (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //显示全部 （select*）

  select: (attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from diseasecate where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //查询一行（传参,返回一个数组)

  update: (updateattributename, newdata, attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`update diseasecate set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //修改

  insert: (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
      db.query(`insert into diseasecate (${attributenames}) values ('${attributes}')`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  } //增加
}

//疾病二级分类
let diseasecate2 = {
  show: () => {
    return new Promise((resolve, reject) => {
      db.query('select * from diseasecate2', (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //显示全部 （select*）

  select: (attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from diseasecate2 where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //查询一行（传参,返回一个数组)

  update: (updateattributename, newdata, attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`update diseasecate2 set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //修改

  insert: (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
      //diseasecate,diseasename
      db.query(`insert into diseasecate2 (${attributenames}) values (${attributes[0]},'${attribute[1]}')`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  } //增加
}

exports.disease = disease;
exports.diseasecate = diseasecate;
exports.diseasecate2 = diseasecate2;