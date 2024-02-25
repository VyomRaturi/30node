const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/node30", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
const Product = mongoose.model("Product", productSchema);
async function createProductNameIndex() {
  try {
    await Product.collection.createIndex({ name: 1 });
    console.log("Index created successfully");
  } catch (err) {
    console.log("Error:", err.message);
  }
}
createProductNameIndex();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
