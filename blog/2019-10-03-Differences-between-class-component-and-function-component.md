---
id: differences-between-class-component-and-function-component
title: 函数组件与类组件的区别
author: 莫珂
author_title: 高级前端开发工程师
author_url: https://github.com/edwardwang0302
author_image_url: https://avatars1.githubusercontent.com/u/8874799
tags: [React]
description: 'React函数组件与类组件区别 Hooks'
---

如果有人问与React类组件相比，React函数式组件究竟有何不同？你会如何回答？

在Hooks出现之前，典型的回答是类组件提供了更多的特性（比如state）。当有了Hooks后，答案就不再是这样了。<!--truncate-->
除了上述外，最大区别在于

> 函数式组件捕获了渲染所用的值。（Function components capture the rendered values.）

我们先来看一个例子
```js
// 这里假设出入props为 { user: Edwardwang }
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
// 它渲染了一个利用setTimeout来模拟网络请求，然后显示一个
// 确认警告的按钮。它会在三秒后显示Followed Edwardwang。非常简单。
```
如果是类组件我们怎么写？一个简单的重构可能就象这样：
```js
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```
那么这两个例子真的等价吗？实际上是存在细微差别的，试着想想一下，如果在3s弹窗出来之前，我们的props出入发生了如下改变，组件重新渲染，那么输出还是相同的吗？
```js
// { user: Edwardwang } 变为 { user: testUser } 组件发生重新渲染
```
我们仔细看一下 `showMessage` 方法
```js
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };
// 这里的this是指向React类的实例的，React本身会随着时间的推移而改变，
// 以便你可以在渲染方法以及生命周期方法中得到最新的实例，因此当发生改变
// 的时候这里会拿出最新的 { user: testUser } 弹出 Followed testUser
```
What? 怎么会这样？假设我们不适用函数组件，我们怎么解决呢？
```js
class ProfilePage extends React.Component {
  showMessage = (user) => {
    alert('Followed ' + user);
  };

  handleClick = () => {
    // 调用事件之前读取this.props 显示传递到setTimeout回调中
    // 但是如果属性过多，或者需要state的情况，这种方式繁琐且无法维护
    const {user} = this.props;
    setTimeout(() => this.showMessage(user), 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```
那还有什么办法呢？有没有想起来JavaScript中的闭包？
```js
class ProfilePage extends React.Component {
  render() {
    // 捕获props
    const props = this.props;

    // 这是在render方法中的，不是类的方法
    const showMessage = () => {
      // 这样就不会出现上述的问题了
      alert('Followed ' + props.user);
    };

    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };

    return <button onClick={handleClick}>Follow</button>;
  }
}
```
那么问题来了，既然我们没有用到class的特性，我们为什么要这么来写呢？我们来简化一下
```js
// props仍旧被捕获了 —— React将它们作为参数传递。
// 不同于this，props对象本身永远不会被React改变
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```
写到这里，相信大家已经明白我开篇时候说的那个结论了吧？
> 函数式组件捕获了渲染所用的值。（Function components capture the rendered values.）