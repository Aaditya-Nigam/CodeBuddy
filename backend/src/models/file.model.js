const mongoose=require("mongoose")

const fileSchema=new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    language: {
        type: String,
        default: "cpp"
    }, 
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
})

const File=new mongoose.model('File', fileSchema)
module.exports=File