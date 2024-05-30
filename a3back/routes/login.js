const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = 'secretkey';

// Login route
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Fetch the user from the database
    const user = await req.db('users').where({ username }).first();

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// New registration route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(username)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
  
    try {
      const existingUser = await req.db('users').where({ username }).first();
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      await req.db('users').insert({ username, hash });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
