const express = require("express");
const app = express();

function positiveIntegerHandler(req, res, next) {
    if (req.path === "/positive") {
        const number = req.query.number;
        if (isNaN(number)) {
            res.status(400).send(
                `Error : ${number} is not a valid positive integer`
            );
        } else if (number < 0) {
            res.status(400).send(`Error : ${number} is not a positive integer`);
        } else {
            res.status(200).send(`Success : ${number} is a positive integer`);
        }
    }
    next();
}

app.use(positiveIntegerHandler);
app.get("/positive", (req, res) => {});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
