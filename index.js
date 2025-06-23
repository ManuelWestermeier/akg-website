const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.akg-traunstein.de/');
    const $ = cheerio.load(response.data);

    // Beispiel: Ersetze "Grußwort" durch "Hallo"
    $('*').each(function () {
      if ($(this).text().includes("Grußwort")) {
        $(this).text($(this).text().replace("Grußwort", "Hallo"));
      }
    });

    res.send($.html());
  } catch (err) {
    res.status(500).send('Fehler beim Laden der Seite');
  }
});

app.listen(3000, () => {
  console.log('Proxy läuft auf http://localhost:3000');
});
