import "./css/header.css";
import { useEffect } from "react";
import { useState } from "react";
import { Link,useHistory,useLocation } from "react-router-dom";
// import { Button } from "@material-ui/core";
import { Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { logout } from "../actions/user";
import { useDispatch } from "react-redux";

export default function Header() {

    const history=useHistory();
    const dispatch=useDispatch();
    // button display based on whether user is logged in or not 
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const location=useLocation();

    useEffect(()=>{
            setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);
    
    const handleUserLogout=()=>{
        setUser(null);
    }
    const handleLogoutButtonClick=()=>{
        //some checks might need to be done when further features are added
        dispatch(logout(history,handleUserLogout));
    }

    return(<>
        <header>
                <div className="logosection">
                        <div id="logo"><img src="./images/logo.svg" alt="LOGO"/></div>
                        <div id="logotext">SensingBharat</div>
                    </div>
                    <div className="nav-items">
                        <ul>
                            <li ><a href="/">Home</a></li>
                            <li ><a href="/about">About</a></li>
                            <li ><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className={user?"buttons-information-header":"buttons-header"}>
                    {!user && <Button className="buttonhome" component={Link} to="/login" >LOG IN</Button>}
                    {!user && <Button className="buttonhome" component={Link} to="/signup" >SIGN UP</Button>}
                    {user && <>
                          
                        <div className="user-name">{user.result.name}</div>
                        <div className="user-image icons"><Avatar sx={{ bgcolor: deepOrange[500] }} alt={user.result.name} src={user.result.picture}>{(user.result.name).charAt(0).toUpperCase()}</Avatar></div>
                        <div className="icons"><img src="./images/cart.svg"></img></div>
                        <Button className="buttonhome" onClick={handleLogoutButtonClick}>LOG OUT</Button> 
                    </>}
                    </div>
                
            </header>
    </>)

    
    if(user) {
        return (<>
            <header>
                <div className="logosection">
                        <div id="logo"><img src="./images/logo.svg" alt="LOGO"/></div>
                        <div id="logotext">SensingBharat</div>
                    </div>
                    <div className="nav-items">
                        <ul>
                            <li ><a href="/">Home</a></li>
                            <li ><a href="/about">About</a></li>
                            <li ><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="buttons-header">
                    <div id="icons"><img src="./images/cart.svg"></img></div>  
                    <div id="icons"><img src="./images/user.svg"></img></div> 
                    </div>
                
            </header>
        </>);
    }
    else {
        return (
            <>
                <header>
                    <div className="logosection">
                            <div id="logo"><img src="./images/logo.svg" alt="LOGO"/></div>
                            <div id="logotext">SensingBharat</div>
                        </div>
                        <div className="nav-items">
                            <ul>
                                <li ><a href="/">Home</a></li>
                                <li ><a href="/about">About</a></li>
                                <li ><a href="/contact">Contact</a></li>
                            </ul>
                        </div>
                        <div className="buttons-header">
                            <Button className="buttonhome" component={Link} to="/login" >LOG IN</Button>
                            <Button className="buttonhome" component={Link} to="/signup" >SIGN UP</Button>
                        </div>
                    
                </header>
            </>
        );
    }

    
}