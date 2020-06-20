---
id: responsive-design2
title: 移动端适配2
# author: 莫珂
# author_title: 高级前端开发工程师
# author_url: https://github.com/edwardwang0302
# author_image_url: https://avatars1.githubusercontent.com/u/8874799
tags: ['Responsive design']
description: '移动端适配概念，px-to-viewport方案'
---

上一篇谈了移动端适配的一些基础概念，以及flexible框架的内容，但随着时间的推移，更好的vm、vh的支持，让我们组件可以抛弃flexible框架，下面我们一起来看看
<!--truncate-->
和Viewport相关的单位有四个，分别为`vw`、`vh`、`vmin`和`vmax`。

+ vw：是Viewport's width的简写,1vw等于window.innerWidth的1%
+ vh：和vw类似，是Viewport's height的简写，1vh等于window.innerHeihgt的1%
+ vmin：vmin的值是当前vw和vh中较小的值
+ vmax：vmax的值是当前vw和vh中较大的值
> vmin和vmax是根据Viewport中长度偏大的那个维度值计算出来的，如果window.innerHeight > window.innerWidth则vmin取百分之一的window.innerWidth，vmax取百分之一的window.innerHeight计算。

所以在这个方案中大胆的使用vw来替代以前Flexible中的rem缩放方案。我们可以使用PostCSS的插件 `postcss-px-to-viewport`，让我们可以直接在代码中写px

```js
"postcss-px-to-viewport": {
  viewportWidth: 750,      // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
  viewportHeight: 1334,    // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
  unitPrecision: 3,        // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
  viewportUnit: 'vw',      // 指定需要转换成的视窗单位，建议使用vw
  selectorBlackList: ['.ignore', '.hairlines'],  // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
  minPixelValue: 1,       // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
  mediaQuery: false       // 允许在媒体查询中转换`px`
}
```

### viewport不足之处
1. 当容器使用vw单位，margin采用px单位时，很容易造成整体宽度超过100vw，从而影响布局效果。可以使用padding代替margin，并配合box-sizing；现在也可以使用cal函数
2. px转换成vw单位，多少还会存在一定的像素差，毕竟很多时候无法完全整除。

