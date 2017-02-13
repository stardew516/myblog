var express = require('express');
var router = express.Router();
var checkLogin = require('../utils/check').checkLogin;

router.get('/', checkLogin, function(req, res, next) {
  console.log('req.user', req.session.user);
  res.render('home', {
    title: '主页',
    username: req.session.user.username
  });
  next();
});


module.exports = router;
