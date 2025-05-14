const TagueModel = require('../models/tague.model');

module.exports.getTagues = async (req, res) => {
    const tagues = await TagueModel.find({})
    return res.status(200).json(tagues)
}

module.exports.getTague = async (req, res) => {
    const tagues = await TagueModel.findById(req.params.id)
    return res.status(200).json(tagues)
}


module.exports.deleteTague = async (req, res) => {
    const tague = await TagueModel.findByIdAndDelete(req.params.id)
    if(!tague){
        return res.status(400).json({ message: "Le tague indiqué est introuvable"});
    }
    return res.status(200).json({
        message: "Suppression du post réalisé: " + tague
    })
}

module.exports.editTague = async (req, res) => {
    const tague = await TagueModel.findById(req.params.id)
    if(!tague){
        return res.status(400).json({ message: "Le tague indiqué est introuvable"});
    }
    const updateTague = await TagueModel.findByIdAndUpdate(
        tague,
        req.body,
        {new : true}
    )
    return res.status(200).json(updateTague);
}

module.exports.setTague = async (req, res) => {
    if(!req.body.name){
        return res.status(400).json({message : "Merci d'ajouter un name à votre tague."})
    }

    else{
        const tague = await TagueModel.create({
            name : req.body.name,
        })
        return res.status(200).json(tague); 
    }
};  
