import React, {useState} from 'react';
import './SignIn.css';
import ReactModal from 'react-modal';
import {useGlobalContext} from '../../../context';
import {Link, useNavigate} from 'react-router-dom'
import logo from '../../../Images/Authorization/signinlogo.png';
import facebook from '../../../Images/Authorization/facebook.png'
import google from '../../../Images/Authorization/google.png';
import * as constants from '../../../constants';
import passwordeye from '../../../Images/Authorization/passwordEye.png';


function SignIn() {
    ReactModal.setAppElement('#root');
    const {showOnlySignup, showOnlyForgot, showOnlySignin}=useGlobalContext();
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [errorLogin, setErrorLogin]=useState("")
    const [error, setError]=useState(false);
    const [openPass, setOpenPass]=useState(false);

    const navigate=useNavigate()

    const submitSignin=(e)=>{
        e.preventDefault();
        if(!email || !password){
            setError(true)
        }
        else{
            let data={
                email,
                password
            }

        fetch(`${constants.baseURL}/user_login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(result=>{
            if(result.id){
                localStorage.setItem("user", JSON.stringify(result));
                localStorage.setItem("token",result.userToken);
                navigate('/')
                window.location.reload()
            }
            else{
                setErrorLogin("Invalid Login or Password")
            }
        })
        .catch(err=>setErrorLogin("Invalid Login or Password")
        )
        }
    }
    return(
        <div className='SignIn'>
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
                        maxHeight:"900px",
                        height:"70%",
                        margin: '5% auto',
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
            <div className='signin_modal_logo_box'>
                <img src={logo} className = "signin_modal_logo"/>
                <Link to="/"><i className="fa-solid fa-xmark exit_signin_modal" onClick={showOnlySignin}></i></Link>
            </div>    
            <div className='signin_modal_header_box'>
                <h3 className='signin_modal_head'>
                    Sign In
                </h3>
            </div>
            <form className='signin_form' onSubmit={submitSignin}>

                <input type = {"email"} 
                    name="email"
                    className='signin_modal_input' 
                    placeholder={'Email'}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    style={{border:error?"1px solid red":"none"}}
                />
                <div className='signin_password_box'>
                    <input type = {openPass?"text":"password"} 
                        className='signin_modal_input' 
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        style={{border:error?"1px solid red":"none"}}
                    />
                    <img src={passwordeye} className="password_eye signin_password_eye"  onClick = {()=>setOpenPass(!openPass)}/>

                </div>
                {
                    errorLogin ? <p className='login_error_text'>{errorLogin}</p> : null
                }
                {
                    error ? <p className='signup_error_text'>Please fill in all the fields</p> : null

                }
                <input type="submit" className='signin_modal_submit' value="SIGN IN"/>
                <p className='signin_modal_link_forgot' onClick={showOnlyForgot}>Forgot your password?</p>
            </form>
            <div className='signin_modal_new_to_wdf_box'>
                <hr/>
                <h5 className='signin_modal_new_to_wdf_head'>
                    New to WDF?
                </h5>
                <hr/>    

            </div>    
            <button className='signin_modal_create_account_link' onClick={showOnlySignup}>Create Your Account</button>
            </ReactModal>

        </div>
    )
}

export default SignIn