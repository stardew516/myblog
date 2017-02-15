var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var checkNotLogin = require('../utils/check').checkNotLogin;

// 登录页面
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signin', {
    title: '登录'
  });
  next();
});

// 用户登录post
router.post('/', checkNotLogin, function(req, res, next) {
  const username = req.fields.username;
  var password = req.fields.passwordOne;
  var remember = req.fields.remember;
  console.log(password, remember);
  password = sha1(password);
  UserModel.getUserByName(username)
    .then(function (user) {
      if (!user) {
        req.flash('info', '用户不存在');
        return res.redirect('back');
      }
      // 检查密码是否匹配
      if (password !== user.password) {
        req.flash('info', '用户名或密码错误');
        return res.redirect('back');
      }
      req.flash('info', '登录成功');
      // 用户信息写入 session
      delete user.password;
      req.session.user = user;
      // 跳转到主页
      res.redirect('/home');
    })
    .catch(next);
});
module.exports = router;
