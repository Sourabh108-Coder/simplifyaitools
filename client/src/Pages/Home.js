import React from 'react';
import Aitooldisplay from '../components/Aitooldisplay';

const Home = ({ likedTools, toggleLike, showConfetti, setShowConfetti }) => {
  return (
    <div>
      <Aitooldisplay likedTools={likedTools} toggleLike={toggleLike} showConfetti={showConfetti} setShowConfetti={setShowConfetti}/>
    </div>
  );
};

export default Home;

