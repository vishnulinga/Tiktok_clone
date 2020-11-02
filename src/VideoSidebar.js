import React, { useState } from 'react'
import "./VideoSidebar.css"
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MessageIcon from "@material-ui/icons/Message";
import ShareIcon from "@material-ui/icons/Share";
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Adddata from "./AddData"
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import firebase from "firebase"
import db from "./firebase"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const VideoSidebar=({likes,shares,messages,url,userid,password})=> {
  const classes = useStyles();  
  const [liked,setLiked]=useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [video,setVideo]=useState("")
    const [pwd,setPwd]=useState("")

    
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen2 = () => {
      setOpen2(true);
    };
  
    const handleClose2 = () => {
      setOpen2(false);
    };

    const Validate=()=>{
      if(pwd===password){
        let deletedoc=db.collection('videos').where("url","==",url);
      deletedoc.get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          doc.ref.delete();
        })
      })
      setOpen2(false)
      }
    }

    const body = (
      <div style={modalStyle} className={classes.paper}>
        <Adddata setOpen={setOpen} setVideo={setVideo}/>
      </div>
    );
    const body2 = (
      <div style={modalStyle} className={classes.paper}>
         <div className="LoginItem"> 
       <TextField disabled id="userid"label="UserID" value={"@"+userid}/>
       </div>
       <div className="LoginItem">
       <TextField required id="password"label="Password"  onChange={(e)=>setPwd(e.target.value)} value={pwd}/>
       </div>
       <div  style={{marginTop:'10px'}}>
        <Button variant="contained" color="primary" onClick={Validate}>Submit</Button>
        </div>
      </div>
    );

    
    // const deletevideo=()=>{
    //   let deletedoc=db.collection('videos').where("url","==",url);
    //   deletedoc.get().then((querySnapshot)=>{
    //     querySnapshot.forEach((doc)=>{
    //       doc.ref.delete();
    //     })
    //   })
     
    // }

    
    return (
        <div className="VideoSidebar">
          <div className="VideoSidebar_button">
            
               <AddIcon cursor="pointer" fontSize="large" onClick={handleOpen}/>
               <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
            
            
          </div>
          <div className="VideoSidebar_button">
            <DeleteOutlineIcon cursor="pointer" fontSize="large" onClick={handleOpen2}/>
            <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body2}
      </Modal>
            
          </div>
          <div className="VideoSidebar_button">
            {
                liked?<FavoriteIcon cursor="pointer" fontSize="large" onClick={(e)=>setLiked(false)}/>:<FavoriteBorderIcon cursor="pointer" fontSize="large" onClick={(e)=>setLiked(true)}/>
            }
            <p>{liked?likes+1:likes}</p>
          </div>
          <div className="VideoSidebar_button">
            <MessageIcon cursor="pointer" fontSize="large" />
            <p>{messages}</p>
          </div>
          <div className="VideoSidebar_button">
            <ShareIcon cursor="pointer" fontSize="large" />
            <p>{shares}</p>
          </div>
        </div>
    )
}
export default VideoSidebar
