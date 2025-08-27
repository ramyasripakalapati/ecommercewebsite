import React, { useState, useEffect, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = useContext(AuthContext); // ensure token is available

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!user) {
      alert('Please login first');
      return;
    }

    try {
      await API.post(
        '/cart',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } } // send token for auth
      );
      alert('Product added to cart!');
    } catch (err) {
      console.error(err);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2>Products</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          justifyContent: 'flex-start'
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              flex: '1 1 calc(25% - 15px)',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              boxSizing: 'border-box',
              textAlign: 'center'
            }}
          >
            {p.image && (
              <img
                src={`http://localhost:5000${p.image}`}
                alt={p.name}
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            )}
            <h5 style={{ margin: '10px 0 5px' }}>{p.name}</h5>
            <p style={{ fontSize: '0.9rem', margin: '5px 0' }}>{p.description}</p>
            <p style={{ fontWeight: 'bold', margin: '5px 0' }}>${p.price}</p>

            {user && user.role !== 'admin' && (
              <button
                onClick={() => addToCart(p._id)}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
