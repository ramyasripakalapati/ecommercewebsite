const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
    if(!cart) return res.json({ products: [] });
    res.json(cart);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    
    if(!cart) {
      cart = new Cart({ user: req.user.id, products: [{ product: productId, quantity }] });
    } else {
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      if(productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }
    
    await cart.save();
    res.json(cart);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if(!cart) return res.status(400).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if(productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
    }

    res.json(cart);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if(!cart) return res.status(400).json({ message: "Cart not found" });

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};
