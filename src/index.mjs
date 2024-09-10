import path from 'path';
import {createServer} from 'http';
import {WebSocketServer} from "ws";
import express from 'express';
import chalk from 'chalk';

import * as utils from './utils.mjs';

/* =========================== 服务请求 =========================== */
const app = express();

const HTTP_PORT = 3001;

app.use('/client-listen-script', (req, res) => {
    res.sendFile(path.resolve(utils.__dirname, 'client.mjs'));
});

const httpSucessPromise = new Promise(r => app.listen(HTTP_PORT, r));

/* =========================== websocket 请求 =========================== */
const server = createServer(app);

const WS_PORT = 3000;
 
var ws = new WebSocketServer({server});
ws.on('connection', function connection(ws) {
    // 监听，当 css 文件发生变更的时候。
    // 发送 css 给客户端，并把指定文件路径发送给客户端。
    utils.scssChangeListener((css, filePath) => {
        ws.send(JSON.stringify({type: 'css', filePath, data: css}));
    });

    ws.on('error', console.error);
  
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });

    utils.compileScss().then((css) => {
        ws.send(JSON.stringify({type: 'css', filePath: utils.SCSS_SOURCE_PATH, data: css}));
    }).catch(e => {
        console.error(e);
    });
  
    ws.send(JSON.stringify({
        type: 'connect',
    }));
});

const wsSuccessPromise = new Promise(r => server.listen(WS_PORT, r));

Promise.all([
    httpSucessPromise,
    wsSuccessPromise,
]).then(() => {
    console.log(`📦 http 服务启动成功：${chalk.green(`http://localhost:${HTTP_PORT}/client-listen-script`)}`);
    console.log(`📦 WebSocket 服务启动成功：${chalk.green(`ws://localhost:${WS_PORT}`)}`);
    console.log(``);
    console.log(`⚓️ 开发指南 ${chalk.green(`https://zaozaoliao.feishu.cn/docx/W4wWdlAwBof8tMxlrxQcWFgznzd`)}`);
    console.log(`🚀 淘宝首页：${chalk.green(`https://www.taobao.com/`)}`);
})
