const authMiddleware = (req, res, next) => {
  const userRole = req.headers['authorization']; // Exemple : récupérer un token ou une clé
  if (!userRole) {
    return res.status(401).json({ message: 'Non autorisé. Veuillez vous connecter.' });
  }
  next();
};

module.exports = authMiddleware;