const http = require('http');

module.exports = async (context, req) => {
    const param = new URLSearchParams(req.url.split("?")[1]);
    var name = param.get("name");
    const options = {
        hostname: 'visitor-badge.laobi.icu',
        port: 443,
        path: `/badge?page_id=${name}`,
        method: 'GET'
    };

    const request = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const visitorCountMatch = data.match(/<text[^>]*>(\d+)<\/text>/g);
            const visitorCount = visitorCountMatch ? visitorCountMatch[visitorCountMatch.length - 1].match(/(\d+)/)[0] : 'unknown';

            context.res = {
                body: visitorCount
            };
            context.done();
        });
    });

    request.on('error', (error) => {
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
        context.done();
    });

    request.end();
};