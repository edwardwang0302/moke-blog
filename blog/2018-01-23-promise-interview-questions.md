---
id: promise-interview-questions
title: promise经典面试题
# author: 莫珂
# author_title: 高级前端开发工程师
# author_url: https://github.com/edwardwang0302
# author_image_url: https://avatars1.githubusercontent.com/u/8874799
tags: [ES6, Promise]
description: 'promise经典面试题'
---

### promise基本规则：
1. 首先Promise构造函数会立即执行，而Promise.then()内部的代码在当次事件循环的结尾立即执行(微任务)。
<!--truncate-->
2. promise的状态一旦由等待pending变为成功fulfilled或者失败rejected。那么当前promise被标记为完成，后面则不会再次改变该状态。
3. resolve函数和reject函数都将当前Promise状态改为完成，并将异步结果，或者错误结果当做参数返回。
4. Promise.resolve(value)
>返回一个状态由给定 value 决定的 Promise 对象。如果该值是 thenable(即，带有 then 方法的对象)，返回的 Promise 对象的最终状态由 then 方法执行决定；否则的话(该 value 为空，基本类型或者不带 then 方法的对象),返回的 Promise 对象状态为 fulfilled，并且将该 value 传递给对应的 then 方法。通常而言，如果你不知道一个值是否是 Promise 对象，使用 Promise.resolve(value) 来返回一个 Promise 对象,这样就能将该 value 以 Promise 对象形式使用。
5. Promise.all(iterable)/Promise.race(iterable)
all是等待所有的promise都触发成功了，才会返回，而race有一个成功了就会返回结果。其中任何一个promise执行失败了，都会直接返回失败的结果。
6. promise对象的构造函数只会调用一次，then方法和catch方法都能多次调用，但一旦有了确定的结果，再次调用就会直接返回结果。

### 题目1
```js
const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
    reject('error');
})
promise.then(() => {
    console.log(3);
}).catch(e => console.log(e))
console.log(4);
// 1 2 4 3
```
规则一，promise构造函数的代码会立即执行，then或者reject里面的代码会放入异步微任务队列，在宏任务结束后会立即执行。规则二：promise的状态一旦变更为成功或者失败，则不会再次改变，所以执行结果为：1,2,4,3。而catch里面的函数不会再执行。

### 题目2
```js
const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
            console.log('once')
            resolve('success')
      }, 1000)
})
promise.then((res) => {
      console.log(res)
    })
promise.then((res) => {
    console.log(res)
})
```
promise的构造函数只会执行一次，而then方法可以多次调用，但是第二次是直接返回结果，不会有异步等待的时间，所以执行结果是： 过一秒打印:once,success,success。

### 题目3
浏览器下打印什么
```js
const p1 = () => (new Promise((resolve, reject) => {
 console.log(1);
 let p2 = new Promise((resolve, reject) => {
  console.log(2);
  const timeOut1 = setTimeout(() => {
   console.log(3);
   resolve(4);
  }, 0)
  resolve(5);
 });
 resolve(6);
 p2.then((arg) => {
  console.log(arg);
 });

}));
const timeOut2 = setTimeout(() => {
 console.log(8);
 const p3 = new Promise(reject => {
  reject(9);
 }).then(res => {
  console.log(res)
 })
}, 0)


p1().then((arg) => {
 console.log(arg);
});
console.log(10);
```
事件循环：javascript的执行规则里面有个事件循环Event Loot的规则，在事件循环中，异步事件会放到异步队列里面，但是异步队列里面又分为宏任务和微任务，浏览器端的宏任务一般有：script标签,setTimeout,setInterval,setImmediate,requestAnimationFrame。微任务有：MutationObserver,Promise.then catch finally。宏任务会阻塞浏览器的渲染进程，微任务会在宏任务结束后立即执行，在渲染之前。
回到题目，结果为：'1,2,10,5,6,8,9,3'。你答对了吗？如果对了，那你基本理解了事件队列，微任务，宏任务了。
第一步：执行宏任务，结合规则一，输出：1,2,10。这时候事件循环里面有异步任务timeOut1,timeOut2,p2.then,p1.then。
第二步：宏任务执行完后Event Loop会去任务队列取异步任务，微任务会优先执行，这时候会先后执行p2.then,p1.then，打印5,6。
第三步：微任务执行完了，开始宏任务，由于2个settimeout等待时间一样，所以会执行先进入异步队列的timeOut2,先后打印：8。执行宏任务的过程中，p3.then微任务进入了队列，宏任务执行完毕会执行微任务，输出：9。之后执行timeOut1,输出：3。
第四步：结合规则6，由于p2这个Promise对象的执行结果已经确定，所以4不会被打印。
注：在node.js上输出结果并不是这样的，因为node.js的事件循环跟浏览器端的有区别。
