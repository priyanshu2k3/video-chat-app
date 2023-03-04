import React,{useEffect,useCallback,useState} from 'react';
import { useSocket} from '../providers/socket';
import { usePeer } from '../providers/peer';
import ReactPlayer from "react-player";

// import { useNavigate } from 'react-router-dom';
// import {socket} from "socket.io-client"



const RoomPage = () => {

const {peer,createOffer,createAnswer,setRemoteAnswer} =usePeer();
const [myStream,setMyStream]=useState(null);

const {socket}=useSocket();

const handelNewUserJoined=useCallback(
async (data)=>{
    const {emailId}=data;
    console.log("new user joined room!!   the function fired is =>handelNewUserJoined",emailId)
    const offer=await createOffer();
    socket.emit("call-user",{emailId,offer});
},[createOffer,socket]
)

const handleIncommingCall=useCallback(async(data)=>{
    const {from,offer}=data;
    console.log("incomming call from ",from,offer);
    const ans=await createAnswer(offer);
    socket.emit("call-accepted",{emailId:from,ans})

   } ,[createAnswer,socket]);

const handelCallAccepted=useCallback(async(data)=>{
    const {ans}=data;
    await setRemoteAnswer(ans);
    console.log("call got accepted",ans);

   } ,[setRemoteAnswer]);

     const  getUserMediaStream=useCallback(async()=>{
        var  stream=await navigator.mediaDevices.getUserMedia({audio: true, video:false})
        setMyStream(stream);
     });

      useEffect(()=>{
        getUserMediaStream();
    },[])

useEffect(()=>{
    socket.on("user-joined",handelNewUserJoined);
    socket.on("call-user",handleIncommingCall);
    //socket.on("incomming-call",handleIncommingCall);
    socket.on('call-accepted',handelCallAccepted);

    return()=>{
        socket.off("user-joined",handelNewUserJoined);
        socket.off("call-user",handleIncommingCall);
        //socket.off("incomming-call",handleIncommingCall);
        socket.off('call-accepted',handelCallAccepted);

    }
})





    return (
        <div className='room-page-container'>
           <ReactPlayer url={myStream} playing muted></ReactPlayer>
        </div>
    );
};

export default RoomPage;