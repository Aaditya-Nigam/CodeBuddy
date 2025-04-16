const express=require("express")
const http=require("http")
const {Server}=require("socket.io")

const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin: ["http://localhost:5173"],
        methods: ['GET','POST','DELETE','PATCH'],
        credentials: true
    }
})

io.on('connection',(socket)=>{
    console.log(`User connected,${socket.id}`)

    socket.on('join-room',(id)=>{
        socket.join(id)
        console.log(`user connected to room: ${id}`)
    })

    socket.on('disconnect',()=>{
        console.log(`User disconnected: `,socket.id)
    })
})

module.exports={
    app,
    server,
    io
}