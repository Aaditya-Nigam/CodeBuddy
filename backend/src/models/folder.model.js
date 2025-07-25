const mongoose=require("mongoose")

const folderSchema=new mongoose.Schema({
    folderName: {
        type: String,
        required: true,
    },
    parentFolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        default: null,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    folders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
    }],
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }]
},{timestamps: true})

const Folder=new mongoose.model('Folder', folderSchema)
module.exports=Folder