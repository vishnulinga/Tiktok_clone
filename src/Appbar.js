import React,{useState,useEffect} from 'react'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Modal from "@material-ui/core/Modal"
 import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import db from "./firebase"

 function rand() {
    return Math.round(Math.random() * 20) - 10;
   }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 300,
      left:600,
      backgroundImage: 'url("https://image.winudf.com/v2/image/Y29tLnNpbXBsZWRyb2lkLndhbGxwYXBlcmdyYWRpZW50YmFja2dyb3VuZF9zY3JlZW5fMTVfMTUyNjk2OTAyMF8wNzc/screen-15.jpg?fakeurl=1&type=.jpg")',
      border: '2px solid black',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      backgroundSize: 'cover',
    
   
    },
  }));
  

const Appbar=(props) =>{
    const classes = useStyles();
  //getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [users,setUsers]=useState([])
  const [id,setId]=useState("")
  const [pwd,setPwd]=useState("")

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) =>
      setUsers(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);


  const Validate=()=>{
    let check=true
    users.forEach((user)=>{
    if(user.userid===id &&user.password===pwd)
    {
        
        props.setAuthenticate(true)
        props.setLogin(true)
        props.setPassword(pwd)
        props.setUserid(id)
        localStorage.setItem("channel",id)
        setOpen1(false);
        check=false;
    }
    
})
if(check)
alert("Wrong username or password")

  }
  const save=()=>{
    if(id!==""&&pwd!==""){  
    var data={
          userid:id,
          password:pwd
      }
      
     db.collection("users").doc().set(data)
    .then(()=>{alert("success");setOpen2(false);})
      .catch((error)=>{
          alert(error)
      })
}
      else{
          alert("Enter UserID and Password")
      }
  }

  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const body1 = (
    <div  style={modalStyle} className={classes.paper} >
          
            <div > 
           <TextField  required id="UserID"label="UserID" onChange={(e)=>setId(e.target.value)} value={id}/>
           </div>
            <div >
           <TextField required id="Password"label="Password" type="password" onChange={(e)=>setPwd(e.target.value)} value={pwd}/>
           </div>
        <div ><Link color="inherit" style={{cursor:"pointer"}}>Forgot Password?</Link></div>
        <div  style={{marginTop:'10px'}}>
        <Button variant="contained" color="primary" onClick={Validate}>Login</Button>
        </div>
        
        </div>
  );
  const body2 = (
    <div  style={modalStyle} className={classes.paper}>
          
            <div > 
           <TextField  required id="UserID"label="UserID" onChange={(e)=>setId(e.target.value)} value={id}/>
           </div>
            <div >
           <TextField required id="Password"label="Password" type="password" onChange={(e)=>setPwd(e.target.value)} value={pwd}/>
           </div>
        
        <div  style={{marginTop:'10px'}}>
        <Button variant="contained" color="primary" onClick={save}>Signup</Button>
        </div>
        
        </div>
  );

    return (
        <>
           <AppBar position="static">
  <Toolbar >  
    <><Button color="inherit" onClick={handleOpen1}>Login</Button>
    <Modal
  open={open1}
  onClose={handleClose1}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
  {body1}
</Modal></>
    <><Button onClick={handleOpen2}color="inherit">Signup</Button>
    <Modal
  open={open2}
  onClose={handleClose2}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
  {body2}
</Modal></>
  </Toolbar>
</AppBar> 
        </>
    )
}
export default Appbar
