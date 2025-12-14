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

const getPushRequests=async(req,res)=>{
    try {
        const {fileId}=req.params
        const userId=req.user._id
        const requests=await PushRequest.find({originalFileId: fileId, userId}).populate({path: 'userId'})
        res.status(201).json(requests)
    } catch (error) {
        console.log("Error in getPushRequests controller: ",error)
        res.status(401).json({message: "Internal serever error"})
    }
}

const deleteRequest=async(req,res)=>{
    try {
        const {requestId}=req.params
        const userId=String(req.user._id);
        const request=await PushRequest.findById(requestId)
        if(!request){
            res.status(401).json({message: "Inavlid RequestId!"})
            return ;
        }
        if(request.userId!=userId){
            res.status(401).json({mesage: "Unauthorized user!"});
            return ;
        }
        await PushRequest.findByIdAndDelete(requestId)
        res.status(201).json({message: "Request deleted successfully!"})
    } catch (error) {
        console.log("Error in deleteRequest controller: ",error)
        res.status(401).json({message: "Internal server error!"})
    }
}

const getAllPushRequests=async (req,res)=>{
    try {
        const {projectId}=req.params
        const userId=req.user._id
        const requests=await PushRequest.find({projectId, userId}).populate({path: 'userId'}).populate({path: 'originalFileId'})
        res.status(201).json(requests)
    } catch (error) {
        console.log("Error in getAllPushRequests controller: ",error)
        res.status(401).json({message: "Internal serever error"})
    }
}

const getAllAdminRequests=async (req,res)=>{
    try {
        const {projectId}=req.params
        const requests=await PushRequest.find({projectId}).populate({path: 'userId'}).populate({path: 'originalFileId'})
        res.status(201).json(requests)
    } catch (error) {
        console.log("Error in getAllPushRequests controller: ",error)
        res.status(401).json({message: "Internal serever error"})
    }
}

const getRequest=async (req,res)=>{
    try {
        const {requestId}=req.params
        const request=await PushRequest.findById(requestId).populate({path: "originalFileId"}).populate({path: "userId"})
        if(!request){
            res.status(401).json({message: "invalid requestId!"})
            return ;
        }
        res.status(201).json(request) 
    } catch (error) {
        console.log("Error in getRequest controller: ",error)
        res.status(401).json({message: "Internal server error!"})
    }
}

module.exports={
    createPushRequest,
    getPushRequests,
    deleteRequest,
    getAllPushRequests,
    getAllAdminRequests,
    getRequest
}