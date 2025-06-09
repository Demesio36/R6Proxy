const express = require('express');
const fetch = require('node-fetch'); // Use node-fetch v2 for compatibility
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY; // 🔐 Now using environment variable

app.get('/', (req, res) => {
  res.send('✅ R6 Proxy API is live');
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
