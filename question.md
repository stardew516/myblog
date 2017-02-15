#### 遇到问题:
1. 写博客时, ueditor没有效果
根据github上的demo配置好了, 却始终显示不出来编辑框, 排查路径, 引用, ejs引擎,
最后发现没有实例化, 泪牛满面, 一定要加上这句.
```
var ue = UE.getEditor('editor');
```
2. ueditor  上传图片问题:
  code/myblog/node_modules/ueditor/index.js:79
                'title': req.body.pictitle,
                                 ^
  TypeError: Cannot read property 'pictitle' of undefined

  开始以为是路径问题, 后来发现是没有body-parser
  body-parser: 用于解析客户端请求的body中的内容, 内部使用JSON编码处理, url编码处理以及对于文件的上传处理.



