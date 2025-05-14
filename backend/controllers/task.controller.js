const TaskModel = require('../models/task.model');


//Task
//task

module.exports.getTasks = async (req, res) => {
    const task = await TaskModel.find({})
    return res.status(200).json(task)
}

module.exports.deleteTask = async (req, res) => {
    const task = await TaskModel.findByIdAndDelete(req.params.id)
    if(!task){
        return res.status(400).json({ message: "Le task indiqué est introuvable"});
    }
    return res.status(200).json({
        message: "Suppression du task réalisé: " + task
    })
}

module.exports.editTask = async (req, res) => {
    const task = await TaskModel.findById(req.params.id)
    if(!task){
        return res.status(400).json({ message: "Le task indiqué est introuvable"});
    }
    const updateTask = await TaskModel.findByIdAndUpdate(
        task,
        req.body,
        {new : true}
    )
    return res.status(200).json(updateTask);
}


module.exports.setTask = async (req, res) => {
    if(!req.body.name){
        return res.status(400).json({message : "Merci d'ajouter un name à votre task."})
    }
    else if(!req.body.description){
        return res.status(400).json({message : "Merci d'ajouter une description à votre task."})
    }
    else{
        const task = await TaskModel.create({
            name : req.body.name,
            description : req.body.description,
            completed : req.body.completed
        })
        return res.status(200).json(task); 
    }
};  
