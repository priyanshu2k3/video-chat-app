import React,{useEffect,useCallback} from 'react';
import { useSocket} from '../providers/socket';
import { usePeer } from '../providers/peer';

// import { useNavigate } from 'react-router-dom';
// import {socket} from "socket.io-client"



const RoomPage = () => {

    
const {peer,createOffer}=usePeer();

const {socket}=useSocket();
const handelNewUserJoined=useCallback(
async (data)=>{
    const {emailId}=data;
    console.log("new user joined room!!   the function fired is =>handelNewUserJoined",emailId)
    const offer=await createOffer();
    socket.emit("call-user",{emailId,offer});
},[createOffer,socket]
)

//{from:fromEmail,offer}
const handleIncommingCall=useCallback((data)=>{
    const {from,offer}=data;
    console.log(from,offer);
   } ,[])

useEffect(()=>{
    socket.on("user-joined",handelNewUserJoined);
    socket.on("call-user",handleIncommingCall);
})



    return (
        <div className='room-page-container'>
           
        <h1>hello</h1>
        </div>
    );
};

export default RoomPage;