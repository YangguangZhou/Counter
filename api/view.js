const moment = require('moment');
const apiUrl = 'https://counter-sever.jerryz.com.cn/view';

module.exports = async (req, res) => {
    moment.locale("zh-cn");
    const param = new URLSearchParams(req.url.split("?")[1]);
    var name = param.get("name");
    var dark = param.get("dark");
    var font = param.get("font");
    var color = param.get("color");
    if (!name) name = "counter";
    if ((!dark) && (!color)) color = "#000";
    else if ((!color) && dark) color = "#fff";
    if(color[0] != "#"&&color[0] != "r") color = "#" + color;
    if (!font) font = 16;
    const { default: fetch } = await import('node-fetch');
    const result = await (await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    })).json();
    const counterView = result.times;
    // 计算文本的宽度和高度
    const textWidth = Math.ceil(counterView.toString().length * font / 2.0 + counterView.toString().length * 1.5); // 根据字数和字体大小计算宽度
    const textHeight = font; // 字体大小即为文本的高度
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(`
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${textWidth}" height="${textHeight}">
            <style>
                .text {
                    font-family: Microsoft YaHei;
                    font-size: ${font}px;
                    fill: ${color};
                }
            </style>
            <g>
                <text class="text" x="0" y="${font}">${counterView}</text>
            </g>
        </svg>
    `);
};
