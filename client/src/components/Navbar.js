import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <div className="nav-bar">
      <h1 className="head">🤖 Simplify.ai Tools🔧🧠</h1>
      <div className="nav-buttons">
        <Link to="/" className="nav-btn home-btn">Home</Link>
        <Link to="/saved" className="nav-btn saved-btn">Saved Tools ❤️</Link>
      </div>
       <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
    </div>
  );
};

export default Navbar;
