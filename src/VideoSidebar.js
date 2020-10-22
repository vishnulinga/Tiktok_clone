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
const VideoSidebar=({likes,shares,messages})=> {
  const classes = useStyles();  
  const [liked,setLiked]=useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <Adddata setOpen={setOpen}/>
      </div>
    );

    return (
        <div className="VideoSidebar">
          <div className="VideoSidebar_button">
            
               <AddIcon fontSize="large" onClick={handleOpen}/>
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
            {
                liked?<FavoriteIcon fontSize="large" onClick={(e)=>setLiked(false)}/>:<FavoriteBorderIcon fontSize="large" onClick={(e)=>setLiked(true)}/>
            }
            <p>{liked?likes+1:likes}</p>
          </div>
          <div className="VideoSidebar_button">
            <MessageIcon fontSize="large" />
            <p>{messages}</p>
          </div>
          <div className="VideoSidebar_button">
            <ShareIcon fontSize="large" />
            <p>{shares}</p>
          </div>
        </div>
    )
}
export default VideoSidebar
