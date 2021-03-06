---
id: react-hooks-basic
title: React Hooks笔记
# author: 莫珂
# author_title: 高级前端开发工程师
# author_url: https://github.com/edwardwang0302
# author_image_url: https://avatars1.githubusercontent.com/u/8874799
tags: [React, Hooks]
description: 'React Hooks笔记'
---

### useState/setState 的异同
共同点：都是异步的操作（这里其实不太严格，setState本身操作是同步的，但是可能是异步更新的）
setState 有 callback 而 useState 没有，但是可以通过 useEffect 去监听依赖！
<!--truncate-->
setState 后生成的是新的引用，而 useState 不同(这里可以看上一篇文章) 请看下面的例子

```js
// fastClick 3 times: 3 3 3
class Counter extends React.Component {
  state = { count: 0 }

  log = () => {
    this.setState(prev => ({ count: prev.count + 1 }))
    setTimeout(() => {
      console.log(this.state.count)
    }, 3000)
  }

  render() {
    return (
      <>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.log}>Click me</button>
      </>
    )
  }
}
```
连续点击 3 次，发现控制台输出的是 3 3 3, count 值最终是 3，当我们用 Function Component 方式实现时
```js
function Counter() {
  const [count, setCount] = useState(0)

  const log = () => {
    setCount(prev => prev + 1)
    setTimeout(() => {
      console.log(count)
    }, 3000)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={log}>Click me</button>
    </div>
  )
}
```
同样的操作，发现控制台输出的是 0 1 2, count 值最终是 3。

对 Function Component 而言：

1. useState 产生的数据是 Immutable 的，通过数组第二个参数 Set 一个新值后，原来的值会形成一个新的引用在下次渲染时。
2. 但由于对 state 的读取没有通过 this. 的方式，使得 每次 setTimeout 都读取了当时渲染闭包环境的数据，虽然最新的值跟着最新的渲染变了，但旧的渲染里，状态依然是旧值。
对 Class Component 而言：

1. 首先 state 是 Immutable 的，setState 后一定会生成一个全新的 state 引用。
2. 但 Class Component 通过 this.state 方式读取 state，这导致了每次代码执行都会拿到最新的 state 引用，所以快速点击三次的结果是 3 3 3。

### useRef
#### 获取 DOM 元素的节点
```js
function App(props) {
  const inputRef = useRef(null)
  const handleClick = e => inputRef.current.focus()
  return (
    <>
      <input type='text' ref={inputRef} />
      <button onClick={handleClick}>focus</button>
    </>
  )
}
```
获取子组件的 ref 用法与上面 👆 一致，但是只有 Class Compontent 才有 ref。 ref.current 即为实例, 这里不举例

#### 存储可变的数据
在 Class Component 中我们可以用 this.xxx 用来存储一些数据 例如定时器的实例，以免在 render 之后重置数据, 在 Function Compontent 中我们抑或可以使用 ref 记录可变的数据。
```js
function App(props) {
  const flag = useRef(false)
  const [count, setCount] = useState(0)

  const handleClick = e => {
    flag.current = true
  }
  console.log(flag.current)
  return (
    <>
      <button onClick={e => setCount(prev => prev + 1)}>count: {count}</button>
      <button onClick={handleClick}>changeFlag</button>
    </>
  )
}
```
点击 changeFlag 后 在下次的 render 中 flag.current 任然是 true。而不会被重置！

我们可以使用这个属性去获取上一轮的 props 或者 state, 这里可以封装成私有的 hooks
```js
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function App(props) {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)
  console.log(`prevCount: ${prevCount}, currentCount: ${count}`)
  return <button onClick={e => setCount(prev => prev + 1)}>count: {count}</button>
}
```
在进行一次 setCount 之后才给 prevCount 赋值。

### useImperativeHandle
useImperativeHandle(ref, createHandle, [inputs])

