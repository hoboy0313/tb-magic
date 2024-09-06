# tb-magic

淘宝脚本样式注入开发环境

## 使用

### 1. 安装油猴(篡改猴)


### 2. 添加油猴脚本

```javascript
// ==UserScript==
// @name         监听 scss 文件变更
// @namespace    http://tampermonkey.net/
// @version      2024-09-06
// @description  try to take over the world!
// @author       寒
// @match        https://www.taobao.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==

(function() {
    if (self != top) {
        return;
    }
    const script = document.createElement('script');
    script.src = 'http://localhost:3001/client-listen-script';
    script.dataset.path = 'client-listen-script';
    document.body.appendChild(script);
    console.log('【tb-magic】脚本注入完成');
})();

### 3. 下载开发项目