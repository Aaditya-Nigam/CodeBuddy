const jwt=require("jsonwebtoken");
const User = require("../models/auth.model");

const protectedRoute=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            res.status(401).json({message: "User unauthentcated!!"})
            return;
        }
        const verify=await jwt.verify(token,process.env.JWT);
        if(!verify){
            res.status(401).json({message: "Invalid token!!"});
            return;
        }
        const user=await User.findById(verify.userId).select('-password');
        if(!user){
            res.status(401).json({message: "Invalid token!!"});
            return;
        }
        req.user=user
        next();
    } catch (error) {
        res.status(401).json({messgae: "Internal server error!!"})
        console.log("error in protected route: ",error.message);
    }
}

module.exports=protectedRoute;