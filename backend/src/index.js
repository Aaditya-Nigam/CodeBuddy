const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const connectDB = require("./lib/mongo")
const authRouter=require("./routers/auth.router")
const projectRouter=require("./routers/project.router")
const messageRouter=require("./routers/message.router")
const fileRouter=require("./routers/file.router")
const taskRouter=require("./routers/task.router")
const {app,server}=require("./lib/socket");
const path=require("path")
dotenv.config()

const _dirname=path.resolve();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/auth",authRouter)
app.use("/api/project",projectRouter)
app.use("/api/message",messageRouter)
app.use("/api/file",fileRouter)
app.use("/api/task",taskRouter)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(_dirname,"../frontend/dist")))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(_dirname,"../frontend","dist","index.html"))
    })
}

const PORT=process.env.PORT
server.listen(PORT,()=>{
    console.log(`server running at port no. ${PORT}`)
    connectDB()
})