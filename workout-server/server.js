// Get full exercise detail by ID
app.get('/api/exercises/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exercise details' });
  }
});

// Get similar exercises by target muscle
app.get('/api/exercises/target/:muscle', async (req, res) => {
  const { muscle } = req.params;
  try {
    const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/target/${muscle}`, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch target muscle exercises' });
  }
});

// Get similar exercises by equipment
app.get('/api/exercises/equipment/:equipment', async (req, res) => {
  const { equipment } = req.params;
  try {
    const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}`, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch equipment exercises' });
  }
});

// Get YouTube videos for an exercise name
app.get('/api/videos/:query', async (req, res) => {
  const { query } = req.params;
  try {
    const response = await axios.get('https://youtube-search-and-download.p.rapidapi.com/search', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
      },
      params: {
        query,
        hl: 'en',
        gl: 'US',
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exercise videos' });
  }
});