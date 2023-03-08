import React,{useEffect,useCallback,useState} from 'react';
import { useSocket} from '../providers/socket';
import { usePeer } from '../providers/peer';
import ReactPlayer from "react-player";

// import { useNavigate } from 'react-router-dom';
// import {socket} from "socket.io-client"



const RoomPage = () => {

const {peer,createOffer,createAnswer,setRemoteAnswer,sendStream,remoteStream} =usePeer();
const [myStream,setMyStream]=useState(null);
const [remoteEmailId,setRemoteEmailID]=useState(null);

const {socket}=useSocket();

const handelNewUserJoined=useCallback(
async (data)=>{
    const {emailId}=data;
    console.log("new user joined room!!   the function fired is =>handelNewUserJoined",emailId)
    const offer=await createOffer();
    socket.emit("call-user",{emailId,offer});
    setRemoteEmailID(emailId)
},[createOffer,socket]
)

const handleIncommingCall=useCallback(async(data)=>{
    const {from,offer}=data;
    console.log("incomming call from ",from,offer);
    const ans=await createAnswer(offer);
    socket.emit("call-accepted",{emailId:from,ans})
    setRemoteEmailID(from);

   } ,[createAnswer,socket]);

const handelCallAccepted=useCallback(async(data)=>{
    const {ans}=data;
    await setRemoteAnswer(ans);
    console.log("call got accepted",ans);
  

   } ,[setRemoteAnswer]);



  

useEffect(()=>{
    socket.on("user-joined",handelNewUserJoined);
   // socket.on("call-user",handleIncommingCall);
    socket.on("incomming-call",handleIncommingCall);
    socket.on('call-accepted',handelCallAccepted);

    return()=>{
        socket.off("user-joined",handelNewUserJoined);
        //socket.off("call-user",handleIncommingCall);
        socket.off("incomming-call",handleIncommingCall);
        socket.off('call-accepted',handelCallAccepted);

    }
})

const  getUserMediaStream=useCallback(async()=>{
    var  stream=await navigator.mediaDevices.getUserMedia({video: true, audio: true})
  
    setMyStream(stream);

 });

useEffect(()=>{
    getUserMediaStream();
},[])


const handelNegotiation=useCallback(()=>{
const localOffer=peer.localDescription;

    console.log("Negotitation needed")
    socket.emit("call-user",{emailId:remoteEmailId,offer:localOffer});
},[])

useEffect(()=>{
    peer.addEventListener('negotiationNeedeD',handelNegotiation)
    return()=>{  
        peer.removeEventListener('negotiatiosasasanNeeded',handelNegotiation)}
},[handelNegotiation,peer])

return (
        <div>
            <h1>Room page</h1>
            <h2>You are connected to {remoteEmailId}</h2>
            <button onClick={()=>sendStream(myStream)}>Send my stream</button>
            <p>your video</p>
           <ReactPlayer url={myStream} playing muted ></ReactPlayer>
           <p>your friends video</p>
           <ReactPlayer url={remoteStream} playing  ></ReactPlayer>
           
        </div>
    );
};

export default RoomPage;