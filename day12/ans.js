const express = require("express");
const app = express();
const port = 3000;

const limit = require("express-rate-limit");

const limiter = limit({
    windowMs: 5000,
    max: 5,
    message: "Too many requests",
});

app.use(limiter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
