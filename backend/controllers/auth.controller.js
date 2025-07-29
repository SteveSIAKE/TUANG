const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register
async function register(req, res) {
  try {
    const { username, email, password, sexe, date_de_naissance, telephone, photo } = req.body;
    const user = await User.create({ username, email, password, sexe, date_de_naissance, telephone, photo });
    res.status(201).json({ message: 'Utilisateur créé', user });
    console.log("Données reçues :", req.body);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

//login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Mot de passe incorrect' });

    // Générer un token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    res.json({ message: 'Connexion réussie', token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login };