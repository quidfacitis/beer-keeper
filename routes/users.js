const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route     POST api/users
// @desc      Register a user
// @access    Public

router.post('/', async (req, res)  => {

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      // 400 == bad request
      return res.status(400).json({ msg: 'User already exists'});
    }
    // This automatically generates a user.id
    user = new User({
      name,
      email,
      password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 3600
    }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    // 500 == server error
    res.status(500).send('Server error');
  }
});

module.exports = router;
