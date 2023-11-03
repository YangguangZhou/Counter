const moment = require('moment');
const apiUrl = 'https://g3rvbpemgm.us.aircode.run/counter';

const { createCanvas } = require('canvas');

function getTextDimensions(text, font) {
    const canvas = createCanvas(200, 200);
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    return {
        width: metrics.width,
        // The height calculation is a workaround because the height is not directly given by the measureText method
        height: Math.ceil(parseFloat(getComputedStyle(context.canvas).getPropertyValue('font-size')))
    };
}

module.exports = async (req, res) => {
    moment.locale("zh-cn");
    const param = new URLSearchParams(req.url.split("?")[1]);
    var name = param.get("name");
    var dark = param.get("dark");
    var font = param.get("font");
    if (!name) name = "counter";
    if (!dark) color = "#000";
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
    var color = (dark == 1) ? "#fff" : "#000";

    // 计算文本的宽度和高度
    // const textWidth = counterView.toString().length * font; // 根据字数和字体大小计算宽度
    // const textHeight = font; // 字体大小即为文本的高度
    const fonts = 'regular ' + font + 'px Microsoft YaHei';
    const text = getTextDimensions(counterView.toString(), fonts);
    const textWidth = text.width;
    const textHeight = text.height;
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
