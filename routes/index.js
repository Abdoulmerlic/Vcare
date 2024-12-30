const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const signupRouter = require('./signup');

// ...existing code...

router.use('/signup', signupRouter);

// ...existing code...

router.get('/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// ...existing code...

module.exports = router;