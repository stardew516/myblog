var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

// 时间格式化组件
var moment = require('moment');
// id转时间戳
var objectIdToTimestamp = require('objectid-to-timestamp');

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    });
    return results;
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
    return result;
  }
});

// 用户数据
exports.User = mongolass.model('User', {
  username: { type: 'string' },
  phone: { type: 'string' },
  email: { type: 'string' },
  password: { type: 'string' }
});

// 根据用户名找到用户，用户名全局唯一
exports.User.index({ username: 1}, { unique: true }).exec();

// 博客数据
exports.Blog = mongolass.model('Blog', {
  title: { type: 'string' },
  author: { type: 'string' },
  abstract: { type: 'string' },
  content: { type: 'string' },
  classify: { type: 'number' },
  isPublish: { type: 'number' }
});
/* classify 1. 基础   11. 数据结构  12. 网络编程  13. 其它
            2. 前端   21. html     22. css     23. javascript  24. 其它
            3. 其它
   isPublish: 0: 保存  1: 发布
 */

// 博客
exports.Blog.index({title: 1}).exec();
