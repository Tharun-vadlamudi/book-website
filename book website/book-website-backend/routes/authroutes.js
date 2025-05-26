const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authController.getUserProfile);
router.put('/profile', authController.updateProfile);
router.delete('/account', authController.deleteAccount);

module.exports = router;