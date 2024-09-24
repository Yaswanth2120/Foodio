import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/user/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
      alert('Recipe deleted');
    } catch (error) {
      console.error(error);
      alert('Failed to delete recipe');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Your Recipes</h1>
      <ul className="list-group">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{recipe.title}</span>
            <div>
              <button className="btn btn-secondary btn-sm me-2" onClick={() => alert('Update functionality not implemented yet')}>Update</button>
              <button onClick={() => handleDelete(recipe.id)} className="btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRecipes;