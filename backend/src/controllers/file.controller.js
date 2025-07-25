const Project = require("../models/project.model")
const File=require("../models/file.model")
const Folder = require("../models/folder.model")

const createFile=async (req,res)=>{
    try {
        const {fileName,content,language,projectId,parentFolder}=req.body
        if(!fileName || !language || !projectId || !parentFolder){
            res.status(401).json({message: "Fields are missing!!"})
            return ;
        }
        const userId=req.user._id
        const project=await Project.findById(projectId);
        if(!project){
            res.status(401).json({message: "No such project exists!!"})
            return ;
        }
        if(!project.collaborators.includes(userId)){
            res.status(401).json({message: "No such project exists!!"})
            return ;
        }
        const newFile=await File({
            fileName,
            content,
            language,
            projectId,
            parentFolder
        })
        await newFile.save();
        await Folder.updateOne({_id: parentFolder}, {$push: {files: newFile._id}})
        res.status(201).json(newFile)
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"})
        console.log("error in create file controller: ",error.message)
    }
}

const updateFile=async (req,res)=>{
    try {
        const {id}=req.params
        const {fileName,content,language}=req.body
        if(!fileName || !language){
            res.status(401).json({message: "Fields are missing!!"})
            return ;
        }
        const file=await File.findById(id);
        if(!file){
            res.status(401).json({message: "No such file exists!!"});
            return ;
        }
        const updatedFile=await File.findByIdAndUpdate(id, {fileName,content,language}, {new:true})
        if(!updateFile){
            res.status(401).json({message: "Internal server error!!"})
            return ;
        }
        res.status(201).json(updatedFile)
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"})
        console.log("error in update file controller: ",error.message)
    }
}

const getFile=async (req,res)=>{
    try {
        const {id}=req.params
        const file=await File.findById(id);
        if(!file){
            res.status(401).json({message: "No such file exists!!"})
            return ;
        }
        res.status(201).json(file)
    } catch (error) {
        res.status(401).json({messgae: "Internal server error!!"});
        console.log("error in get file controller: ",error.message)
    }
}

const deleteFile=async (req,res)=>{
    try {
        const {projectId,id}=req.params
        const file=await File.findById(id);
        if(!file){
            res.status(401).json({message: "No such file exists!!"});
            return ;
        }
        await File.findByIdAndDelete(id);
        await Project.updateOne({_id: projectId}, {$pull: {files: id}});
        res.status(201).json({message: "File deleted!!"})
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"});
        console.log("error in delete file controller: ",error.message);
    }
}

module.exports={
    createFile,
    updateFile,
    getFile,
    deleteFile
}