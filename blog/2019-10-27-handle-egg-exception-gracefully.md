---
id: handle-eggjs-exception-gracefully
title: Egg优雅的实现异常处理
# author: 莫珂
# author_title: 高级前端开发工程师
# author_url: https://github.com/edwardwang0302
# author_image_url: https://avatars1.githubusercontent.com/u/8874799
tags: [Node.js, Egg.js]
description: "Egg.js优雅的实现异常处理"
---

### 前言

这些文章就是记录点的东西，当笔记的，尽量简短实用；今天简单写一下假设 eggjs 开发一个 api 接口服务器，并根据各种情况正确返回 json 格式，优雅的实现异常处理；

<!--truncate-->

### 为什么需要错误处理

1. 防止程序挂掉
2. 告诉用户错误信息
3. 方便开发调试，定位问题
4. api 接口服务器规定的返回数据结构

### 几种错误

1. 程序运行错误 如 500 错误
2. 开发自己抛出的异常错误
3. 404 错误

### 自己实现中间件

我们先自己实现一个中间件来处理错误，下一个话题说如何避免造轮子

![egg demo的结构示意图](https://user-gold-cdn.xitu.io/2019/10/27/16e0c226acda9b3d?w=428&h=934&f=png&s=87159)
这里我自己创建 middleware 目录，用于存储中间件

```javascript
module.exports = (options) => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // 我们就简单的try catch处理一下异常，同实因为上述提到的第一种程序运行错误无status和statusCode，因为这里有500处理
      ctx.status = err.status || err.statusCode || 500;
      ctx.body = {
        message: err.message,
      };
    }
  };
};
```

上述就是一个简单的自定义错误中间件处理，通过这个中间件我们可以实现类似下图的错误处理（这里我们在 controller 中通过 koa 自带 ctx.throw 方法抛出 403 错误）
![postman中403测试结果](https://user-gold-cdn.xitu.io/2019/10/27/16e0c31bfc63ab49?w=714&h=536&f=png&s=47019)

但这个中间件有个小问题，在 404 时候的处理并不友好，并没有满足要求返回 json
![404返回结果](https://user-gold-cdn.xitu.io/2019/10/27/16e0c339738a5ae8?w=656&h=468&f=png&s=40866)

### 避免重复造轮子

egg 基于 koa，这里我们没必要重复造轮子，可以使用社区一个优秀的轮子[koa-json-err](https://user-gold-cdn.xitu.io/2019/10/27/16e0c3ae33fd4ee4)；感兴趣可以点击链接去 github 阅读更多

#### egg 中使用 koa 中间件

```javascript
// middlware/error.js
module.exports = require("koa-json-error");
```

```json
// config/config.xxx.js中可以配置
config.middleware = ['error'];
config.error = {
    // 这里使用appInfo.env来判断环境，仅仅在非生产环境下打开堆栈信息，用于调试
    postFormat: (e, { stack, ...rest}) => appInfo.env === 'prod' ? rest: { stack, ...rest}
}
```

![使用中间后的404处理](https://user-gold-cdn.xitu.io/2019/10/27/16e0c3f6d4011ff3?w=1106&h=746&f=png&s=120523)

### 总结

综上就是简单介绍了一下 egg 中优雅处理各种异常的方式了；下一篇将简单记录下如何实现 jwt 认证
