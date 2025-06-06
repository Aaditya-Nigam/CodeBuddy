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

    socket.on('join-room',(id)=>{
        socket.join(id)
    })
})

module.exports={
    app,
    server,
    io
}