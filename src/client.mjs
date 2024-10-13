(() => {
    if (window.__tbMagic) {
        return;
    }
    
    window.__tbMagic = true;

    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = function(e){
        console.log("【tb-magic】连接服务器成功");
    }

    ws.onclose = function(e){
        console.log("【tb-magic】服务器关闭");
    }

    ws.onerror = function(){
        console.log("【tb-magic】连接出错");
    }

    // 接收服务器的消息
    ws.onmessage = function(e){
        const data = JSON.parse(e.data);

        if (data.type === 'css') {
            const { filePath, data: css } = data;

            const style = document.querySelector(`style[data-file-path="${filePath}"]`);

            if (style) {
                console.log('【tb-magic】收到变更的 css：', data);
                style.innerHTML = css;
            } else {
                const style = document.createElement('style');
                style.innerHTML = css;
                style.setAttribute('data-file-path', filePath);
                document.body.appendChild(style);
                console.log('【tb-magic】收到消息：', data);
            }
        }

    }
})();