自定在使用 ref 时，公开给父组件的实例值，必须和 forwardRef 一起使用。
```js
function MyInput(props, ref) {
  const inputRef = useRef()

  // useImperativeHandle 必须和 forwardRef 一起使用
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
    ele: inputRef.current
  }))

  return <input type='text' ref={inputRef} />
}

const Input = React.forwardRef(MyInput)

function App(props) {
  const inputRef = useRef(null)

  function handleClick(e) {
    console.log(inputRef.current.ele)
    inputRef.current.focus()
  }
  return (
    <>
      <Input ref={inputRef} />
      <button onClick={handleClick}>onClick</button>
    </>
  )
}
```
### 性能优化
以下三个方法均是用于性能优化，但略有不同。

1. React.memo: 用于函数组件 相当于 React.PureComponent 用于浅层比较
2. useMemo: 更颗粒化管理数据渲染，React.memo 相对是整个 PureComponent， 而 React.useMemo是组件内某个值的 pure…
3. useCallback: 接收一个内联回调函数参数和一个依赖项数组（子组件依赖父组件的状态，即子组件会使用到父组件的值） ，useCallback 会返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新

#### React.memo
```js
React.memo(SubComponent, (prevProps, nextProps) => prevProps.name === nextProps.name)
```
demo 如下
```js
function Child(props) {
  console.log('render')
  return <h2>{props.count}</h2>
}

const ChildMemo = React.memo(Child)

function App(props) {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)

  return (
    <div>
      <ChildMemo count={count} addClick={setCount} />
      <button onClick={e => setCount(prev => prev + 1)}>addCount</button>
      <button onClick={e => setNum(prev => prev + 1)}>addNum</button>
    </div>
  )
}
```
没有套 React.memo 我们发现改变 num 之后，Child 组件会重新 render 这不是我们所期望的，因为 count 值并未改变。

套上 React.memo 发现点击 addNumb 就不会重新执行 render 了！

#### useMemo
useMemo：把创建函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算

demo 如下
```js
function Child(props) {
  function countWithTime() {
    return new Date().getTime() + ': ' + props.count
  }

  const newCount = countWithTime()
  return <h2>{newCount}</h2>
}

function App(props) {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)

  return (
    <div>
      <Child count={count} />
      <button onClick={e => setCount(prev => prev + 1)}>addCount</button>
      <button onClick={e => setNum(prev => prev + 1)}>addNum</button>
    </div>
  )
}
```
点击 addNum 发现 Child 组件会实时跑 countWithTime 这个函数，但是 App 组件的 count 值并未改变。这意味着发生了性能损耗。

进行改写
```js
function Child(props) {
  function countWithTime() {
    return new Date().getTime() + ': ' + props.count
  }

  const newCount = useMemo(countWithTime, [props.count])
  return <h2>{newCount}</h2>
}
```
点击 addNum 后发现并不会继续跑 countWithTime 这个函数了，说明 useMemo 起了作用.

#### useCallback
useCallback：接收一个内联回调函数参数和一个依赖项数组（子组件依赖父组件的状态，即子组件会使用到父组件的值） ，useCallback 会返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新
```js
import React, { useState, useCallback, useMemo } from 'react'

function Child(props) {
  console.log('render')
  return (
    <>
      <h2>{props.count}</h2>
      <button onClick={props.addNum}>Child click</button>
    </>
  )
}

function App(props) {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)

  function addNum() {
    setNum(prev => prev + 1)
  }

  return (
    <div>
      <ChildMemo count={count} addNum={addNum} />
      <button onClick={e => setCount(prev => prev + 1)}>addCount</button>
      <button onClick={addNum}>addNum</button>
    </div>
  )
}
```
我们点击 addNum 后，发生了 setNum 重新 render App 对应传入 
```js
<ChildMemo count={count} addNum={addNum} /> 
```
addNum 函数被认为更新了 也会重新执行 Child 的 render

我们可以用 useCallback 对函数进行缓存，改写后就可以达到性能优化的效果了！
```js
function App(props) {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)

  const addNum = useCallback(() => setNum(prev => prev + 1), [])
  return (
    <div>
      <ChildMemo count={count} addNum={addNum} />
      <button onClick={e => setCount(prev => prev + 1)}>addCount</button>
      <button onClick={addNum}>addNum</button>
    </div>
  )
}
```