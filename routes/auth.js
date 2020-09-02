const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

// @route     GET api/auth
// @desc      Get logged-in user
// @access    Private

router.get('/', auth, async (req, res)  => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route     POST api/auth
// @desc      Log in user and return token
// @access    Public

router.post('/', async (req, res)  => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials'});
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials'});
      }
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
  }
);

module.exports = router;
