const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    title: {
        type: String,
        reuired: true
    },
    author: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task=new mongoose.model('Task', taskSchema)
module.exports=Task