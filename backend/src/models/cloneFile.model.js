const mongoose=require("mongoose")

const CloneFileSchema=new mongoose.Schema({
    originalFileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true 
    },
    fileName: {
        type: String,
        required: true 
    },
    content: {
        type: String 
    },
    language: {
        type: String, 
        required: true 
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
},{timestamps: true})

const CloneFile=new mongoose.model('CloneFile',CloneFileSchema)

module.exports=CloneFile