const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
  try {
    // Hole die Originalseite als Text
    const response = await axios.get('https://www.akg-traunstein.de/', {
      responseType: 'text'
    });

    // Ersetze "Grußwort" durch "Hallo"
    const modifiedHtml = response.data.replace(/Grußwort/g, 'Hallo');

    res.send(modifiedHtml);
  } catch (err) {
    console.error('Fehler beim Laden:', err.message);
    res.status(500).send('Fehler beim Laden der Seite');
  }
});

app.listen(3000, () => {
  console.log('Proxy läuft auf http://localhost:3000');
});
