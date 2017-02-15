var express = require('express');
var router = express.Router();
var checkLogin = require('../utils/check').checkLogin;
var BlogModel = require('../models/blog');

// home 页面
router.get('/', checkLogin, function(req, res, next) {
  // 读取个人博客
  var username = req.session.user.username;
  BlogModel.getBlogByName(username)
    .then(function (result) {
      res.render('home', {
        title: '主页',
        username: username,
        result: result,
        author: result[0].author
      });
      console.log('result', 111);
    })
    .catch(function (e) {
      console.log('error', e.message);
      next(e);
    });
});
router.get('/newblog', checkLogin, function(req, res, next) {
  res.render('newblog', {
    title: '写博客',
    username: req.session.user.username
  });
  next();
});
router.post('/publishBlog', checkLogin, function(req, res, next) {
  const title = req.body.title;
  const abstract = req.body.abstract;
  const content = req.body.content;
  const classify = req.body.classify;
  var blog = {
    title: title,
    author: req.session.user.username,
    abstract: abstract,
    content: content,
    classify: Number(classify),
    isPublish: 1
  };
  // 博客写入数据库
  BlogModel.create(blog)
    .then(function (result) {
      req.flash('info', '成功');
      res.redirect('/success');
    })
    .catch(function (e) {
      console.log('error', e.message);
      next(e);
    });
});

// 点击查看博客内容
router.get('/article', checkLogin, function(req, res, next) {
  const id = req.query.id;
  console.log('reqid', id);
  // 根据_id读取博客内容
  BlogModel.getBlogById(id)
    .then(function (result) {
      res.render('blog', {
        title: result.title,
        username: req.session.user.username,
        result: result
      })
    })
    .catch(function (e) {
      console.log('error', e.message);
      next(e);
    });
});

router.get('/saveBlog', checkLogin, function(req, res, next) {
  const title = req.body.title;
  const abstract = req.body.abstract;
  const content = req.body.content;
  const classify = req.body.classify;
  var blog = {
    title: title,
    author: req.session.user.username,
    abstract: abstract,
    content: content,
    classify: Number(classify),
    isPublish: 0
  };
  // 博客写入数据库
  BlogModel.create(blog)
    .then(function (result) {
      req.flash('info', '成功');
      res.redirect('/success');
    })
    .catch(function (e) {
      console.log('error', e.message);
      next(e);
    });
});

module.exports = router;

