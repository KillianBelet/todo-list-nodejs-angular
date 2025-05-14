const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

// Génère un token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

//Fonction pour enregistrer un utilisateur
module.exports.register = async (req, res) => {
  const { username, password } = req.body
  try{
    const hachedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ username, password: hachedPassword });
    const token = generateToken(user._id);
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000});
    res.status(201).json({ message: "Inscription réussie", userId: user._id});
  }catch (err){
    console.log(err)
    res.status(500).json({ error: "Erreur lors de l'inscription "});
  }
}
  //Fonction pour que l'utilisateur s'authentifie
module.exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
      const user = await UserModel.findOne({ username: username });
      if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({ error: 'Identifiant invalides' });
      }

      const token = generateToken(user._id);
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000});
      res.json({ message: "Connexion réussie" });
    }catch(err){
        res.status(500).json({ error: 'Erreur de la connexion.'});
    }
  }

module.exports.refreshToken = (req, res) => {
  res.status(501).json({ message: 'Refresh token non implémenté'});
  
}
