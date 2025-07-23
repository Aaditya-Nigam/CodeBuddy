const Folder = require("../models/folder.model");
const Project = require("../models/project.model");

const getFolders=async(req,res)=>{
    try {
        const {projectId,folderId}=req.params;
        const folders=await Folder.find({parentFolder: folderId, projectId})
        res.status(201).json(folders);
    } catch (error) {
        res.status(401).json({message: "Internal server error!"})
        console.log("Error in getFolder controller: ",error);
    }
}

const createFolder=async(req,res)=>{
    try {
        const {folderName,parentFolder,projectId}=req.body;
        const userId=req.user._id
        if(!folderName || !parentFolder || !projectId){
            res.status(401).json({message: "Fields are missing1"})
            return ;
        }
        const project=await Project.findById(projectId);
            if(!project){
                res.status(401).json({message: "No such project exists!!"})
                return ;
            }
            if(!project.collaborators.includes(userId)){
                res.status(401).json({message: "No such project exists!!"})
                return ;
            }
        const folder=new Folder({
            folderName,
            parentFolder,
            projectId
        })
        await folder.save();
        if(parentFolder){
            await Folder.findByIdAndUpdate(parentFolder, {$push : {folders: folder._id}})
        }else{
            await Project
        }
        res.status(201).json(folder)
    } catch (error) {
        res.status(401).json({message: "Internal server error!"})
        console.log("Error in createFolder controller: ",error);
    }
}

module.exports={
    getFolders,
    createFolder
}