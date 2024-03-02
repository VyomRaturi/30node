const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  throw new Error("Something went wrong!");
});

function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log error stack trace to the console

  // Send error details to the client
  res.status(500).json({
    status: "error",
    message: err.message,
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//challenge completed !!
