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
      console.log('err','error');
      res.render('error');
    }
  });
};