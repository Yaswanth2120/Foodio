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
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <input type="text" name="ingredients" placeholder="Ingredients (comma separated)" onChange={handleChange} />
      <textarea name="instructions" placeholder="Instructions (period separated)" onChange={handleChange}></textarea>
      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default RecipeForm;