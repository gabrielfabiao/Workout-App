// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/api/exercise-image/:id', async (req, res) => {
  const exerciseId = req.params.id;
  const resolution = '1080';

  try {
    const response = await axios.get(`https://exercisedb.p.rapidapi.com/image`, {
      responseType: 'arraybuffer',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
      params: {
        exerciseId,
        resolution,
      },
    });

    res.set('Content-Type', 'image/jpeg');
    res.send(response.data);
  } catch (err) {
    console.error('Error fetching image:', err.message);
    res.status(500).send('Failed to fetch image');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
