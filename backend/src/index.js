const express=require("express")
const dotenv=require("dotenv")
const connectDB = require("./lib/mongo")
const authRouter=require("./routers/auth.router")
dotenv.config()

const app=express()

app.use(express.json())
app.use("/api/auth",authRouter)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running at port no. ${PORT}`)
    connectDB()
})