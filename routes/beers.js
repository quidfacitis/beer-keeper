const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('../middleware/auth');

const User = require('../models/User');
const Beer = require('../models/Beer');

// @route     GET api/beers
// @desc      Get a user's beers
// @access    Private

router.get('/', auth, async (req, res) => {
  try {
  // The -1 is used to find the most recent contacts first
    const beers = await Beer.find({ user: req.user.id }).sort({ date: -1});
    res.json(beers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/beers
// @desc      Add new beer
// @access    Private

router.post('/', auth, async (req, res)  => {

  const { name, type, abv, description, rating } = req.body;

  try {
    let beer = await Beer.findOne({ name, user: req.user.id });
    if (beer) {
      // 400 == bad request
      return res.status(400).json({ msg: 'Beer already exists'});
    }
    beer = new Beer({
      name,
      type,
      abv,
      description,
      rating,
      user: req.user.id
    });
    await beer.save();
    res.json(beer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     PUT api/beers/:id
// @desc      Update beer
// @access    Private

router.put('/:id', auth, async (req, res)  => {
  const { name, type, abv, description, rating } = req.body;
  // Build beer object
  const beerFields = {};
  if (name) beerFields.name = name;
  if (type) beerFields.type = type;
  if (abv) beerFields.abv = abv;
  if (description) beerFields.description = description;
  if (rating) beerFields.rating = rating;

  try {
    let beer = await Beer.findById(req.params.id);
    // 404 == not found
    if (!beer) return res.status(404).json({ msg: 'Beer not found' });
    // Make sure user owns beer
    if (beer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized'});
    }
    beer = await Beer.findByIdAndUpdate(req.params.id,
      { $set: beerFields },
      { new: true }); // new fields are accepted
    res.json(beer);
  } catch (err)  {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/beers/:id
// @desc      Delete beer
// @access    Private

router.delete('/:id', auth, async (req, res)  => {
  try {
    let beer = await Beer.findById(req.params.id);
    // 404 == not found
    if (!beer) return res.status(404).json({ msg: 'Beer not found' });
    // Make sure user owns contact
    if (beer.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized'});
    }
    await Beer.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Beer removed' });
  } catch (err)  {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
