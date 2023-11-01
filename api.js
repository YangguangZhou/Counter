const apiUrl = 'https://g3rvbpemgm.us.aircode.run/counter';

async function getCount(name){
    const result = await(await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    })).json();
    return result.times;
};

module.exports = async (req, res) => {
    const moment = require("moment"); // 引入 moment 库
    moment.locale("zh-cn");

    const param = new URLSearchParams(req.url.split("/api")[1]);
    const name = param.get("name");
    console.log(name);

    res.setHeader("Content-Type", "image/svg+xml");

    const counterView = await getCount(name); // 调用 getCount 并传递 name 参数

    res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 180">
    <g id="detail">
        <div id="app">这是第 <strong>${counterView}</strong> 次访问</div>
    </g>
    </svg>`);
};
