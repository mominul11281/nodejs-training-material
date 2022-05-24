const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);
    const originalUrl = parseUrl.pathname;
    const query = parseUrl.query;

    console.log(query);
    console.log(req.url);

    res.setHeader('content-type', 'text/html');
    if (originalUrl === '/about' && req.method === 'GET') {
        res.write('<h1>This is about route for get method</h1>');
        return res.end();
    }else if (originalUrl === '/about' && req.method === 'POST') {
        res.write('<h1>This is about route for post method</h1>');
        return res.end();
    } else {
        res.write('<h1>Not found</h1>');
        return res.end();
    }
    
});

server.listen(3000, () => {
    console.log('Application is running on 3000 port...');
});