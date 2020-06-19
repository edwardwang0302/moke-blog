---
id: css-sprites
title: 雪碧图
author: 莫珂
author_title: 高级前端开发工程师
author_url: https://github.com/edwardwang0302
author_image_url: https://avatars1.githubusercontent.com/u/8874799
tags: [HTTP, CSS, 性能优化]
description: 'css sprites 雪碧图优缺点'
---
雪碧图的英文是CSS Sprites。 其目的是将多张比较小的图片，合并到一张大的图片上面，大的图片背景透明，使用的时候，通过把该张图片当做背景图片，通过不同的 `background-position` 定位来展示的那部分图片。
<!--truncate-->
### 好处
1. 降低服务器压力。
2. 减少网络请求，页面渲染更快。

### 缺点
1. 后期维护困难，添加一张图片需要重新制作。
2. 应用麻烦，每一张图都需要计算位置，通过调整位置来展示图片，对误差的要求很严格。
3. 使用图片有局限，只能用在背景图片background-image上，不能用`<img>`标签来使用。

### 雪碧图使用场景
主用在网站的icon上面，很多网站都有很多小图标，这些小图标如果都是单独请求网络，务必会消耗很多玩网络资源（每次请求都会有一个连接与断开的时间消耗），但是比较大的图片，就不建议用雪碧图，因为图片太大，一次请求获取的数据量大，拿到这个大图需要的时间就长，降低了网页的整体体验。

### 制作雪碧图
推荐一个在线制作雪碧图的网站:[网站](https://www.toptal.com/developers/css/sprite-generator)

