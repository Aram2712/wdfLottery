import React, {useState} from "react";
import fon1 from '../../Images/Authorization/fon1.png';
import fon2 from '../../Images/Authorization/fon2.png';
import sharik from '../../Images/Authorization/sharik.png';
import coin from '../../Images/Authorization/rupi.gif';
import { useGlobalContext } from "../../context";
import "./Authorization.css";
import SignIn from "./SignIn/SignIn";
import SignUp from "./Signup/Signup";
import ForgotPassword from "./ForgotPassword/ForgotPassword";


function Authorization() {

    const { showSignin, showSignup, showForgot }=useGlobalContext()
    return(
        <div className="Authorization_component">
            <img src={fon1} className="authorization_page_fon1"/> 
            <img src={fon2} className="authorization_page_fon2"/> 
            <div className="Authorization_component_center_box">
                <img src={sharik} className="authorization_sharik"/>
                <img src={coin} className="authorization_bitcoin_image"/>
                { showSignin?<SignIn/>:showSignup?<SignUp/>:showForgot?<ForgotPassword/>:null }
            </div>
        </div>
    )
}

export default Authorization