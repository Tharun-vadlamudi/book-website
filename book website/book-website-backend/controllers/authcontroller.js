const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = await User.create({ username, email, password });
    
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({ 
      token, 
      user: { 
        id: user.user_id, 
        username, 
        email, 
        role: user.role 
      } 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    
    if (!user || !(await User.comparePassword(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ 
      token, 
      user: { 
        id: user.user_id, 
        username: user.username, 
        email, 
        role: user.role 
      } 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// ... (previous code)

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.update(req.user.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await User.delete(req.user.id);
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};