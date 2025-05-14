const express = require('express');
const { getCurrentUser, updateUser } = require('../controllers/user.controller');
const requireAuth = require('../middleware/auth.middleware'); 

const router = express.Router();

// Routes utilisateur
router.get('/getCurrent', requireAuth, getCurrentUser);
router.put('/modify', requireAuth, updateUser);

module.exports = router;