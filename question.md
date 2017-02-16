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

3. 使用两个静态目录时,
```
// 优先public(前者)
app.use(express.static('public'));
app.use(express.static('files'));
```

4. form提交后一直转圈圈
  引入ueditor时, 添加body-parser引起, 因为之前的表单处理采用的中间件为
  express-formidable
  使用数据方式为: req.fields.username
  添加body-parser后两种数据解析方式冲突了, 解决办法是, 删除express-formidable
  使用数据方式变为: req.body.username

5. 读取博客内容时, html的标签直接显示在页面上,
  ```
  <p style="box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin-bottom: 16px; color: rgb(61, 70, 77); font-family: &quot;Pingfang SC&quot;, STHeiti, &quot;Lantinghei SC&quot;, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif; white-space: normal; background-color: rgb(248, 248, 248);">1. 贪婪模式 （尽可能多的去匹配符合条件的字符串）</p>
  ```
  解决: <%= %>  改为 <%- %>
  因为content是markdown转换过的html字符串。
  ejs的特性：
  1、缓存功能，能够缓存已经解析好的html模版；
  2、<% code %>用于执行其中javascript代码；
  3、<%= code %>会对code进行html转义；
  4、<%- code %>将不会进行转义；
  5、支持自定义标签，比如’<%‘可以使用’{{’，’%>‘用’}}'代替；
  6、提供一些辅助函数，用于模版中使用
  7、利用<%- include filename %>加载其他页面模版；

6. 删除成功时, flash报错.
  在写上一个项目sign时, 已经研究过这个connect-flash, 自认为用法都会了, 就是flash之后
  结合redirect一起使用, 但是此处又报错, 说找不到infos, 查了数据库, session值里确实有这个,
  经排查发现是之前的页面都是在flash载入之后加载的, 而success这个页面是在之间定义的, 所以报错,
  把success的路由放到flash的后面就好了. 感慨下, node里加载顺序真的很重要.
