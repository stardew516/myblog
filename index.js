var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var winston = require('winston');
var expressWinston = require('express-winston');
var ueditor = require("ueditor");
var bodyParser = require('body-parser');
var routes = require('./routers');
var app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));

// 设置模板引擎
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'static')));

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


// 错误页
app.use(function (err, req, res, next) {
  console.log('err', err);
  res.render('error', {
    error: err
  });
});

app.use('/success', function (req, res, next) {
  console.log('success');
  res.render('success', {
    url: '/home'
  });
  next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// ueditor 配置
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'static'), function (req, res, next) {
  //客户端上传文件设置
  var ActionType = req.query.action;
  console.log('ActionType111', ActionType);
  if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
    var file_url = '/upload/img/';//默认图片上传地址
    /*其他上传格式的地址*/
    if (ActionType === 'uploadfile') {
      file_url = '/upload/file/'; //附件
    }
    if (ActionType === 'uploadvideo') {
      file_url = '/upload/video/'; //视频
    }
    console.log('ActionType111, file_url', file_url);
    res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    console.log('ActionType111', file_url);
    res.setHeader('Content-Type', 'text/html');
    console.log('Content-Type', res.getHeader('Content-Type'));
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage') {
    var dir_url = '/upload/img/';
    res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {
    // console.log('config.json')
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/nodejs/config.json');
  }
}));

//路由
routes(app);

module.exports =  app;
app.listen(config.port, function () {
  //console.log(`${config.name} listening on port ${config.port}`);
  console.log(config.name + ' listening on port ' + config.port);
});


