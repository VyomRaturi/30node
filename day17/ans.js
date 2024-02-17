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
    email: String,
});

const User = mongoose.model("User", userSchema);

async function addUserToDatabase(user) {
    try {
        const newUser = new User(user);
        await newUser
            .save()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });

        console.log("User added to database");
    } catch (error) {
        console.error(error);
    }
}

addUserToDatabase({ username: "john_doe", email: "john@example.com" });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
