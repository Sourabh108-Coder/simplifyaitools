import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import SavedTools from './Pages/SavedTools';
import { toolsdata } from './data';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

function App() {
  const [likedTools, setLikedTools] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

   const [showConfetti, setShowConfetti] = useState(false);

   useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);


  const toggleLike = async (tool) => {
  const isLiked = likedTools.find(t => t.id === tool.id);
  if (isLiked) 
  {
    await fetch(`http://localhost:5000/api/favorites/${tool.id}`, { method: 'DELETE' });
    setLikedTools(likedTools.filter(t => t.id !== tool.id));
  } 
  else 
  {
    await fetch(`http://localhost:5000/api/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolId: tool.id })});
      setLikedTools([...likedTools, tool]);

       setShowConfetti(true); 
      setTimeout(() => setShowConfetti(false), 4000);
  }
};


  const removeLikedTool = (id) => {
    setLikedTools(likedTools.filter(tool => tool.id !== id));
  };

  return (
    <div className="App">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Home likedTools={likedTools} toggleLike={toggleLike} showConfetti={showConfetti} setShowConfetti={setShowConfetti}/>} />
        <Route path="/saved" element={<SavedTools likedTools={likedTools} removeLikedTool={removeLikedTool} />} />
      </Routes>
    </div>
  );
}

export default App;

