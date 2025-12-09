const User = require("../models/auth.model");
const Project = require("../models/project.model");
const File = require("../models/file.model")
const CloneFile = require("../models/cloneFile.model")
const PushRequest = require("../models/pushRequest.model")

const createPushRequest=async(req,res)=>{
    try {
        const {title,description,userId,projectId,fileId,cloneId}=req.body
        if(!userId | !title | !description){
            res.status(401).json({message: "Fields are missing!"})
            return ;
        }
        const user=await User.findById(userId)
        if(!user){
            res.status(401).json({message: "User not defined!"})
            return ;
        }
        const project=await Project.findById(projectId)
        if(!project){
            res.status(401).json({message: "Project not defined!"})
            return ;
        }
        const file=await File.findById(fileId)
        if(!file){
            res.status(401).json({message: "File is missing!"})
            return 
        }
        const cloneFile=await CloneFile.findById(cloneId)
        if(!cloneFile){
            res.status(401).json({message: "Clone file is missing!"})
            return ;
        }
        const push=await PushRequest({
            cloneFileId: cloneId,
            originalFileId: fileId,
            projectId: projectId,
            title,
            description,
            userId 
        })
        await push.save()
        res.status(201).json(push)
    } catch (error) {
        console.log("Error in createPushRequest controoler: ",error)
        res.status(401).json({message: "Internal server error!"})
        
    }
}

module.exports={
    createPushRequest
}