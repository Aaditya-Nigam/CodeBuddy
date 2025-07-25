const Folder = require("../models/folder.model");
const Project = require("../models/project.model");

const getFolders=async(req,res)=>{
    try {
        const {projectId,folderId}=req.params;
        const folder=await Folder.findOne({_id: folderId, projectId}).populate({path: 'folders'}).populate({path: 'files'})
        if(!folder){
            res.status(401).json({message: "No such folder found!"});
            return ;
        }
        res.status(201).json(folder);
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
        await Folder.updateOne({_id: parentFolder}, {$push: {folders: folder._id}})
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