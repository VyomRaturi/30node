const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/node30";

function connectToMongoDB() {
    mongoose.connect(url);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Connected to MongoDB");
    });
}
connectToMongoDB();

const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
});

const User = mongoose.model("User", userSchema);

async function averageAgeOfUsers() {
    try {
        const result = await User.aggregate([
            { $group: { _id: null, averageAge: { $avg: "$age" } } },
        ]).exec();
        const averageAge = Math.floor(result[0].averageAge);
        return averageAge;
    } catch (err) {
        console.log("Error:", err.message);
    }
}

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/average-age", async (req, res) => {
    try {
        const averageAge = await averageAgeOfUsers();
        res.send("Average age of users is: " + averageAge);
    } catch (err) {
        console.log("Error:", err.message);
        res.status(500).send("Internal server error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
