const bodyParser = require("body-parser");
const express =require("express");
const {Server}=require("socket.io");


const io = new Server(
   { cors: true,}   
);
const app=express();

app.use(bodyParser.json());

const emailToSocketMapping= new Map();

io.on('connection',(socket)=>{
    console.log("new connection");

    socket.on('join-room',(data)=>{
        const {emailId,roomId}=data;
        console.log("user",emailId,"joined room",roomId);
        emailToSocketMapping.set(emailId,socket.id);
        socket.join(roomId);
        socket.emit('joined-room',{roomId});
        socket.broadcast.to(roomId).emit('user-joined',{emailId});
    })
});


 
app.listen(8000,() =>console.log("express server runnig on the port 8000"));
io.listen(8001);