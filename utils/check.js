module.exports = {
  checkLogin: function (req, res, next) {
    if (!req.session.user) {
      req.flash('info', '请先登录');
      return res.redirect('/signin');
    }
    next();
  },
  checkNotLogin: function (req, res, next) {
    if (req.session.user) {
      req.flash('info', '已登录');
      return res.redirect('/home');
    }
    next();
  }
}