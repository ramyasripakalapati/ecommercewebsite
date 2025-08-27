import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message,setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { name,email,password });
      setMessage('Registered successfully! You can login now.');
      setTimeout(()=>navigate('/login'), 2000);
    } catch(err){
      setMessage(err.response?.data?.message || 'Registration failed');
      setTimeout(()=>setMessage(''),3000);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required/>
        <input className="form-control mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
