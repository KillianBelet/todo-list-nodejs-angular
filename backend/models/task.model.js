const mongoose = require("mongoose")


const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    tague: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tague',
        required: false
    }]
},
{
    timestamps: true
})

const Task = mongoose.model("Task", TaskSchema)
module.exports = Task