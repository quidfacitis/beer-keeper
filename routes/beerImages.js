const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('../middleware/auth');
const Scraper = require('images-scraper');

// @route     GET api/beerImages
// @desc      Get 10 image URLs of a specific beer
// @access    Private

router.post('/', auth, async (req, res) => {
  const { beerName } = req.body;
  try {
    const google = new Scraper();
    (async () => {
      const results = await google.scrape(`${beerName} beer`, 10);
      const beerImageURLs = [];
      for (let i=0; i < 10; i++) {
        beerImageURLs.push(results[i].url);
      }
      console.log('beerImageURLs', beerImageURLs);
      res.json(beerImageURLs);
    })();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
