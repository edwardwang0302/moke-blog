---
id: useeffect
title: useEffect常见问题总结
# author: 莫珂
# author_title: 高级前端开发工程师
# author_url: https://github.com/edwardwang0302
# author_image_url: https://avatars1.githubusercontent.com/u/8874799
tags: [REACT, HOOKS]
description: 'useEffect常见问题总结'
---

随着Hooks的使用，在开发过程中我们的代码得到精简，这里总结一下使用`useEffect`常见的一些问题，让我们一起来看一下吧
<!--truncate-->
+ 如何用useEffect模拟componentDidMount生命周期？
+ 如何正确地在useEffect里请求数据？[]又是什么？
+ 我应该把函数当做effect的依赖吗？
+ 为什么有时候会出现无限重复请求的问题？
+ 为什么有时候在effect里拿到的是旧的state或prop？

### 简单总结
现总结一下工作中的经常遇到的几种问题
#### 如何用`useEffect`模拟`componentDidMount`生命周期？
可以使用useEffect(fn, [])，但它们并不完全相等。和componentDidMount不一样，useEffect会捕获 props和state(之前class组件和function组件对比中解释过了)。所以在回调函数里，你拿到的还是初始的props和state。如果你想得到“最新”的值，你可以使用ref。

#### 如何正确地在useEffect里请求数据？[]又是什么？
[]表示effect没有使用任何React数据流里的值，因此该effect仅被调用一次

#### 我应该把函数当做effect的依赖吗？
一般建议把不依赖props和state的函数提到你的组件外面，仅把那些被effect使用的函数放到effect里面。

#### 为什么有时候会出现无限重复请求的问题？
这个一般就是effect里做数据请求没有设置effect依赖参数的情况。这样effect会在每次渲染后执行一次，然后在effect中更新了状态引起渲染并再次触发effect。无限循环的发生也可能是因为依赖总是会改变。可以逐个移除的方式排查出哪个依赖导致了问题。但是直接移除使用的依赖（或者盲目地使用[]）是一种错误的解决方式。

#### 为什么有时候在effect里拿到的是旧的state或prop？
Effect拿到的总是定义它的那次渲染中的props和state。


