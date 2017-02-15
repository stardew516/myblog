var Blog = require('../lib/mongo').Blog;

module.exports = {
  // 新增博客
  create: function create(blog) {
    return Blog.create(blog).exec();
  },

  // 保存博客
  update: function update(blog) {
    return Blog.update({id: blog.id }, { $set: blog }).exec();
  },

  // 通过用户名查询博客
  getBlogByName: function getBlogByName(username) {
    return Blog
      .find({ author: username })
      .addCreatedAt()
      .exec();
  },

  // 通过id查询博客
  getBlogById: function getBlogById(id) {
    return Blog
      .findOne({ _id: id })
      .addCreatedAt()
      .exec();
  },

  // 通过类别查询博客
  getBlogByClassify: function getBlogByClassify(classify) {
    return Blog
      .findOne({ classify: classify })
      .addCreatedAt()
      .exec();
  }
};
