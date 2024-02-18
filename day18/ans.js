const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/node30";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
});

const User = mongoose.model("User", userSchema);

function connectToMongoDB() {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Connected to MongoDB");
    });
}
connectToMongoDB();

async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
}

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/users", getAllUsers);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
