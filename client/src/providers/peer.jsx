import React ,{useMemo,useEffect, useState, useCallback}from "react";

const PeerContext =React.createContext(null);

export const usePeer=()=>{return React.useContext(PeerContext)}

export const PeerProvider=(props)=>{
    const [remoteStream,setRemoteStream]=useState(null);
    const peer=useMemo(
        ()=>new RTCPeerConnection({
        iceServers:[
            {
            urls: [
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478",

            ],
        },
        ],
    }),[]);

    const createOffer =async()=>{
       
        const offer=await peer.createOffer();
        await peer.setLocalDescription(offer);
        // console.log("create offer is fired in the peer.jsx",peer,offer)
        return (offer);
    }
    
    const createAnswer=async(offer)=>{
        await peer.setRemoteDescription(offer);
        const answer=await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return (answer);

    }

    const setRemoteAnswer=async(ans)=>{
        await peer.setRemoteDescription(ans);
    }

    const sendStream=async(stream)=>{
        const tracks= stream.getTracks();
        for (const track of tracks){
            peer.addTrack(track,stream);
        } 
    }


    const handelTrackEvent=useCallback((ev)=>{
        const streams =ev.streams;
        setRemoteStream(streams[0]);
       
    },[peer])

    useEffect(()=>{
        peer.addEventListener('tracks',handelTrackEvent)
       
        return()=>{
            peer.removeEventListener('tracks',handelTrackEvent)}
          
    },[handelTrackEvent,peer])

    return(<PeerContext.Provider value={{peer,createOffer,createAnswer,setRemoteAnswer,sendStream,remoteStream}}>
        {props.children}
    </PeerContext.Provider>);
} 







// 
// const SocketContext=React.createContext(null);

// export const useSocket =()=>{
//     return React.useContext(SocketContext);

// };



// export const SocketProvider=(props)=>{
//     const socket=useMemo(()=>io('http://localhost:8001'),
//     []
//     )
//     return(
//         <SocketContext.Provider value={{socket}}>
//             {props.children}
//         </SocketContext.Provider>
//     )
// }

