import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/global.css'; // Ensure this file exists and contains your styles
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import UserRecipes from './components/UserRecipes';
import Profile from './components/Profile'; // Create this component
import Header from './components/Header'; // Ensure this component exists
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Register />} /> {/* Default route */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/create-recipe" element={<RecipeForm />} />
            <Route path="/user-recipes" element={<UserRecipes />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;