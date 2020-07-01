---
id: why-do-react-elements-have-typeof-property
title: 为什么React元素有一个$$typeof属性？
# author: 莫珂
# author_title: 高级前端开发工程师
# author_url: https://github.com/edwardwang0302
# author_image_url: https://avatars1.githubusercontent.com/u/8874799
tags: ['React']
description: '为什么React元素有一个$$typeof属性？'
---
在React中当你编写JSX时候，实际上你是在调用一个方法
```js
React.createElement(
  /* type */ 'marquee',
  /* props */ { bgcolor: '#ffa7c4' },
  /* children */ 'hi'
)
```
<!--truncate-->
这个方法返回一个对象（vnode），我们称之为React的元素，而我们编写的组件就是他们构成的一个树。
```
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'),
}
```
对于 `type` `props` `key` `ref` 这里就不解释了，今天那就说一下为什么需要 `$$typeof`(他是一个Symbol类型) 。

对于前端页面来说，为了防止 `XSS` 攻击，都会用转移字符吧潜在危险的字符如 `<` `>` 等替换掉。在 React 中更是指定了 `dangerouslySetInnerHTML={{ __html: message.text }}` 方法来避免问题。那么这样就完全不用担心了吗？

答案当然是否定的。假如前端期望从接口中获取一个字符串渲染在页面中
```js
render() {
  <div>{serverData.text}</div>
}
```
然而由于服务端在数据入库时存在漏洞，有用户恶意存入了这样的数据
```
const text = {
  key: null
  type: 'script',
  props: {src: 'http://...'},
}
```
如果这条数据被成功渲染，那么就是一个存在风险的第三方 script 标签入侵到了当前用户的页面，它能做什么完全取决于它想做什么，比如获取并发送用户的 cookie、localStorage等等。

#### 为了防止这种情况的发生，React 0.14 版本加入了 `$$typeof`

数据库是无法存储 Symbol 类型数据的，所以用户恶意存入的数据是无法带有合法的 `$$typeof` 字段的。所以从 React 0.14 开始，React 用 Symbol 标记每个 React 元素（element）防止恶意代码的插入。对于低版本不支持 Symbol 的浏览器，React仍然会加上 $$typeof 字段以保证一致性，但只是设置一个数字而已 —— `0xeac7`。

为什么是这个数字？官方的解释是 因为 `0xeac7` 看起来有点像 「React」，简单粗暴吧哈哈哈