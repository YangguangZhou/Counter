const apiUrl = 'https://g3rvbpemgm.us.aircode.run/counter';
var counterView;

(async () => {
  const result = await (await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token: location.href}),
  })).json();
  counterView=result.times;
})();

module.exports = async (req, res) => {
    moment.locale("zh-cn");
    param = new URLSearchParams(req.url.split("/api")[1]);
    res.setHeader("Content-Type", "image/svg+xml");
    const {
        count = counterView,
    } = req.query;

    res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 180">
    <g id="detail">
        <div id="app">这是第 <strong>${count}</strong> 次访问</div>
    </g>
    </svg>`);
};
