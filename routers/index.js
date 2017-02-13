/*var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('hello, weilu');
});

module.exports = */


module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/home');
  });
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/home', require('./home'));
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.render('error');
    }
  });
};