import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/auth/login', formData);
      login(response.data.token); // Call login function from context
      alert('Login successful');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </form>
  );
};

export default Login;