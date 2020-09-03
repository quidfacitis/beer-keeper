const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('config');
const breweryDBKey = config.get('breweryDBKey');

// @route     GET api/breweryDB
// @desc      Get random selection of beers from BreweryDB
// @access    Public

router.get('/', async (req, res) => {
  try {
    const randomBeer = await axios.get(`https://sandbox-api.brewerydb.com/v2/beer/random/?key=${breweryDBKey}`);

    const brewery = await axios.get(`https://sandbox-api.brewerydb.com/v2/beer/${randomBeer.data.data.id}/breweries/?key=${breweryDBKey}`);

    const beers = await axios.get(`https://sandbox-api.brewerydb.com/v2/brewery/${brewery.data.data[0].id}/beers/?key=${breweryDBKey}`);

    res.json(beers.data.data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
