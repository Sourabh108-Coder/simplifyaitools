import React, { useEffect, useState } from 'react';
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Aitooldisplay = ({ likedTools, toggleLike ,showConfetti,setShowConfetti}) => {
  const [aidata, setaidata] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { width, height } = useWindowSize();



  useEffect(() => {
    const fetchTools = async () => {
      try {
        const url = selectedCategory === 'All'
          ? 'http://localhost:5000/api/tools'
          : `http://localhost:5000/api/tools?category=${selectedCategory}`;

        const res = await fetch(url);
        const data = await res.json();
        setaidata(data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    };

    fetchTools();
  }, [selectedCategory]);

  const categories = ['All', ...new Set(aidata.map(tool => tool.category))];


  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label>Filter by Category: </label>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
        </select>
      </div>

      <>
       {showConfetti && <Confetti width={width} height={height} />}

      <div className="cards-container">
        {aidata.map(tool => (
          <div className="tool-card" key={tool.id}>
            <h2>{tool.name}</h2>
            <p><strong>Category:</strong> {tool.category}</p>
            <p>{tool.excerpt}</p>
            <p><strong>Pricing:</strong> {tool.pricing}</p>
            <a href={tool.url} target="_blank" rel="noopener noreferrer">Visit Site</a>
            <div onClick={() => toggleLike(tool)} style={{ cursor: 'pointer', marginTop: '10px' }}>
              {likedTools.find(t => t.id === tool.id) ? <FcLike size={24} /> : <FcLikePlaceholder size={24} />}
            </div>
          </div>
        ))}
      </div>
      </>
    </div>
    
  );
};

export default Aitooldisplay;

