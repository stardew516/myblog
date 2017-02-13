//普通
/*var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('hello, weilu');
});
app.get('/users/:name', function (req, res) {
  res.send('hello, ' + req.params.name);
});
app.listen(3000);*/


//router路由分模块
/*var path = require('path');
var express = require('express');
var app = express();
var indexRouter = require('./routers/index');
var userRouter = require('./routers/users');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(3000);*/


//express
/*var express = require('express');
var app = express();
app.use(function (req, res, next) {
  console.log(11);
  next(new Error('我错了'));
});
app.use(function (req, res, next) {
  console.log(22);
  res.status(200).end();
});
app.use(function (err, req, res, next) {
  console.log(err, err.stack);
  res.status(500).send('处理错误---我错了');
});
app.listen(3000);*/

var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var winston = require('winston');
var expressWinston = require('express-winston');
var routes = require('./routers');
var app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));

// 设置模板引擎
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'static')));

// 错误页
app.use(function (err, req, res, next) {
  console.log('err', err);
  res.render('error', {
    error: err
  });
});

app.use('/success', function (req, res, next) {
  console.log('success');
  res.render('success');
  next();
});

// session 中间件
app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({ // 将 session 存储到 mongodb
    url: config.mongodb
  })
}));

// flash 中间件，用来显示通知
app.use(flash());

// set flash
app.use(function (req, res, next) {
  res.locals.infos = req.flash('info');
  next();
});

// 处理表单中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
  keepExtensions: true// 保留后缀
}));

// 正常请求日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}));

// 错误请求日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));
//路由
routes(app);

module.exports =  app;
app.listen(config.port, function () {
  //console.log(`${config.name} listening on port ${config.port}`);
  console.log(config.name + ' listening on port ' + config.port);
});


