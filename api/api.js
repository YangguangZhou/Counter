const moment = require('moment');
const apiUrl = 'https://g3rvbpemgm.us.aircode.run/counter';

module.exports = async (req, res) => {
    moment.locale("zh-cn");
    const param = new URLSearchParams(req.url.split("?")[1]);
    var name = param.get("name");
    var dark = param.get("dark");
    var font = param.get("font");
    var color;
    if (!name) name = "counter";
    if (!dark) color = "#000";
    else color = "#fff"; 
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
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(`
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="slice">
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
