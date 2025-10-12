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

    socket.on("joinRoom", ({fileId})=>{
        const room=`Room${fileId}`
        socket.join(room);
        console.log(`User joined- ${room}`);
    })

    socket.on("codeChange", ({fileId,code})=>{
        const room=`Room${fileId}`
        socket.to(room).emit("updateCode", {code})
    })

    socket.on("disconnection", ()=>{
        console.log("User disconnected");
    })
})

module.exports={
    app,
    server,
    io
}