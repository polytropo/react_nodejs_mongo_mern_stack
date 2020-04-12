const jwt = require('jsonwebtoken');
const config = require('config');

// IF you want to implement facebook login and twitter login, then using PASSPORT instead of this makes sense

module.exports = function(req, res, next) {
  // Get token from the header
  const token = req.header('x-auth-token');

  // Check if not token
  if(!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // it gets jwt and verifies it, then gets decoded data out, in our case the user id - because thats what we passed in earlier in users.js in payload
    req.user = decoded.user;
    next();
  } catch(err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};