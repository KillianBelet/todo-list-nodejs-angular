const UserModel = require('../models/user.model');

module.exports.getCurrentUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable'});
        }
        res.json(user);
    } catch  (err){
        res.status(500).json({ error: 'Erreur serveur'});
    }
};

module.exports.updateUser = async (req, res) => {
    const { email } = req.body;
    try{
        const user = await UserModel.findByIdAndUpdate(req.user.id, { email }, { new: true}).select('-password');
        res.json({ message: 'Utilisateur mis à jour', user});

    } catch (err){
        res.status(500).json({ error: 'Erreur lors de la mise à jour'});
    }
};
