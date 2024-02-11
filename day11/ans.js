const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = 3000;

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Authentication middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401); // If no token, return 401 Unauthorized status

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, return 403 Forbidden status
        req.user = user;
        next();
    });
}

app.use(express.json());

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username) console.log("username valid");

    if (username && password) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.sendStatus(401);
    }
});

app.get("/", authenticationMiddleware, (req, res) => {
    const name = req.user.username;
    res.send(`Hello, ${name}!`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
