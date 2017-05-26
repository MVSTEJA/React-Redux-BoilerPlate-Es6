/*eslint-disable no-var*/
/*eslint-disable no-console*/
var express = require('express');
const path = require('path');
const compression = require('compression');
const mcache = require('memory-cache');
const serveStatic = require('serve-static');

const port = 80;
const app = express();

const cache = (duration) => {
    return (req, res, next) => {
        var key = '__express__' + req.originalUrl || req.url;
        var cachedBody = mcache.get(key);
        if (cachedBody) {
            res.send(cachedBody);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body);
            };
            next();
        }
    };
};

const setCustomCacheControl = (res, path) => {
    const lookupPath = serveStatic.mime.lookup(path);
    if (lookupPath === 'text/html') {
        res.setHeader('Cache-Control', 'public, max-age=0');
    } else if (lookupPath === 'application/javascript') {
        res.setHeader('Cache-Control', 'private, max-age=31557600');
    }
};

app.use(compression());

app.use(serveStatic(path.join(__dirname, '../dist'), {
    maxAge: '1y',
    setHeaders: setCustomCacheControl
}));

app.use('/*', cache(3600), function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, "0.0.0.0", function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log("Server started");
    }
});
