const User = require("../models/auth.model");
const Project=require("../models/project.model")


const createProject=async (req,res)=>{
    try {
        const {projectName}=req.body
        if(!projectName){
            res.status(401).json({message: "Fields are missing!!"});
            return ;
        }
        const project=await Project.findOne({projectName, collaborators: req.user._id});
        if(project){
            res.status(401).json({message: "Project name already taken!!"});
            return ;
        }
        const newProject=new Project({
            projectName,
            author: req.user._id,
        })
        newProject.save();
        await Project.updateOne({_id: newProject._id}, {$push: {collaborators: req.user._id}})
        await User.updateOne({_id: req.user._id}, {$push: {projects: newProject._id}})  
        res.status(201).json(newProject);
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"})
        console.log("error in create project controller: ",error.message)
    }
}

const joinProject=async (req,res)=>{
    try {
        const id=req.params
        const userId=req.user._id
        const project=await Project.findById(id);
        if(!project){
            res.status(401).json({message: "Invalid projectId!!"});
            return ;
        }
        if(project.collaborators.include(userId)){
            res.status(401).json({message: "Already the member of the project!!"});
            return ;
        }
        await Project.updateOne({_id: id}, {$push: {collaborators: userId}})
        res.status(201).json(project)
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"})
        console.log("error in join project controller: ",error.message)
    }
}

const leaveProject=async (req,res)=>{
    try {
        const id=req.params
        const userId=req.user._id
        const project=await Project.findById(id);
        if(!project){
            res.status(401).json({message: "Invalid projectId!!"});
            return ;
        }
        if(!project.collaborators.include(userId)){
            res.status(401).json({message: "Not a member of the project!!"});
            return ;
        }
        await Project.updateOne({_id: id}, {$pull: {collaborators: userId}})
        res.status(201).json(project)
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"})
        console.log("error in leave project controller: ",error.message)
    }
}

const changeName=async (req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params
        if(!name){
            res.status(401).json({message: "Fields are missing!!"});
            return ;
        }
        let project=await Project.findOne({projectName: name, collaborators: req.user._id});
        if(project){
            res.status(401).json({message: "Project name is already taken!!"});
            return ;
        }
        project=await Project.findByIdAndUpdate(id,{projectName: name},{new: true})
        res.status(201).json(project)
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"});
        console.llog("error in change name controller: ",error.message);
    }
}

const deleteProject=async (req,res)=>{
    try {
        const {id}=req.params;
        const project=await Project.findOne({_id: id, collaborators: req.user._id})
        if(!project){
            res.status(401).json({message: "No such project exists!!"});
            return ;
        }
        await Project.findByIdAndDelete(id);
        await User.updateMany({projects: id}, {$pull: {projects: id}});
        res.status(201).json({message: "Project deleted successfully!!"})
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"});
        console.log("error in delete project controller: ",error.message);
    }
}

const getProject=async (req,res)=>{
    try {
        const {id}=req.params
        const userId=req.user._id
        const project=await Project.findOne({_id: id}).populate({path: 'collaborators', select: 'fullName userName profilePic'})
        if(!project){
            res.status(401).json({message: "Project doesn't exists!!"});
            return ;
        }
        res.status(201).json(project);
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"});
        console.log("error in get project controller: ",error.message)
    }
}

module.exports={
    createProject,
    joinProject,
    leaveProject,
    changeName,
    deleteProject,
    getProject
}