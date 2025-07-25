const mongoose=require("mongoose")

const projectSchema=new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    folders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
    }],
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }],
    rootFolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder'
    }
},{timestamps: true})

const Project=new mongoose.model('Project',projectSchema);
module.exports=Project