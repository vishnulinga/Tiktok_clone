import React,{useState,useEffect} from 'react';
import Video from "./video"
import db from "./firebase"
import './App.css';

import Appbar from "./Appbar"
import Blank from "./Blank"

function App() {
  
  const [videos,setVideos]=useState([]);
const [authenticate,setAuthenticate]=useState(false)
const [login,setLogin]=useState(false)
const [userid,setUserid]=useState("")
const [password,setPassword]=useState("")

useEffect(() => {
  db.collection("videos").onSnapshot((snapshot) =>
    setVideos(snapshot.docs.map((doc) => doc.data()))
  );
}, []);

  return (
    <div>

    {login?null:<Appbar  setAuthenticate={setAuthenticate} setLogin={setLogin} setUserid={setUserid} setPassword={setPassword}/>}
    <div className="app">
    {authenticate?
      <div className="app_video">
      {videos.map(({url,channel,song,description,likes,shares,messages},index)=>(
        <Video key={index} url={url} channel={channel} description={description} likes={likes} shares={shares} messages={messages} song={song} userid={userid} password={password}/>
      )
      
      )}
      
    </div>:<Blank/>}
    </div>
    </div>
  );
}

export default App;
