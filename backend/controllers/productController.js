const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

exports.uploadMiddleware = upload.single('image');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    if(req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

    const { name, description, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if(req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

    const data = req.body;
    if(req.file) data.image = `/uploads/${req.file.filename}`;

    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(product);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    if(req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};
