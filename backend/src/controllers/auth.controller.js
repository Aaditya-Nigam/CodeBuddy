const generateToken = require("../lib/auth");
const User = require("../models/auth.model");
const bcrypt=require("bcrypt")

const authSignUp=async (req,res)=>{
    try {
        const {fullName,userName,email,password}=req.body;
        if(!fullName || !userName || !email || !password){
            res.status(401).json({message: "Missing Fields!!"})
            return ;
        }
        let user=await User.findOne({userName});
        if(user){
            res.status(401).json({message: "Username already taken!!"})
            return ;
        }
        user=await User.findOne({email});
        if(user){
            res.status(401).json({message: "Email already Used!!"})
            return ;
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=new User({
            fullName,
            userName,
            email,
            password: hashedPassword
        })
        if(!newUser){
            res.status(401).json({message: "Internal server error!!"})
            return ;
        }
        generateToken(res,newUser._id)
        await newUser.save();
        res.status(201).json({
            fullName: newUser.fullName,
            userName: newUser.userName,
            email: newUser.email,
            profilePic: newUser.profilePic,
            projects: newUser.projects,
            skills: newUser.skills,
        })
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"});
        console.log("error in signup controller: ",error.message);
    }
}

const authSignIn=async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            res.status(401).json({message: "Missing Fields!!"})
            return ;
        }
        const user=await User.findOne({email}).populate({path: 'projects'});
        if(!user){
            res.status(401).json({message: "Invalid credentials!!"})
            return ;
        }
        const checkPassword=await bcrypt.compare(password,user.password)
        if(!checkPassword){
            res.status(401).json({message: "Invalid credentials!!"})
            return ;
        }
        generateToken(res,user._id)
        res.status(201).json({
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            profilePic: user.profilePic,
            projects: user.projects,
            skills: user.skills,
        })
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"});
        console.log("error in signin controller: ",error.message);
    }
}

const authLogout=async (req,res)=>{
    try {
        res.cookie('jwt',"",{
            maxAge: 0
        })
        res.status(201).json({message: "Logout successfully"});
    } catch (error) {
        res.status(401).json({messgae: "Internal server error!!"});
        console.log("error in logout controller: ",error.message)
    }
}

const authUpdateSkills=async (req,res)=>{
    try {
        const {skill}=req.body;
        const userId=req.user._id
        if(!skill){
            res.status(401).json({message: "Fields are missing!!"});
            return ;
        }
        await User.updateOne({_id: userId},{$push: {skills: skill}});
        const user=await User.findById(userId);
        res.status(201).json(user);
    } catch (error) {
        res.status(401).json({message: "Internal server error!!"});
        console.log("error in update skills controller: ",error.message);
    }
}

const authCheck=async (req,res)=>{
    try {
        res.status(201).json(req.user);
    } catch (error) {
        res.status(401).json({messgae: "Internal server error!!"})
        console.log("error in check controller: ",error.message)
    }
}


module.exports={
    authSignUp,
    authSignIn,
    authLogout,
    authUpdateSkills,
    authCheck
}