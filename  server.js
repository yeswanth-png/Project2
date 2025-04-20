const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Request Sharing

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/inventoryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Define a Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  supplier: String,
  sales: Number,
  price: Number,
  quantity: Number
});

// Create a Product Model
const Product = mongoose.model('Product', productSchema);

// Routes
// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new product
app.post('/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    supplier: req.body.supplier,
    sales: req.body.sales,
    price: req.body.price,
    quantity: req.body.quantity
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
