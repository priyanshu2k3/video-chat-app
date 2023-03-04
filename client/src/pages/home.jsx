import React,{useState,useEffect, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket} from '../providers/socket';
// import {socket} from "socket.io-client"
// import { usePeer } from '../providers/peer';

const Homepage = () => {
    const {socket}=useSocket();

    const [emailId, setEmail] = useState("")
    const [roomId, setRoomId] = useState("")


const navigate =useNavigate();
    const handelJoinRoom=(e)=>{
        e.preventDefault();
        console.log(emailId,roomId);
        socket.emit("join-room",{emailId,roomId});
    }

     const handelJoinedRoom=useCallback(({roomId})=>{ 
        console.log("roomejoined here",roomId)
        navigate(`/room/${roomId}`)
    },[navigate]);

    useEffect(()=>{socket.on('joined-room',handelJoinedRoom)
    return()=>{socket.off('joined-room',handelJoinedRoom)}
},[handelJoinedRoom,socket]);


    return (
        <div className='homepage-container'>
             <div className='input-container'>
                <input type="email" placeholder='enter your email id' value={emailId} onChange={e=>setEmail(e.target.value)}/>
                <input type="text"  placeholder='enter room code' value={roomId} onChange={e=>setRoomId(e.target.value)}/>
                <button onClick={((handelJoinRoom))}>Enter room</button>
             </div>
        
        </div>
    );
};

export default Homepage;