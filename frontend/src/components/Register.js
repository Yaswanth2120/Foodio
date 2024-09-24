import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/auth/register', formData);
      alert('Registration successful');
      window.location.href = '/login'; // Redirect to login page after successful registration
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <input type="text" name="username" className="form-control" placeholder="Username" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
      <p>Already have an account? <a href="/login">Log in here</a></p>
    </form>
  );
};

export default Register;