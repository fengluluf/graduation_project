const db = require('../db/config');
let drug = {
  show: () => {
    return new Promise((resolve, reject) => {
      db.query('select * from drug', (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //显示全部 （select*）

  select: (attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from drug where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //查询一行（传参)

  update: (updateattributename, newdata, attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`update drug set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //修改

  insert: (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
      db.query(`insert into drug (${attributenames}) values (${attributes[0]},${attributes[1]},'${attributes[2]}','${attributes[3]}','${attributes[4]}','${attributes[5]}')`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //增加

  deletes: (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from drug where ${attributenames} = '${attributes}';`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //删除

  search : (param) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from drug where drugName like '%${param}%'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  } //模糊查询
}

let drugcate = {
  show: () => {
    return new Promise((resolve, reject) => {
      db.query('select * from drugcate', (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //显示全部 （select*）

  select: (attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from drugcate where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //查询一行（传参)

  update: (updateattributename, newdata, attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`update drugcate set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //修改

  insert: (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
      db.query(`insert into drugcate (${attributenames}) values ('${attributes}')`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //增加

  deletes: (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from drugcate where ${attributenames} = '${attributes}';`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //删除

  search: (param) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from drugcate where drugName like '%${param}%'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  } //模糊查询
}

let drugcate2 = {
  show : () => {
    return new Promise((resolve, reject) => {
      db.query('select * from drugcate2', (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //显示全部 （select*）
  
  select : (attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from drugcate2 where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //查询一行（传参)
  
  update : (updateattributename, newdata, attributename, attribute) => {
    return new Promise((resolve, reject) => {
      db.query(`update drugcate2 set ${updateattributename} = '${newdata}' where ${attributename} = '${attribute}'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //修改
  
  insert : (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
      db.query(`insert into drugcate2 (${attributenames}) values (${attributes[0]},'${attributes[1]}')`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //增加
  
  deletes : (attributenames, attributes) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from drugcate2 where ${attributenames} = '${attributes}';`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }, //删除
  
  search : (param) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from drugcate2 where drugName like '%${param}%'`, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  } //模糊查询
}

exports.drug = drug;
exports.drugcate = drugcate;
exports.drugcate2 = drugcate2;