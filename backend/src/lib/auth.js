const jwt=require("jsonwebtoken")

const generateToken=(res,userId)=>{
    try {
        const token=jwt.sign({userId},process.env.JWT,{
            expiresIn: '7d'
        })
        res.cookie('jwt',token,{
            maxAge: 7*24*60*60*1000,
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV != 'development'
        })
        return token;
    } catch (error) {
        console.log("error in generate token: ",error.message)
    }
}

module.exports=generateToken