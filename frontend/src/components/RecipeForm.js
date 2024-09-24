import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/recipes', {
        ...formData,
        ingredients: formData.ingredients.split(','),
        instructions: formData.instructions.split('.'),
      });
      alert('Recipe created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create recipe');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <input type="text" name="title" className="form-control" placeholder="Title" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <textarea name="description" className="form-control" placeholder="Description" onChange={handleChange}></textarea>
      </div>
      <div className="mb-3">
        <input type="text" name="ingredients" className="form-control" placeholder="Ingredients (comma separated)" onChange={handleChange} />
      </div>
      <div className="mb-3">
        <textarea name="instructions" className="form-control" placeholder="Instructions (period separated)" onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Create Recipe</button>
    </form>
  );
};

export default RecipeForm;