module.exports = {
  port: 1991,
  name: 'your blog',
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 604800
  },
  mongodb: 'mongodb://localhost:27017/myblog'
};