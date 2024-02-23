const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/node30", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const categorySchema = new mongoose.Schema({
    name: String,
});
const Category = mongoose.model("Category", categorySchema);
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});
const Product = mongoose.model("Product", productSchema);
async function getProductsPopulatedWithCategory() {
    try {
        const products = await Product.find().populate("category");
        return products;
    } catch (err) {
        console.log("Error:", err.message);
    }
}

app.use(express.json());

app.get("/products", async (req, res) => {
    try {
        const products = await getProductsPopulatedWithCategory();
        res.json(products);
    } catch (err) {
        res.status(500).send("Internal server error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
