'use strict';

var http = require('http'),
    url = require('url');

function startServer(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;

        route(pathname);

        console.log('request received...');
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }

    http.createServer(onRequest).listen(8000);
    console.log('server has started');
}

exports.start = startServer;