const express = require('express');
const fetch = require('node-fetch'); // Version 2 preferred for compatibility
const app = express();

const PORT = process.env.PORT || 3000;

// 🔐 Replace with your actual tracker.gg API key
const API_KEY = 'c0a56f80-c74b-4b94-bccb-ec3a584b1344';

app.get('/', (req, res) => {
  res.send('R6 Proxy API is live');
});

app.get('/r6', async (req, res) => {
  const { platform = 'pc', username } = req.query;
  if (!username) {
    return res.status(400).json({ error: 'Missing username' });
  }

  const url = `https://public-api.tracker.gg/v2/r6/standard/profile/${platform}/${encodeURIComponent(username)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'TRN-Api-Key': API_KEY,
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ R6 Proxy API running on port ${PORT}`);
});
