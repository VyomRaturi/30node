const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/database";

function connectToMongoDB() {
    mongoose.connect(uri);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Connected to MongoDB");
    });
}

connectToMongoDB();

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
