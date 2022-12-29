import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
import Login from './components/Auth/Login';
import SignUp from "./components/Auth/SignUp.jsx";
import "./css/styles.css";

import {BrowserRouter as Router,Route,Switch} from "react-router-dom";


export default function App()
{
    return (
        <>
        <Router>
        
            <Switch>
                <Route exact path="/">
                <Header />
                <Body/>
                </Route>

                <Route exact path="/login">
                <Header />
                <Body/>
                <Login/>
                </Route>

                <Route exact path="/signUp">
                <Header />
                <Body/>
                <SignUp/>
                </Route>
            </Switch>
        </Router>
            
        </>
    );
}