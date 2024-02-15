const express = require("express");
const app = express();
const port = 3000;

function loggingMiddleware(req, res, next) {
    console.log("Timestamp:", new Date().toISOString()),
        console.log("Method:", req.method),
        console.log("URL:", req.url),
        console.log("Headers:", req.headers),
        console.log("Body:", req.body);
    next();
}

app.use(loggingMiddleware);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
