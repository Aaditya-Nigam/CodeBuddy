const mongoose=require('mongoose')

const pullRequestSchema=new mongoose.Schema({
    originalFileId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    content: {
        type: String 
    },
    status: {
        type: String,
        default: 'Pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    title: {
        type: String,
        required: true 
    },
    description: {
        ttype: String
    },
    mergedOn: {
        type: Date
    }
},{timestamps: true})