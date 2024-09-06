import {createServer} from 'http';
import {WebSocketServer} from "ws";
import express from 'express';

import * as utils from './utils';
import path from 'path';

/* =========================== 服务请求 =========================== */
const app = express();

const HTTP_PORT = 3001;

app.use('/client-listen-script', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client.mjs'));
});

app.listen(HTTP_PORT, () => {
    console.log(`📦 http 服务启动成功：http://localhost:${HTTP_PORT}/client-listen-script`);
})

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
    });
  
    ws.send(JSON.stringify({
        type: 'connect',
    }));
});

server.listen(WS_PORT, () => {
    console.log(`📦 WebSocket 服务启动成功：ws://localhost:${WS_PORT}`);
});
