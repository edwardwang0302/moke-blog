---
id: responsive-design1
title: 移动端适配1
author: 莫珂
author_title: 高级前端开发工程师
author_url: https://github.com/edwardwang0302
author_image_url: https://avatars1.githubusercontent.com/u/8874799
tags: ['Responsive design']
description: '移动端适配概念，flexible方案'
---

### 基本概念：
#### 视窗viewport:
viewport是严格等于浏览器的窗口。在桌面浏览器中，viewport就是浏览器窗口的宽度高度。但在移动端设备上就有点复杂。

<!--truncate-->
移动端的viewport太窄，为了能更好为CSS布局服务，所以提供了两个viewport:虚拟的viewport `visualviewport`和布局的viewport `layoutviewport`。

#### 物理像素physical viewport
物理像素又被称为设备像素，他是显示设备中一个最微小的物理部件。

#### 设备独立像素density-independent pixel
设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

#### CSS像素
CSS像素是一个抽像的单位，主要使用在浏览器上，用来精确度量Web页面上的内容。一般情况之下，CSS像素称为与设备无关的像素(device-independent pixel)，简称DIPs。

#### 屏幕密度
屏幕密度是指一个设备表面上存在的像素数量，它通常以每英寸有多少像素来计算(PPI)。

#### 设备像素比(device pixel ratio)
设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到：

设备像素比 ＝ 物理像素 / 设备独立像素

### lib-flexible（此方案已经过时，这里只是记录）
执行这个JS后，会在`<html>`元素上增加一个data-dpr属性，以及一个font-size样式。JS会根据不同的设备添加不同的data-dpr值，比如说2或者3，同时会给html加上对应的font-size的值，比如说75px。

目前Flexible会将视觉稿分成**100份**（主要为了以后能更好的兼容vh和vw），而每一份被称为一个单位a。同时1rem单位被认定为10a。针对我们这份视觉稿可以计算出：

如此一来，页面中的元素，都可以通过rem单位来设置。他们会根据html元素的font-size值做相应的计算，从而实现屏幕的适配效果。
```js
// 这里按照750px设计稿计算
1a   = 7.5px
1rem = 75px 
```
#### flexible的实质
flexible实际上就是能过JS来动态改写meta标签，代码类似这样：
```js
var metaEl = doc.createElement('meta');
var scale = isRetina ? 0.5:1;
metaEl.setAttribute('name', 'viewport');
metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
if (docEl.firstElementChild) {
    document.documentElement.firstElementChild.appendChild(metaEl);
} else {
    var wrap = doc.createElement('div');
    wrap.appendChild(metaEl);
    documen.write(wrap.innerHTML);
}
```
事实上他做了这几样事情：

+ 动态改写`<meta>`标签
+ 给`<html>`元素添加data-dpr属性，并且动态改写data-dpr的值
+ 给`<html>`元素添加font-size属性，并且动态改写font-size的值

#### flexible优缺点总结
优点：
1. 可以适配众多不同终端的设备。 
2. 使用简便，只需引入flexible.js即可。 
3. 由手淘团队维护，相对稳定。
缺点：
1. 不是纯css的移动适配方案，需要引入js文件。
2. 高宽比例改变引起变化，一般为iPhone6(16：9)，当比例改变时候不再是设计稿希望呈现的布局比例。 一般限制主体内容区域的最大宽度，使之在屏幕高宽比变小的时候不至于字号、图片过大影响用户体验。
3. 吃像素问题。浏览器的渲染，最小的单位就是像素，不可能一个像素出现多种颜色。而通过rem计算后的距离值经常出现小数，浏览器会对这部分小数进行四舍五入，从而按照整数渲染颜色。有可能会导致元素边缘被“吃掉”一部分。
4. 兼容性问题，安卓4.3及2以下版本系统不支持viewport缩放。
5. webview限制，webview作为原生开发的一个组件，移动客户端可以限制这个组件的大小。在webview大小被限制的时候，使用flexible使得比例难以计算。
6. 不支持响应式设计方案，响应式设计需要用到css3媒体查询，根据查询到的设备宽度使用不同的css样式。而引入flexible的页面会根据dpr进行缩放，css3媒体查询得到的是缩放前的宽度而不是缩放后的宽度。

