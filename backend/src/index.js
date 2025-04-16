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
dotenv.config()

const app=express()

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

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running at port no. ${PORT}`)
    connectDB()
})