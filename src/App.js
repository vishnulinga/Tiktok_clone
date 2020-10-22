import React,{useState,useEffect} from 'react';
import Video from "./video"
import db from "./firebase"
import './App.css';

import Appbar from "./Appbar"
import Blank from "./Blank"

function App() {
  
  const [videos,setVideos]=useState([]);
const [authenticate,setAuthenticate]=useState(true)
const [login,setLogin]=useState(true)

useEffect(() => {
  db.collection("videos").onSnapshot((snapshot) =>
    setVideos(snapshot.docs.map((doc) => doc.data()))
  );
}, []);

  return (
    <div>

    {login?null:<Appbar  setAuthenticate={setAuthenticate} setLogin={setLogin}/>}
    <div className="app">
    {authenticate?
      <div className="app_video">
      {videos.map(({url,channel,song,description,likes,shares,messages},index)=>(
        <Video key={index} url={url} channel={channel} description={description} likes={likes} shares={shares} messages={messages} song={song}/>
      )
      
      )}
      
    </div>:<Blank/>}
    </div>
    </div>
  );
}

export default App;
