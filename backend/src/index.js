const express=require("express")
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser")
const connectDB = require("./lib/mongo")
const authRouter=require("./routers/auth.router")
const projectRouter=require("./routers/project.router")
dotenv.config()

const app=express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/project",projectRouter)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running at port no. ${PORT}`)
    connectDB()
})