const Message = require("../models/message.model");
const Project = require("../models/project.model");

const sendMessage=async (req,res)=>{
    try {
        const userId=req.user._id
        const {text}=req.body
        const {id}=req.params
        if(!text){
            res.status(401).json({message: "Fields are missing!!"});
            return ;
        }
        const project=await Project.findById(id)
        if(!project){
            res.status(401).json({message: "No such project is present!!"})
            return ;
        }
        const newMessage=await Message({
            senderId: userId,
            text,
            projectId: id
        })
        await newMessage.save();
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"})
        console.log("error in send message controller: ",error.message)
    }
}

const getMessages=async (req,res)=>{
    try {
        const userId=req.user._id;
        const {id}=req.params
        const project=await Project.findById(id);
        if(!project){
            res.status(401).json({message: "No such poject exists!!"});
            return ;
        }
        if(!project.collaborators.includes(userId)){
            res.status(401).json({message: "You are not a collaborator!!"});
            return ;
        }
        const messages=await Message.find({projectId: id})
        res.status(201).json(messages)
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"});
        console.log("error in get message controller: ",error.message)
    }
}

module.exports={
    sendMessage,
    getMessages
}