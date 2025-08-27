import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProductCard = ({ product, addToCart }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="card h-100">
      {product.image && <img src={`http://localhost:5000${product.image}`} className="card-img-top" alt={product.name}/>}
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.name}</h6>
        <p className="card-text">{product.description}</p>
        <p className="card-text">${product.price}</p>

        {user && user.role === 'user' && (
          <button className="btn btn-sm btn-primary mt-auto" onClick={() => addToCart(product._id)}>Add to Cart</button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
