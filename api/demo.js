const http = require('http');
const url = require('url');

module.exports = async function(context, req) {
    const queryObject = url.parse(req.url,true).query;
    const name = queryObject.name;

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