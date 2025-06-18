const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const toolsData = JSON.parse(fs.readFileSync('./toolsdata.json'));

let favorites = [];

app.get('/api/tools', (req, res) => {
  const category = req.query.category;
  if (category) {
    const filtered = toolsData.filter(tool => tool.category === category);
    return res.json(filtered);
  }
  res.json(toolsData);
});

app.get('/api/favorites', (req, res) => {
  const favoriteTools = favorites.map(id => toolsData.find(tool => tool.id === id));
  res.json(favoriteTools);
});

app.post('/api/favorites', (req, res) => {
  const { toolId } = req.body;
  if (!toolId || favorites.includes(toolId)) {
    return res.status(400).json({ message: 'Invalid or duplicate toolId' });
  }
  favorites.push(toolId);
  res.status(201).json({ message: 'Tool added to favorites' });
});

app.delete('/api/favorites/:id', (req, res) => {
  const id = parseInt(req.params.id);
  favorites = favorites.filter(favId => favId !== id);
  res.json({ message: 'Tool removed from favorites' });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
