import React, {useState} from 'react'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import "./Login.css"
import Link from "@material-ui/core/Link"
const Login=(props)=> {
    const [id,setId]=useState("")
    const [pwd,setPwd]=useState("")

    

    return (
        <div className="LoginForm">
          
            <div className="LoginItem"> 
           <TextField required id="UserID"label="UserID" onChange={(e)=>setId(e.target.value)} value={id}/>
           </div>
            <div className="LoginItem">
           <TextField required id="Password"label="Password" type="password" onChange={(e)=>setPwd(e.target.value)} value={pwd}/>
           </div>
        <div className="Forgot"><Link color="inherit" style={{cursor:"pointer"}}>Forgot Password?</Link></div>
        <Button variant="contained" color="primary">Login</Button>
        
        <span className="LoginButton">
        <Button variant="contained" color="primary">Signup</Button>
        </span>
        </div>
    )
}
export default Login
