var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var checkNotLogin = require('../utils/check').checkNotLogin;
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signup', {
    title: '注册'
  });
  next();
});


// 用户注册post
router.post('/', checkNotLogin, function(req, res, next) {
  // 用户名判断唯一
  const username = req.fields.username;
  const email = req.fields.email;
  const phone = req.fields.phone;
  const password = req.fields.password;
  const confirmPassword = req.fields.confirmPassword;
  console.log(username, email, phone, sha1(password), confirmPassword);
  var user = {
    username: username,
    email: email,
    phone: phone,
    password: sha1(password)
  };

  // 用户信息写入数据库
  UserModel.create(user)
    .then(function (result) {
      user = result.ops[0];
      delete user.password;
      req.session.user = user;
      req.flash('info', '注册成功');
      res.redirect('/signin');
    })
    .catch(function (e) {
      console.log('e.message', e.message);
      if (e.message.match('E11000 duplicate key')) {
        req.flash('info', '用户名已被注册!');
        return res.redirect('/signup');
      }
      next(e);
    });
});

module.exports = router;
