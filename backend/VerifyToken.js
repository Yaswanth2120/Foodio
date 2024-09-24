const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('Authorization').split(' ')[1]; // Assumes Bearer token format

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach decoded token data to request object
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
}

module.exports = verifyToken;