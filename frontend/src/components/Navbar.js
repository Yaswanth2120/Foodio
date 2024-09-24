import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Foodio</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/recipes">Recipes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create-recipe">Create Recipe</Link>
          </li>
        </ul>
        {/* User Icon */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              <i className="bi bi-person-circle"></i> {/* Bootstrap icon for user */}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;