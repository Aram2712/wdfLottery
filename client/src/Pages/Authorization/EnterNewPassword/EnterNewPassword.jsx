import React, {useState} from "react";
import './EnterNewPassword.css';
import ReactModal from "react-modal";
import fon1 from '../../../Images/Authorization/fon1.png';
import fon2 from '../../../Images/Authorization/fon2.png';
import sharik from '../../../Images/Authorization/sharik.png';
import coin from '../../../Images/Authorization/Coin-coin.gif';
import logo from '../../../Images/Authorization/logo.png';
import {useGlobalContext} from '../../../context';
import {Link} from 'react-router-dom';
import * as constants from "../../../constants";

function EnterNewPassword() {
    const {showOnlySignin}=useGlobalContext();
    const [success, setSuccess]=useState(false);
    const [newPassword, setNewPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("")
    const email=localStorage.getItem("email");
    console.log(email);

    const newPasswordSubmit=async()=>{
        if(newPassword==confirmPassword){
            await fetch(`${constants.baseURL}/update_password`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,
                    password:newPassword
                })
            })
            .then(response=>response.text())
            .then(result=>{setSuccess(true), localStorage.clear()})
            .catch(err=>console.log(err))
        }
    }

    return(

        <div className="Authorization_component">
                <img src={fon1} className="authorization_page_fon1"/> 
                <img src={fon2} className="authorization_page_fon2"/> 
            <div className="Authorization_component_center_box">
                    <img src={sharik} className = "authorization_sharik"/>
                    <img src={coin} className = "authorization_bitcoin_image"/>
            </div>
            {
                !success?
            
            <ReactModal
                isOpen={true}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        zIndex: 10
                    },
                    content: {
                        maxWidth: '490px',
                        maxHeight:"450px",
                        height:"65%",
                        margin: '8% auto',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(16.5px)',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        overflowY:"auto",
                        outline: 'none',
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        inset: '0'
                    }
                }}
            >
                <div className='newpass_modal_logo_box'>
                    <img src={logo} className = "newpass_modal_logo"/>
                    <Link to="/"><i className="fa-solid fa-xmark exit_forgot_modal"></i></Link>
                </div>  
                <div className='newpass_modal_header_box'>
                    <h3 className='newpass_modal_head'>
                        Enter New Password        
                    </h3>
                </div>

                <input type="password" className='newpass_password_input' placeholder='New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                <input type="password" className='newpass_password_input' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>

                <button className='submit_newpass_password' onClick={newPasswordSubmit}>SUBMIT</button>
                <div className='newpass_link_tosignin_box'>
                    <Link to="/authorization" className='newpass_link_tosignin' onClick={showOnlySignin}>
                        Back to Sign In
                    </Link>
                </div>
            </ReactModal>
            :
            <ReactModal
            isOpen={true}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    zIndex: 10
                },
                content: {
                    maxWidth: '490px',
                    maxHeight:"450px",
                    height:"55%",
                    margin: '8% auto',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(16.5px)',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    overflowY:"auto",
                    outline: 'none',
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    inset: '0'
                }
            }}
            >
                <img src={logo} className="success_modal_logo"/>
                <h2 className="success_password">
                    Success!
                </h2>
                <p className="success_window_text">
                    Your account password has been successfully changed
                </p>
                <Link to="/authorization" className='newpass_link_tosignin' style={{fontSize:"14px"}} onClick={showOnlySignin}>
                        Back to Sign In
                </Link>
            </ReactModal>
            }
        </div>

    )
}

export default EnterNewPassword