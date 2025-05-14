const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token){
    return res.status(401).json({ error: 'Accès refusé, token manquant!'});
  } 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    console.log(req.user)
    next();
  } catch (err) {
    console.log(err)
    res.status(403).json({ error: 'Token invalide'});
  }
};