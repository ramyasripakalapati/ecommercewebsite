import React, { useEffect, useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

const AdminUsers = () => {
  const { user } = useContext(AuthContext); // logged-in admin
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Fetch users
  const fetchUsers = async () => {
    try {
      if (!user || user.role !== 'admin') return;

      const res = await API.get('/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to fetch users');
      setMessageType('danger');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  useEffect(() => { fetchUsers(); }, [user]);

  // Toggle admin role
  const toggleAdmin = async (id) => {
    try {
      const res = await API.put(
        `/users/toggle-admin/${id}`,
        {}, // empty body
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      setMessage(res.data.message);
      setMessageType('success');
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to update role');
      setMessageType('danger');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Users</h2>

      {message && (
        <div className={`alert alert-${messageType}`} role="alert">
          {message}
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u._id !== user._id && (
                  <button
                    className={`btn btn-sm ${u.role === 'admin' ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => toggleAdmin(u._id)}
                  >
                    {u.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
