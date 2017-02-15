var express = require('express');
var router = express.Router();
var checkLogin = require('../utils/check').checkLogin;
var ueditor = require('ueditor');

// home 页面
router.get('/', checkLogin, function(req, res, next) {
  console.log('req.user', req.session.user);
  res.render('home', {
    title: '主页',
    username: req.session.user.username
  });
  next();
});
router.get('/newblog', checkLogin, function(req, res, next) {
  res.render('newblog', {
    title: '写博客',
    username: req.session.user.username
  });
  next();
});

//router.post('/', checkLogin, function(req, res, next) {
//  console.log('edit');
//  res.render('newblog', {
//    title: '写博客'
//  });
//  next();
//});


module.exports = router;

