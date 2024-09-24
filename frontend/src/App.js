import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './styles/global.css'; // Ensure this file exists and contains your styles
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import Header from './components/Header'; // Ensure this component exists
import Navbar from './components/Navbar';
import Profile from './components/Profile';

// Configure Axios to include the token in headers
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/create-recipe" element={<RecipeForm />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
