import React,{useState,useEffect} from 'react';
import Video from "./video"
import db from "./firebase"
import './App.css';
import Login from "./login"
import Appbar from "./Appbar"

function App() {
const [videos,setVideos]=useState([]);

useEffect(() => {
  db.collection("videos").onSnapshot((snapshot) =>
    setVideos(snapshot.docs.map((doc) => doc.data()))
  );
}, []);

  return (
    <div>

    <Appbar/>
    <div className="app">
    
      <div className="app_video">
      {videos.map(({url,channel,song,description,likes,shares,messages})=>(
        <Video url={url} channel={channel} description={description} likes={likes} shares={shares} messages={messages} song={song}/>
      )
      
      )}
      
    </div>
    </div>
    </div>
  );
}

export default App;
