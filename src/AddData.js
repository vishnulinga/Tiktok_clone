import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import firebase from "firebase"
import db from "./firebase"
import CircularProgress from '@material-ui/core/CircularProgress';

const Adddata=(props)=> {
    const [channel,setChannel]=useState(localStorage.getItem("channel"))
    const [song,setSong]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState([])
    const[url,setUrl]=useState("URL")
    const[disable,setDisable]=useState(true)
    const [progress, setProgress] = useState(0);
 
    const showurl=()=>{
        let bucketname='videos'
        let resfile=file[0]
        let storageRef=firebase.storage().ref(`${bucketname}/${resfile.name}`)
        let spaceRef=storageRef
        storageRef.getDownloadURL().then((URL)=>{
            setUrl(URL);
            console.log(URL)
            console.log(url);
            var data={
                    url:URL,
                    song:song,
                    channel:channel,
                    description:desc,
                    likes:Math.floor(Math.random() * 1000),
                    shares:Math.floor(Math.random() * 1000),
                    messages:Math.floor(Math.random() * 1000)
                }
                db.collection("videos").doc().set(data)
      .then(()=>{alert("success");props.setOpen(false);})
        .catch((error)=>{
            alert(error)
        })
        }).catch((error)=>console.log(error))
        
    }
    const Upload=(files)=>{
        if(song!==""&&desc!=="" &&file.name!==""){
        setFile(files)
        let bucketname='videos'
        // let resfile=files[0]
        let storageRef=firebase.storage().ref(`${bucketname}/${files[0].name}`)
        let uploadTask=storageRef.put(files[0])
       
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snap)=>{
                var prog=(snap.bytesTransferred/snap.totalBytes)
                setProgress(Math.floor(prog*100))
                
                
                
            })
           
        // storageRef.getDownloadURL().then((URL)=>{
        //     setUrl(URL);
        //     console.log(url)
        // }).catch((error)=>console.log(error))
        
        // var data={
        //     url:url,
        //     song:song,
        //     channel:channel,
        //     description:desc,
        //     likes:Math.floor(Math.random() * 1000),
        //     shares:Math.floor(Math.random() * 1000),
        //     messages:Math.floor(Math.random() * 1000)
        // }
        
    //    db.collection("videos").doc().set(data)
    //   .then(()=>{alert("success");props.setOpen(false);})
    //     .catch((error)=>{
    //         alert(error)
    //     })
    }else{alert("Fill all fields")}

    }

    return (
        <div className="Adddata">
          
        <div className="LoginItem"> 
       <TextField disabled id="channel"label="Channel" onChange={(e)=>setChannel(e.target.value)} value={"@"+channel}/>
       </div>
        <div className="LoginItem">
       <TextField required id="song"label="Song"  onChange={(e)=>setSong(e.target.value)} value={song}/>
       </div>
       <div className="LoginItem">
       <TextField required id="desc"label="Description"  onChange={(e)=>setDesc(e.target.value)} value={desc}/>
       </div>

       <Button
  variant="contained"
  component="label"
>
  Add File
  <input
    type="file"
    onChange={(e)=>Upload(e.target.files)}
    style={{ display: "none" }}
  />
</Button>
{progress!==100?
<CircularProgress fontSize="medium"variant="static" value={progress} />:
    //    <Button variant="contained" color="primary" id="upload" disabled={disable} onClick={Upload}>upload</Button>
       <Button variant="contained" color="primary" onClick={showurl}>url</Button>}
    
    </div>
    )
}
export default Adddata
