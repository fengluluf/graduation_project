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

let time = (startTime,endTime)=>{
  return new Promise((resolve,reject)=>{
    db.query(`select * from article where time>='${startTime} 00:00:00' and time<='${endTime} 23:59:59';`,(err,rows)=>{
      if(err){
        reject(err);
      }
      resolve(rows);
    })
  })
}

let shows = (startTime,endTime)=>{
  return new Promise((resolve,reject)=>{
    db.query(`select * from advertisement`,(err,rows)=>{
      if(err){
        reject(err);
      }
      resolve(rows);
    })
  })
}

let inserts = (attributenames,attributes)=>{
  return new Promise((resolve,reject)=>{
    db.query(`insert into advertisement (${attributenames}) values ('${attributes[0]}','${attributes[1]}','${attributes[2]}')`,(err,rows)=>{
      if(err){
        reject(err);
      }
      resolve(rows);
    })
  })
}

exports.show = show
exports.select = select
exports.update = update
exports.insert = insert
exports.delete = deletes
exports.time = time
exports.inserts = inserts
exports.shows = shows