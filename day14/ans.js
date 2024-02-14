const express = require("express");
const app = express();
const port = 3000;
const cache = {};
const cacheExpiration = 10 * 1000;
/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */

function cachingMiddleware(req, res, next) {
    const url = req.originalUrl;

    if (cache[url] && Date.now() - cache[url].timestamp < cacheExpiration) {
        res.send(cache[url].data);
    } else {
        const originalSend = res.send;
        res.send = function (data) {
            cache[url] = {
                data: data,
                timestamp: Date.now(),
            };
            originalSend.apply(res, arguments);
        };
        next();
    }
}
app.use(cachingMiddleware);
app.get("/", (req, res) => {
    res.send(`Current time: ${Date.now()}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
