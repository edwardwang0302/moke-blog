---
id: everything-about-login-that-you-need-to-know
title: 前端登录方式总结
# author: 莫珂
# author_title: 高级前端开发工程师
# author_url: https://github.com/edwardwang0302
# author_image_url: https://avatars1.githubusercontent.com/u/8874799
tags: [Authentication]
description: 'everything-about-login-that-you-need-to-know 前端登录方式总结'
---
![](https://cdn.jsdelivr.net/gh/edwardwang0302/blog-pic/img/security.jpg)

登录是网站中很重要的一环，这里就简单整理一下比较常见的几种登录的方式
<!--truncate-->
* Cookie + Session 登录
* Token 登录
* SSO 单点登录
* OAuth 第三方登录

### Cookie + Session 登录
Http 是一种无状态的协议，因此**每次请求是独立的**，服务端无法判断本次请求和上一次请求是否来自同一个用户，进而也就无法判断用户的登录状态。

为了解决 HTTP 无状态的问题，这就需要 Cookie 和 Session了。有了 Cookie 之后，服务器端就能够获取到客户端传递过来的信息了，如果需要对信息进行验证，还需要通过 Session。

Cookie + Session 的登录方式是最经典的一种登录方式，现在仍然有大量的企业在使用。

#### 用户首次登录时：
![cookie-session](https://cdn.jsdelivr.net/gh/edwardwang0302/blog-pic/img/cookie-session.png)

1. 用户访问 a.com/pageA，并输入密码登录。
2. 服务器验证密码无误后，会创建 SessionId，并将它保存起来。
3. 服务器端响应这个 HTTP 请求，并通过 Set-Cookie 头信息，将 SessionId 写入 Cookie 中。
> 服务器端的 SessionId 可能存放在很多地方，例如：内存、文件、数据库等。
#### 第一次登录完成之后，后续的访问就可以直接使用 Cookie 进行身份验证了：
![](https://cdn.jsdelivr.net/gh/edwardwang0302/blog-pic/img/cookie-session1.jpg)
#### 存在问题
* 由于服务器端需要对接大量的客户端，也就需要存放大量的 SessionId，这样会导致服务器压力过大。
* 如果服务器端是一个集群，为了同步登录态，需要将 SessionId 同步到每一台机器上，无形中增加了服务器端维护成本。
* 由于 SessionId 存放在 Cookie 中，所以无法避免 CSRF 攻击。

### Token登录
> Token 是服务端生成的一串字符串，以作为客户端请求的一个令牌。当第一次登录后，服务器会生成一个 Token 并返回给客户端，客户端后续访问时，只需带上这个 Token 即可完成身份认证。

#### 用户首次登录时：
![](https://cdn.jsdelivr.net/gh/edwardwang0302/blog-pic/img/token.jpg)
1. 用户输入账号密码，并点击登录。
2. 服务器端验证账号密码无误，创建 Token。
3. 服务器端将 Token 返回给客户端，由 **客户端自由保存**。

#### 后续页面访问时：
![](https://cdn.jsdelivr.net/gh/edwardwang0302/blog-pic/img/token1.jpg)
1. 用户访问 a.com/pageB 时，带上第一次登录时获取的 Token。
2. 服务器端验证 Token ，有效则身份验证成功。

#### Token 机制的特点
* 服务器端不需要存放 Token，所以不会对服务器端造成压力，即使是服务器集群，也不需要增加维护成本。
* Token 可以存放在前端任何地方，可以不用保存在 Cookie 中，提升了页面的安全性。
* Token 下发之后，只要在生效时间之内，就一直有效，如果服务器端想收回此 Token 的权限，并不容易。

### SSO 单点登录
单点登录指的是在公司内部搭建一个公共的认证中心，公司下的所有产品的登录都可以在认证中心里完成，一个产品在认证中心登录后，再去访问另一个产品，可以不用再次登录，即可获取登录状态。

#### 用户首次访问，需要在认证中心登录
![](https://cdn.jsdelivr.net/gh/edwardwang0302/blog-pic/img/sso.jpg)

1. 用户访问网站  a.com 下的 pageA 页面。
2. 由于没有登录，则会重定向到认证中心，并带上回调地址 www.sso.com?return_uri=a.com/pageA，以便登录后直接进入对应页面。
3. 用户在认证中心输入账号密码，提交登录。认证中心验证账号密码有效，然后重定向  a.com?ticket=123 带上授权码 ticket，并将认证中心 sso.com 的登录态写入 Cookie。
4. 在 a.com 服务器中，拿着 ticket 向认证中心确认，授权码 ticket 真实有效。验证成功后，服务器将登录信息写入 Cookie（此时客户端有 2 个 Cookie 分别存有 a.com 和 sso.com 的登录态）。

#### 继续访问 a.com
![](https://cdn.jsdelivr.net/gh/edwardwang0302/blog-pic/img/sso1.jpg)

由于 a.com 存在已登录的 Cookie 信息，所以服务器端直接认证成功。

#### 访问 b.com 下的页面
![](https://cdn.jsdelivr.net/gh/edwardwang0302/blog-pic/img/sso2.jpg)

由于认证中心存在之前登录过的 Cookie，所以也不用再次输入账号密码，直接返回第 4 步，下发 ticket 给 b.com 即可。

#### SSO 单点登录退出
原理其实不难，可以回过头来看第 5 步，每一个产品在向认证中心验证 ticket 时，其实可以顺带将自己的退出登录 api 发送到认证中心。

当某个产品 c.com 退出登录时：
1. 清空 c.com 中的登录态 Cookie。
2. 请求认证中心 sso.com 中的退出 api。
3. 认证中心遍历下发过 ticket 的所有产品，并调用对应的退出 api，完成退出。

### OAuth 第三方登录
对于一些小型企业没有自己的认证中心，如何可以方便登录呢？我们可以利用一些大厂提供的三方登录

#### 实现流程（这里以微信开放平台的接入流程为例）
![](https://cdn.jsdelivr.net/gh/edwardwang0302/blog-pic/img/oauth.jpg)

1. 首先，a.com 的运营者需要在微信开放平台注册账号，并向微信申请使用微信登录功能。
2. 申请成功后，得到申请的 appid、appsecret。
3. 用户在 a.com 上选择使用微信登录。这时会跳转微信的 OAuth 授权登录，并带上 a.com 的回调地址。
4. 用户输入微信账号和密码，登录成功后，需要选择具体的授权范围，如：授权用户的头像、昵称等。授权之后，微信会根据拉起 a.com?code=123 ，这时带上了一个临时票据 code。
5. 获取 code 之后， a.com 会拿着 code 、appid、appsecret，向微信服务器申请 token，验证成功后，微信会下发一个 token。
6. 有了 token 之后， a.com 就可以凭借 token 拿到对应的微信用户头像，用户昵称等信息了。
7. a.com 提示用户登录成功，并将登录状态写入 Cooke，以作为后续访问的凭证。
