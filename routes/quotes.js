const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Quote = require('../models/Quote');

// @route     GET api/quotes
// @desc      Get all user's quotes
// @access    Private

router.get('/', auth, async (req, res) => {
  try {
    // The -1 is used to find the most recent contacts first
    const quotes = await Quote.find({ user: req.user.id }).sort({ date: -1});
    res.json(quotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/quotes
// @desc      Add new contact
// @access    Private

router.post('/', [auth, [
  check('text', 'Quote is required').not().isEmpty()
]], async (req, res)  => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { text, author } = req.body;
  try {
    const newQuote = new Quote({
      text,
      author,
      user: req.user.id
    });
    const quote = await newQuote.save();
    res.json(quote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     PUT api/quotes/:id
// @desc      Update quote
// @access    Private

router.put('/:id', auth, async (req, res)  => {
  const { text, author } = req.body;
  // Build quote object
  const quoteFields = {};
  if (text) quoteFields.text = text;
  if (author) quoteFields.author = author;

  try {
    let quote = await Quote.findById(req.params.id);
    // 404 == not found
    if (!quote) return res.status(404).json({ msg: 'Quote not found' });
    // Make sure user owns quote
    if (quote.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized'});
    }
    quote = await Quote.findByIdAndUpdate(req.params.id,
      { $set: quoteFields },
      { new: true }); // new fields are accepted
    res.json(quote);
  } catch (err)  {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     DELETE api/quotes/:id
// @desc      Delete quote
// @access    Private

router.delete('/:id', auth, async (req, res)  => {
  try {
    let quote = await Quote.findById(req.params.id);
    // 404 == not found
    if (!quote) return res.status(404).json({ msg: 'Quote not found' });
    // Make sure user owns contact
    if (quote.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized'});
    }
    await Quote.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Quote removed' });
  } catch (err)  {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
