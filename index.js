const express = require('express');
const axios = require('axios');

const app = express();

// Base URL of the target site
const BASE_URL = 'https://www.akg-traunstein.de';

app.use(async (req, res) => {
  try {
    // Construct the full URL
    const targetUrl = `${BASE_URL}${req.originalUrl}`;

    // Fetch the response as raw data (stream or text depending on content)
    const response = await axios.get(targetUrl, {
      responseType: 'arraybuffer', // handle binary & text
      headers: {
        'User-Agent': req.get('User-Agent') || 'Mozilla/5.0'
      }
    });

    // Detect content type
    const contentType = response.headers['content-type'] || '';

    // Forward headers
    res.set('Content-Type', contentType);

    if (contentType.includes('text/html')) {
      // Replace "Grußwort" with "Hallo" only in HTML pages
      const html = response.data.toString('utf8').replace(/Grußwort/g, 'Hallo');
      res.send(html);
    } else {
      // For other types (images, CSS, JS...) just pipe the raw data
      res.send(response.data);
    }

  } catch (err) {
    console.error(`Proxy error for ${req.originalUrl}:`, err.message);
    res.status(500).send('Proxy error');
  }
});

app.listen(3000, () => {
  console.log('Proxy läuft auf http://localhost:3000');
});
