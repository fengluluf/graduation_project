var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors');

var indexRouter = require('./routes/front/index');
var usersRouter = require('./routes/front/users');
var articleRouter = require('./routes/front/article');
var drugRouter = require('./routes/front/drug');
var diseaseRouter = require('./routes/front/disease');

var usersBackRouter = require('./routes/back/users');
var articleBackRouter = require('./routes/back/article');
var drugBackRouter = require('./routes/back/drug');
var diseaseBackRouter = require('./routes/back/disease');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({
    extended: false
  }))
  .use(cookieParser())
  .use(session({
    secret: 'xingjl',
    resave: false,//每次请求重新设置session cookie
    saveUninitialized: true,
    cookie: {
      // secure: true,
      maxAge: 1000 * 60 * 10,
    },
    user:null
  }))
  .use(express.static(path.join(__dirname, 'public')))
  // .use(bodyParser()) //解析post请求参数
  .use(async (req, res, next) => { //响应头设置
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.set("Access-Control-Allow-Headers", "X-Requested-With");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Allow-Credentials", "true");
    // res.set("X-Powered-By",' 3.2.1');
    res.set("Content-Type", "application/json; charset=utf-8");
    // res.setHeader("Set-Cookie", ["sid="+newUser.toCookie()+";path=/;domain="+config.domain+";expires="+new Date("2030") ]);
    await next();
  });

// app.use(cors({
//   origin: 'http://locahost:8080',
//   credentials: true
// }));

app.use(function (req, res, next) {
  console.log('11111111111111',req.session.user);
  res.locals.user = req.session.user;
  var err = req.session.error;
  res.locals.message = '';
  if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);
app.use('/drug', drugRouter);
app.use('/disease', diseaseRouter);

app.use('/backUsers', usersBackRouter);
app.use('/backArticle', articleBackRouter);
app.use('/backDrug', drugBackRouter);
app.use('/backDisease', diseaseBackRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;