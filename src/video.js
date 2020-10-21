import React, { useRef, useState } from 'react'
import "./Video.css"
import Videofooter from './VideoFooter'
import VideoSidebar from "./VideoSidebar"


const Video=({ url, channel, description, song, likes, messages, shares })=>{
    const [playing,setPlaying]=useState(false)
    const videoRef=useRef(null)
    const onVideoPress=()=>{
        if(playing){
            videoRef.current.pause();
            setPlaying(false) } 
        else{
        videoRef.current.play();
        setPlaying(true);}
    }

    return (
        <div className="video">
            <video 
            loop
            ref={videoRef}
            onClick={onVideoPress}
            className="video_player" 
            src={url}></video>
            <VideoSidebar likes={likes} messages={messages} shares={shares}/>
            <Videofooter channel={channel} description={description} song={song}/>
        </div>
        
    )
}
export default Video