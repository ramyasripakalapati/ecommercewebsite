import React, { useState, useEffect } from 'react';
import API from '../api';

const Cart = () => {
  const [cart, setCart] = useState({ products: [] });

  const fetchCart = async () => {
    const res = await API.get('/cart');
    setCart(res.data);
  };

  const updateQuantity = async (productId, quantity) => {
    await API.put('/cart', { productId, quantity });
    fetchCart();
  };

  const removeItem = async (productId) => {
    await API.delete('/cart', { data: { productId } });
    fetchCart();
  };

  useEffect(() => { fetchCart(); }, []);

  const total = cart.products.reduce((sum, p) => sum + p.product.price * p.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map(p => (
            <tr key={p.product._id}>
              <td>{p.product.name}</td>
              <td>${p.product.price}</td>
              <td>
                <input type="number" min="1" value={p.quantity} onChange={e=>updateQuantity(p.product._id, Number(e.target.value))}/>
              </td>
              <td>${p.product.price * p.quantity}</td>
              <td><button className="btn btn-danger btn-sm" onClick={()=>removeItem(p.product._id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total: ${total}</h4>
    </div>
  );
};

export default Cart;
