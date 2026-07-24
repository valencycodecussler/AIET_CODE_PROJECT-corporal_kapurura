const express = require('express');
const router = express.Router();
const { User } = require('../models/db');  



router.get('/login', (req, res) => {

 res.render('login');

  res.json({ message: 'Login page (GET) – send a POST to /auth/login with email & password' });
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    
    req.session.loggedIn = true;
    req.session.userId = user.id;
    req.session.username = user.username;

    
    res.json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.json({ message: 'Logout successful' });
  });
});


router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email and password are required' });
    }

    
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }


    const newUser = await User.create({ username, email, password })

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username, email: newUser.email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;