const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

//route pour la connexion
router.post('/login', authController.login);

// //route pour la déconnexion
// router.post('/logout', authController.logout);

//route pour la création d'un compte
router.post('/register', authController.register);

module.exports = router;


