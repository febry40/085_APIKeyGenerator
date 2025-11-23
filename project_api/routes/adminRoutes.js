const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Dashboard Admin (HTML)
router.get('/dashboard', (req, res) => {
  res.sendFile('dashboard_admin.html', { root: './public/html' });
});

// route data
router.get('/data', adminController.getAllUsers);

module.exports = router;
