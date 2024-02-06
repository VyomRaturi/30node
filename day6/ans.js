const express = require("express");
const app = express();
const port = 3000;

function greetHandler(req, res) {
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}!`);
    } else {
        res.send("Hello, Guest!");
    }
}

app.get("/greet", greetHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
