const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

function authenticateAndAuthorize(roles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("No token provided");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, "secret-key", (err, decoded) => {
      if (err) {
        return res.status(403).send("Failed to authenticate token");
      }

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(401).send("Unauthorized");
      }

      req.user = decoded;
      next();
    });
  };
}

app.use(express.json());

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = {
    name: username,
    role: username === "admin" ? "admin" : "user",
  };
  const token = jwt.sign(user, "secret-key");

  res.json({ token });
});

app.get("/open", (req, res) => {
  res.send("Open to all");
});

app.get("/user", authenticateAndAuthorize(["user", "admin"]), (req, res) => {
  res.send("Hello user");
});

app.get("/admin", authenticateAndAuthorize(["admin"]), (req, res) => {
  res.send("Hello admin");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
