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

### 3. clone 项目

```bash
git clone https://github.com/hoboy0313/tb-magic.git
```

### 4. 安装依赖

请使用 `pnpm` 安装依赖，没有安装的请看[这里](https://pnpm.io/zh/installation)

```bash
pnpm install
```

### 5. 运行项目

```bash
pnpm dev
```

### 6. 编辑 source/index.scss

编辑后，样式会实时同步到浏览器

## 任务

- [ ] 淘宝首页
- [ ] 商品详情页
- [ ] （还有个什么忘记了

## 其他文档

开发指南：https://zaozaoliao.feishu.cn/docx/W4wWdlAwBof8tMxlrxQcWFgznzd

