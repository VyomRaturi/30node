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

/**
 * Creates a new product in MongoDB
 * @param {Object} product - Product object with properties name, price, and quantity
 */
async function createProduct(product) {
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    console.log("Product created successfully");
  } catch (err) {
    console.log("Error:", err.message);
  }
}

/**
 * Retrieves all products from MongoDB
 * @returns {Array} - Array of product objects
 */
async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    console.log("Error:", err.message);
  }
}

/**
 * Updates a product in MongoDB
 * @param {string} productId - ID of the product to update
 * @param {Object} updatedProduct - Updated product object
 */
async function updateProduct(productId, updatedProduct) {
  try {
    await Product.findByIdAndUpdate(productId, updatedProduct);
    console.log("Product updated successfully");
  } catch (err) {
    console.log("Error:", err.message);
  }
}

/**
 * Deletes a product from MongoDB
 * @param {string} productId - ID of the product to delete
 */
async function deleteProduct(productId) {
  try {
    await Product.findByIdAndDelete(productId);
    console.log("Product deleted successfully");
  } catch (err) {
    console.log("Error:", err.message);
  }
}

app.use(express.json());

//create
app.post("/products", async (req, res) => {
  try {
    await createProduct(req.body);
    res.status(201).send("Product created successfully");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

//read
app.get("/products", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

//update
app.put("/products/:id", async (req, res) => {
  try {
    await updateProduct(req.params.id, req.body);
    res.send("Product updated successfully");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

//delete
app.delete("/products/:id", async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.send("Product deleted successfully");
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
