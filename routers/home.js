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
        author: result[0] ? result[0].author : ''
      });
      console.log('result', 111);
    })
    .catch(function (e) {
      console.log('error', e.message);
      next(e);
    });
});

// 新增博客页面
router.get('/newblog', checkLogin, function(req, res, next) {
  res.render('newblog', {
    title: '写博客',
    username: req.session.user.username,
    blog: {}
  });
  next();
});

// 编辑完后发布博客
router.post('/publishBlog', checkLogin, function(req, res, next) {
  const title = req.body.title;
  const abstract = req.body.abstract;
  const content = req.body.content;
  const classify = req.body.classify;
  const id = req.body.id || '';
  var blog = {
    title: title,
    author: req.session.user.username,
    abstract: abstract,
    content: content,
    classify: Number(classify),
    isPublish: 1
  };
  if (id) {
    // 修改博客
    BlogModel.update(id, blog)
      .then(function (result) {
        req.flash('info', '修改成功');
        res.redirect('/success');
      })
      .catch(function (e) {
        console.log('error', e.message);
        next(e);
      });
  } else {
    // 新增博客
    BlogModel.create(blog)
      .then(function (result) {
        req.flash('info', '新增成功');
        res.redirect('/success');
      })
      .catch(function (e) {
        console.log('error', e.message);
        next(e);
      });
  }
});

// 编辑完后保存博客内容
router.post('/saveBlog', checkLogin, function(req, res, next) {
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
      req.flash('info', '保存成功');
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

// 修改博客
router.get('/modify', checkLogin, function(req, res, next) {
  const id = req.query.id;
  // 根据_id读取博客内容
  BlogModel.getBlogById(id)
    .then(function (result) {
      res.render('newblog', {
        title: result.title,
        username: req.session.user.username,
        blog: result
      })
    })
    .catch(function (e) {
      console.log('error', e.message);
      next(e);
    });
});

// 删除博客
router.get('/delete', checkLogin, function(req, res, next) {
  const id = req.query.id;
  console.log('reqid', id);
  // 根据_id删除博客
  BlogModel.remove(id)
    .then(function (result) {
      req.flash('info', '删除成功');
      res.redirect('/success');
    })
    .catch(function (e) {
      console.log('error', e.message);
      next(e);
    });
});

// 按类别查找博客
router.get('/classifyBlog', checkLogin, function(req, res, next) {
  const classify = Number(req.query.classify);
  console.log('reqid', classify);
  // 根据_id读取博客内容
  BlogModel.getBlogByClassify(classify)
    .then(function (result) {
      console.error('blogResult', result);
      res.render('home', {
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

module.exports = router;

