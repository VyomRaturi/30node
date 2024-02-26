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

async function getProductStatistics() {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          highestQuantity: { $max: "$quantity" },
        },
      },
    ]);

    return stats[0];
  } catch (err) {
    console.log("Error:", err.message);
  }
}

getProductStatistics().then(console.log);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
