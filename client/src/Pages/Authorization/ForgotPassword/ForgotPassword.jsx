import React, {useState} from 'react';
import './ForgotPassword.css';
import ReactModal from 'react-modal';
import {useGlobalContext} from '../../../context';
import {Link} from 'react-router-dom';
import logo from '../../../Images/Authorization/signinlogo.png';
import * as constants from '../../../constants';


function ForgotPassword() {
    const {showOnlySignin}=useGlobalContext();
    const [email, setEmail]=useState("");
    const [sendEmail, setSendEmail]=useState(false);
    const [errorMail, setErrorMail]=useState(false);

    const handleForgot=async () => {
        localStorage.setItem("email", email);
        if(email){
            await fetch(`${constants.baseURL}/restore_password`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email})
            })
            .then(response=>response.text())
            .then(result=>{setSendEmail(true)})
            .catch(err=>console.log(err))
        }
        else{
            setErrorMail(true)
        }
    }

    return(
        <div className='ForgotPassword'>
            {
                !sendEmail ?
            
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
                <div className='forgot_modal_logo_box'>
                    <img src={logo} className = "forgot_modal_logo"/>
                    <Link to="/"><i className="fa-solid fa-xmark exit_forgot_modal" onClick={showOnlySignin}></i></Link>
                </div>  
                <div className='forgot_modal_header_box'>
                    <h3 className='forgot_modal_head'>
                        Forgot Password?        
                    </h3>
                    <p className='forgot_social_media_text'>
                        Please enter the email you use to sign in to WDF.
                    </p>
                </div>

                <input type="email" 
                    style={{border:errorMail ? "1px solid red" : "none"}}  
                    className='forgot_email_input' 
                    placeholder='E-mail' 
                    onChange={(e)=>{setEmail(e.target.value), setErrorMail(false)}}
                    />
                <button className='submit_forgot_email' onClick={handleForgot}>Request Password Reset</button>
                <div className='forgot_link_tosignin_box'>
                    <p className='forgot_link_tosignin' onClick={showOnlySignin}>
                        Back to Sign In
                    </p>
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
                        inset: '0',
                        position:"relative"
                    }
                }}>
                   
                    <img src={logo} className="success_modal_logo"/>
                    <i className="fa-solid fa-xmark exit_success_email_box exit_forgot_modal" onClick={showOnlySignin}></i>
                    <h2 className="password_sent_text">
                        The link is sent <br/> to your email
                    </h2>
                    
                </ReactModal>
            }       
        </div>
    )
}

export default ForgotPassword