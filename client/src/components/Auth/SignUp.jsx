import "./login.css";
import Input from './Input';
import { useState } from "react";
import { Button,Grid } from "@material-ui/core";
import {useDispatch} from 'react-redux';
import { signup } from "../../actions/user";
import {useHistory} from "react-router-dom";

import useStyles from './styles';

export default function SignUp()
{
    const initialData={name:"", email: "",password:"", confirmPassword:""};
    const [formData,setFormData]=useState(initialData);
    const [showPassword,setShowPassword]=useState(false);
    const [passwordsNotMatching,setPasswordsNotMatching]=useState(false);
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
    const handlePasswordsNotMatching=()=>{
        setPasswordsNotMatching(true);
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        if(formData.password!=formData.confirmPassword){
            handlePasswordsNotMatching();
        }
        else{
            dispatch(signup(formData,history));
        }

    }
    
    return (
        <>
        <div className="login-page">
            <div className="globe">
                <h1>Sensing Bharat</h1>
                <h4>Search your data and let us provide you the package!</h4>
                <img src="/images/globe.png"/>
            </div>
            <div className="login">
                <a href="/">Back</a>
                <h1>Sign Up</h1>
                <p>Please set up your account.</p>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="name" label="Name" handleChange={handleChange} />
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text" :"password"} handleShowPassword={handleShowPassword} />
                        <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>
                        {passwordsNotMatching && <p className="red-error-login">Passwords do not match, try again.</p>}
                    </Grid>
        
                        <Button type="submit" fullWidth variant="contained" color="primary" className={`login-button ${classes.submit}`}>
                            "SIGN UP"
                        </Button>                  
                </form>
            </div>
        </div>
            
        </>
    );
    // const [show, setShow] = useState(false);
    // const handleShow = () => setShow(true);
    // const handleClose = () => setShow(false);

    // return (
    //     <>
    //     {/* write handleshow function in header */}
    //     <Modal show={ show } onHide={ handleClose }>
    //     <Modal.Body>
    //     <div className="login-page">
    //         <div className="globe">
    //             <h1>Sensing Bharat</h1>
    //             <h4>Search your data and let us provide you the package!</h4>
    //             <img src="/images/globe.png"/>
    //         </div>
    //         <div className="login">
    //             <a href="/">Back</a>
    //             <h1>Sign Up</h1>
    //             <p>Welcome Back! Please set up your account.</p>
    //             <input type="text" placeholder="Name"/>
    //             <input type="text" placeholder="E-mail"/>
    //             <input type="text" placeholder="Password"/>
    //             <button>Sign Up</button>
    //         </div>
    //     </div>
    //     </Modal.Body>
    //     </Modal>
        
        
    //     </>
    // );
}
