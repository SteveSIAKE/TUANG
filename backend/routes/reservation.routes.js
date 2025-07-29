const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');

router.get('/mes-reservations', protect, (req, res) => {
  res.send(`Bonjour ${req.user.name}, voici vos réservations.`);
});
