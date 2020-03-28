const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public

// By passing 2nd argument auth makes this route protected!
router.get('/', auth, async (req, res) => {
  try {
    // we don't want to return the password, so we put it out of the data that we receive
    const user = await User.findById(req.user.id).select('-password');
    // We get all of the user except their password
    res.json(user);
  } catch(err) {
    console.err(err.message);
    res.status(500).send('Server Error');
    
  }
});

// @route    POST api/auth
// @desc     Authenticate user and get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Password is required'
    ).exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Make sure that password matches - 1st user entered passwword and 2nd encrypted password in database
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          // You can also add in here more data of the user, not just the token, but in our case we only need token
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;