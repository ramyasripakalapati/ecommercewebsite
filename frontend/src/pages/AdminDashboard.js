import React, { useState, useEffect } from 'react';
import API from '../api';

const AdminDashboard = () => {
  const [form, setForm] = useState({ name:'', description:'', price:'', image:null });
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleFileChange = (e) => setForm({...form, image: e.target.files[0]});

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addOrUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('price', form.price);
      if(form.image) formData.append('image', form.image);

      if(editingId){
        await API.put(`/products/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEditingId(null);
        setMessage('Product updated successfully');
      } else {
        await API.post('/products', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMessage('Product added successfully');
      }

      setMessageType('success');
      setForm({ name:'', description:'', price:'', image:null });
      fetchProducts();
      setTimeout(()=>setMessage(''),3000);
    } catch (err) {
      console.error(err);
      setMessage('Failed to add/update product');
      setMessageType('danger');
      setTimeout(()=>setMessage(''),3000);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      {message && <div className={`alert alert-${messageType}`}>{message}</div>}

      <form onSubmit={addOrUpdateProduct} encType="multipart/form-data" className="mb-4">
        <input className="form-control mb-2" placeholder="Product Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
        <input className="form-control mb-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required/>
        <input className="form-control mb-2" placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required/>
        <input type="file" className="form-control mb-2" onChange={handleFileChange}/>
        <button className="btn btn-success">{editingId ? 'Update Product' : 'Add Product'}</button>
      </form>

    </div>
  );
};

export default AdminDashboard;
