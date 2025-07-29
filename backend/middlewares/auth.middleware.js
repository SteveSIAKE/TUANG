const jwt = require('jsonwebtoken'); // pour décoder et vérifier le token

// Middleware d'authentification
const protect = (req, res, next) => {
  try {
    // 1. Récupère le header Authorization
    const authHeader = req.headers.authorization;

    // 2. Vérifie la présence et le format du header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Non autorisé, token manquant' });
    }

    // 3. Récupère le token après 'Bearer '
    const token = authHeader.split(' ')[1];

    // 4. Vérifie le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Stocke les infos dans req.user
    req.user = decoded;

    // 6. Passe à la suite
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

module.exports = protect;
