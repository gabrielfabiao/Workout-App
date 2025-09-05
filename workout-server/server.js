// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// Serve static fallback images (optional)
app.use('/fallback', express.static(path.join(__dirname, 'fallback')));

// API route to fetch exercise image
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
    if (err.response) {
      const status = err.response.status;

      // 🔒 Quota exceeded
      if (status === 429) {
        console.warn('⚠️ RapidAPI quota exceeded');

        // Optional: serve fallback image
        return res.sendFile(path.join(__dirname, 'fallback', 'default.jpg'));

        // OR: respond with JSON error message
        // return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
      }

      // 🔍 Other API error
      console.error(`API Error [${status}]:`, err.response.data);
      return res.status(status).json({ error: `API error (${status}): ${err.response.statusText}` });
    }

    // ❌ Network or unknown error
    console.error('Unknown error:', err.message);
    res.status(500).json({ error: 'Server error: unable to fetch image' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
