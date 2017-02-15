module.exports = {
  port: 1991,
  name: 'your blog',
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 604800000 //604800000 一周
  },
  mongodb: 'mongodb://localhost:27017/myblog'
};