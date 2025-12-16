const User = require("../models/auth.model");
const Project = require("../models/project.model");
const File = require("../models/file.model")
const CloneFile = require("../models/cloneFile.model")
const PushRequest = require("../models/pushRequest.model");
const mergeFiles = require("../lib/mergeEngine");

const createPushRequest=async(req,res)=>{
    try {
        const {title,description,projectId,fileId,cloneId,content,base}=req.body
        const userId=req.user._id
        if(!userId || !title || !description || !content || !projectId || !fileId || !cloneId){
            res.status(401).json({message: "Fields are missing!"})
            return ;
        }
        const user=await User.findById(userId)
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
            userId ,
            content
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
        const requests=await PushRequest.find({projectId}).populate({path: 'userId'}).populate({path: 'originalFileId'}).sort({createdAt: -1})
        res.status(201).json(requests)
    } catch (error) {
        console.log("Error in getAllPushRequests controller: ",error)
        res.status(401).json({message: "Internal serever error"})
    }
}

const getRequest=async (req,res)=>{
    try {
        const {requestId}=req.params
        const request=await PushRequest.findById(requestId).populate({path: "originalFileId"}).populate({path: "userId"}).populate({path: "cloneFileId"})
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

const mergePullRequest=async (req,res)=>{
    try {
        const {requestId}=req.params
        const request=await PushRequest.findById(requestId)
        if(!request){
            res.status(401).json({message: "Invalid requestId!"})
            return ;
        }
        const pr=request.content.split("\n")
        const original=await File.findById(request.originalFileId)
        if(!original){
            res.status(401).json("File doesn't exists!")
            return ;
        }
        const clone=await CloneFile.findById(request.cloneFileId)
        if(!clone){
            res.status(401).json({message: "Fork file doesn't exists!"})
            return;
        }
        const base=clone.base.split("\n")
        const curr=original.content.split("\n")
        
        const mergeResult=mergeFiles({base,pr,curr})
        if(mergeResult.hasConflict){
            res.status(201).json(mergeResult)
            return ;
        }
        await File.findByIdAndUpdate(request.originalFileId,{content: mergeResult.mergedText})
        const currentDate = new Date(); 
        await PushRequest.findByIdAndUpdate(requestId,{status: "Merged", mergedOn: currentDate.toISOString().slice(0, 10)})
        await CloneFile.findByIdAndUpdate(request.cloneFileId,{base: mergeResult.mergedText})
        res.status(201).json(mergeResult)
    } catch (error) {
        console.log("Error in mergePullRequest: ",error)
        res.status(401).json({message: "Internal server error!"})
    }
}

const mergeConflict=async (req,res)=>{
    try {
        const {requestId}=req.params
        const {data}=req.body
        if(!data){
            res.status(401).json({message: "Fields are missing!"})
            return ;
        }
        const request=await PushRequest.findById(requestId)
        if(!request){
            res.status(401).json({message: "Invalid requestId!"})
            return ;
        }
        await File.findByIdAndUpdate(request.originalFileId, {content: data})
        await CloneFile.findByIdAndUpdate(request.cloneFileId, {base: data})
        const currentDate=new Date()
        await PushRequest.findByIdAndUpdate(requestId, {status: 'Merged', mergedOn: currentDate.toISOString().slice(0,10)})
        res.status(201).json({message: "Merged Successfully!"})
    } catch (error) {
        console.log("Error in mergeConflict controller: ",error)
        res.status(401).json({message: "Internal server error!"})
    }
}

module.exports={
    createPushRequest,
    getPushRequests,
    deleteRequest,
    getAllPushRequests,
    getAllAdminRequests,
    getRequest,
    mergePullRequest,
    mergeConflict
}