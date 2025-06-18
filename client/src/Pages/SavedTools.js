import React, { useEffect, useState } from 'react';

const SavedTools = ({ removeLikedTool }) => {
  const [likedTools, setLikedTools] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/favorites');
        const data = await res.json();
        setLikedTools(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  const handleRemove = async (id) => {
    await fetch(`http://localhost:5000/api/favorites/${id}`, {
      method: 'DELETE'
    });
    setLikedTools(prev => prev.filter(tool => tool.id !== id));
    if (removeLikedTool) removeLikedTool(id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>❤️ Saved Tools</h2>
      {likedTools.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No tools saved yet.</p>
      ) : (
        <div className="cards-container">
          {likedTools.map(tool => (
            <div className="tool-card" key={tool.id}>
              <h2>{tool.name}</h2>
              <p>{tool.excerpt}</p>
              <button onClick={() => handleRemove(tool.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedTools;

