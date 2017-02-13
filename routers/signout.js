var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  req.session.user = null;
  res.render('signout', {
    title: '退出'
  });
  next();
});


module.exports = router;
