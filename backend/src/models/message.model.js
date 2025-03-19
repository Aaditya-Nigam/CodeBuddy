const mongoose=require("mongoose")

const messageSchema=new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        reuired: true
    },
    text: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
})

const Message=new mongoose.model('Message', messageSchema)
module.exports=Message