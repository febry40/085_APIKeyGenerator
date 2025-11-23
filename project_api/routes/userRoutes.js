const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Dashboard User (HTML)
router.get('/dashboard', (req, res) => {
  res.sendFile('dashboard_user.html', { root: './public/html' });
});

router.post('/create-api', userController.createApiKey);

module.exports = router;
