---
id: http-options-request
title: Http Options请求
# author: 莫珂
# author_title: 高级前端开发工程师
# author_url: https://github.com/edwardwang0302
# author_image_url: https://avatars1.githubusercontent.com/u/8874799
tags: [HTTP, '性能优化']
description: 'http-options-request Http Options请求'
---
![](https://cdn.jsdelivr.net/gh/edwardwang0302/blog-pic/img/http.png)
在我们工作中跨域请求可谓是家常便饭，其中有一种解决方式叫做“跨域资源共享”(Cross-origin resource sharing)可以解决跨域问题。可是有时候我们会发现同一个请求会请求两次，这是为什么呢？
<!--truncate-->
针对CORS请求，浏览器将其分成两个类型：**简单请求和非简单请求**

针对非简单请求，浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证等相关数据）。

### 什么是非简单请求
根绝MDN定义，满足一下要求为非简单请求
![](https://cdn.jsdelivr.net/gh/edwardwang0302/blog-pic/img/mdn.jpg)

对我们来说能不能优化避免每次这样呢？

### 解决方案
#### 1. 使用简单请求
不过这种方式也不适合所有的情况，毕竟限制太大

#### 2. Access-Control-Max-Age
Access-Control-Max-Age 这个响应头表示预请求的返回结果，即 Access-Control-Allow-Methods / Access-Control-Allow-Headers 可以被缓存多久，单位为秒。
