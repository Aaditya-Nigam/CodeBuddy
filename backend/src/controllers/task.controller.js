const Project = require("../models/project.model");
const Task = require("../models/task.model");

const createTask=async (req,res)=>{
    try {
        const {id}=req.params
        const {title,author,deadline}=req.body
        if(!title || !author || !deadline){
            res.status(401).json({message: "Fields are missing!!"});
            return ;
        }
        const project=await Project.findById(id);
        if(!project){
            res.status(401).json({message: "No such project exists!!"});
            return ;
        }
        if(!project.collaborators.include(req.user._id)){
            res.status(401).json({message: "No such project exists!!"});
            return ;
        }
        const newTask=await Task({
            title,
            author,
            deadline,
            projectId: id
        })
        await newTask.save()
        await Project.updateOne({_id: id}, {$push: {taks: newTask._id}})
        res.status(201).json(newtask)
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"});
        console.log("error in create task controller: ",error.message) ;
    }
}

const updateTask=async(req,res)=>{
    try {
        const {id}=req.params
        const {title,author,deadline}=req.body
        if(!title || !author || !deadline){
            res.status(401).json({message: "Fields are missing!!"});
            return ;
        }
        const task=await Task.findById(id);
        if(!task){
            res.status(401).json({message: "No such task exists!!"});
            return ;
        }
        const updatedTask=await Task.findByIdAndUpdate(id, {title,author,deadline},{new:true})
        if(!updatedTask){
            res.status(401).json({message: "Internal server error!!"});
            return ;
        }
        res.status(201).json(updatedTask)
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"});
        console.log("error in create task controller: ",error.message) ;
    }
}

const getTask=async(req,res)=>{
    try {
        const {id}=req.params
        const task=await Task.findById(id);
        if(!task){
            res.status(401).json({message: "No such task exists!!"});
            return ;
        }
        res.status(201).json(task)
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"});
        console.log("error in create task controller: ",error.message) ;
    }
}

const deleteTask=async (req,res)=>{
    try {
        const {projectId,id}=req.params
        const task=await Task.findById(id);
        if(!task){
            res.status(401).json({message: "No such task exists!!"});
            return ;
        }
        await Task.findByIdAndDelete(id);
        await Project.updateOne({_id: projectId}, {$pull: {tasks: id}})
        res.status(201).json({message: "Task deleted!!"})
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"});
        console.log("error in create task controller: ",error.message) ;
    }
}

module.exports={
    createTask,
    updateTask,
    getTask,
    deleteTask
}