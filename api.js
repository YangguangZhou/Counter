const express = require('express');
const moment = require('moment');

const app = express();

const apiUrl = 'https://g3rvbpemgm.us.aircode.run/counter';

app.get('/api', async (req, res) => {
    moment.locale("zh-cn");

    const param = new URLSearchParams(req.url.split("?")[1]);
    const name = param.get("name");

    const { default: fetch } = await import('node-fetch');

    const result = await(await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    })).json();

    const counterView = result.times;

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 180">
    <g id="detail">
        <div id="app">这是第 <strong>${counterView}</strong> 次访问</div>
    </g>
    </svg>`);
});
