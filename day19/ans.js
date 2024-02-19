const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/node30";

function connectToMongoDB() {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
        console.log("Connected to MongoDB");
    });
}
connectToMongoDB();

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
});

const User = mongoose.model("User", userSchema);

function addUserWithValidation(user) {
    const newUser = new User(user);

    newUser
        .save()
        .then(() => console.log("User added successfully"))
        .catch((err) => console.log("Error:", err.message));
}

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/adduser", addUserWithValidation);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

addUserWithValidation({ username: "john_doe", email: "invalid-email" });
