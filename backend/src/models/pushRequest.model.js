const mongoose=require('mongoose')

const pushRequestSchema=new mongoose.Schema({
    originalFileId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    cloneFileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CloneFile',
        required: true
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
        type: String
    },
    mergedOn: {
        type: Date
    },
    content: {
        type: String
    }
},{timestamps: true})

const PushRequest=new mongoose.model('PushRequest',pushRequestSchema)
module.exports=PushRequest