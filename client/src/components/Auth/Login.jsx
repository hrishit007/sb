import "./login.css";
import React from "react";
import Input from './Input';
import { useState } from "react";
// import { Button,Grid } from "@material-ui/core";
import {Button,Grid,Divider} from "@mui/material";
import {useDispatch} from 'react-redux';
import { login } from "../../actions/user";
import {useHistory} from "react-router-dom";

import useStyles from './styles';

export default function Login()
{
    const initialData={email: "",password:""};
    const [formData,setFormData]=useState(initialData);
    const [showPassword,setShowPassword]=useState(false);
    const [invalidCredentials,setInvalidCredentials]=useState(false);
    const [usernameDNE,setUsernameDNE]=useState(false);
    const dispatch=useDispatch();
    const history=useHistory();
    const classes=useStyles();

    const handleChange=(event)=>{
        setFormData({...formData, [event.target.name] : event.target.value })
    }

    const handleShowPassword=()=>{
        const toggle= !showPassword;
        setShowPassword(toggle);
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        dispatch(login(formData,history,handleInvalidCredentials));

    }
    const handleInvalidCredentials=()=>{
        setInvalidCredentials(true);
    }
    return (
        
        <div className="login-page">
            <div className="globe">
                <h1>Sensing Bharat</h1>
                <h4>Search your data and let us provide you the package!</h4>
                <img src="/images/globe.png"/>
            </div>
            <div className="login">
                <a className="login-link" href="/">Back</a>
                <h1>Login</h1>
                <p className="login-paragraph">Welcome Back! Please Log in to your account.</p>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text" :"password"} handleShowPassword={handleShowPassword} />
                        {invalidCredentials && <p className="red-error-login">Invalid Username or Password, try again.</p>}
                        {usernameDNE && <p className="red-error-login">EmailID does not exist. Please Sign Up or login with Google</p>}
                    </Grid>
                        <br/>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={`login-button ${classes.submit}`}>
                            "LOG IN"
                        </Button>                  
                </form>
                <br/>
                <Divider>OR</Divider>

                <a className="login-link fp" href="#" >Forgot Password?</a>
            </div>
        </div>
            
        
    );
}






