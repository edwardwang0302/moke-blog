---
id: write-a-webpack-plugin
title: 从零实现一个webpack插件
# author: 莫珂
# author_title: 高级前端开发工程师
# author_url: https://github.com/edwardwang0302
# author_image_url: https://avatars1.githubusercontent.com/u/8874799
tags: ['Webpack']
description: '从零实现一个webpack插件'
---

Webpack以强大的功能成为了我们前端开发必不可少的一环，`plugin` 更是这一强大必不可少的一环。
<!--truncate-->
### webpack plugin的基础结构
以 `html-webpack-plugin` 为例，它的使用如下
```js
plugins: [
    new HtmlWebpackPlugin({
        ...
    }),
],
```
不难看出，webpack plugin 的基本形式一个构造函数 new function()，同时为了能够获得 compiler，就需要 plugin 对外暴露一个接口（为 apply 函数）。我们先来抛出一个webpack插件基本内容：
1. 一个 JavaScript 函数或者类
2. 在函数原型（prototype）中定义一个注入compiler对象的apply方法。
3. apply函数中通过compiler插入指定的事件钩子，在钩子回调中拿到compilation对象
4. 使用compilation操纵修改webapack内部实例数据。
5. 异步插件，数据处理完后使用callback回调

### 实现一个简单插件
```js
class WebpackCleanupPlugin {
  // 构造函数
  constructor(options) {
    console.log("WebpackCleanupPlugin", options);
  }
  // 应用函数
  apply(compiler) {
    console.log(compiler);
    // 绑定钩子事件
    compiler.plugin("done", compilation => {
      console.log(compilation);
    });
  }
}
```
当我们在webpack配置文件中通过`new WebpackCleanupPlugin()`方式引用之后即可运行。

我们自己写的插件流程如下：
- webpack 启动后，在读取配置的过程中会先执行 new WebpackCleanupPlugin() 初始化一个 WebpackCleanupPlugin 获得其实例。
- 在初始化 compiler 对象后，再调用 WebpackCleanupPlugin.apply(compiler) 给插件实例传入 compiler 对象。
- 插件实例在获取到 compiler 对象后，就可以通过 compiler.plugin(事件名称, 回调函数) 监听到 Webpack 广播出来的事件。
- 并且可以通过 compiler 对象去操作 webpack。

### Compiler , Compilation
- Compiler 对象包含了webpack环境所有的配置信息，包含 `options`， `hook`, `loaders`， `plugins` 这些信息。这个对象在 webpack 启动时候实例化，是全局唯一的。可以简单理解为 webpack 的实例
- Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。

> Compiler 和 Compilation 的区别在于：Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。