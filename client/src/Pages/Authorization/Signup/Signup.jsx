import React, {useState, useMemo} from 'react';
import ReactModal from "react-modal";
import logo from '../../../Images/Authorization/signinlogo.png';
import facebook from '../../../Images/Authorization/facebook.png'
import google from '../../../Images/Authorization/google.png'
import {Link} from "react-router-dom";
import passwordeye from '../../../Images/Authorization/passwordEye.png';
import countryList from 'react-select-country-list'
import {useGlobalContext} from '../../../context';
import * as constants from '../../../constants';

import './Signup.css';


function SignUp() {
    const options = useMemo(()=>countryList().getData(), [])
    const [openPass, setOpenPass]=useState(false)
    const [error, setError]=useState(false);
    const [errorSignUp, setErrorSignUp]=useState(false)
    const {showOnlySignin}=useGlobalContext();
    const [title, setTitle]=useState("mr");
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [nationality, setNationality]=useState("");
    const [passport, setPassport]=useState('');
    const [birthDay, setBirthDay]=useState("");
    const [phoneNo, setPhoneNo]=useState("");
    const [residenceCountry, setResidenceCountry]=useState("");
    const [accept, setAccept]=useState(false);
    const [passportRadio, setPassportRadio]=useState(true);
    const [goverId, setGoverId]=useState(false)
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!firstName || !lastName || !email || !password || !nationality || 
           !passport || !birthDay || !phoneNo || !residenceCountry || !accept){

            setError(true);
        }
        else{

            let data={
                title,
                firstName,
                lastName,
                email,
                password,
                nationality,
                passport,
                birthDay,
                phoneNo,
                residenceCountry
            }

            fetch(`${constants.baseURL}/authentication`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            .then(response=>response.text())
            .then(result=>{
                if(result==="OK"){
                    showOnlySignin();
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("")
                    setPassport("");
                    setBirthDay("");
                    setNationality("");
                    setPhoneNo("");
                    setResidenceCountry("");
                    setAccept(false)
                }

                else{
                    setErrorSignUp(true);
                }
            })
            .catch(err=>console.log(err))
        }
    }

    return(
        <div className='SignUp'>
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
                        maxHeight:"1000px",
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

            <div className='signup_modal_logo_box'>
                <img src={logo} className = "signup_modal_logo"/>
                <Link to="/"><i className="fa-solid fa-xmark exit_signup_modal" onClick={showOnlySignin}></i></Link>
            </div>    
            <div className='signup_form_box'>
            <form className='signup_form' onSubmit={handleSubmit}>
                <p className='signup_field_require_text'>
                    All fields are required
                </p>
                <div className='signup_title_box'>
                    <h4 className='signup_gender_text'>
                        TITLE
                    </h4>
                    <div className='signup_gender_type' 
                        onClick={()=>setTitle("mr")} style={{background:title=="mr"?"rgba(6, 197, 190, 0.3)":"rgba(255,255,255,0.1)",
                        border:title == "mr"?"1px solid #06C5BE":"none"}}>Mr.</div>
                    <div className='signup_gender_type' 
                        onClick={()=>setTitle("ms")} style={{background:title=="ms"?"rgba(6, 197, 190, 0.3)":"rgba(255,255,255,0.1)",
                        border:title == "ms"?"1px solid #06C5BE":"none"}}>Ms.</div>
                    <div className='signup_gender_type' 
                        onClick={()=>setTitle("mrs")} style={{background:title=="mrs"?"rgba(6, 197, 190, 0.3)":"rgba(255,255,255,0.1)",
                        border:title == "mrs"?"1px solid #06C5BE":"none"}}>Mrs.</div>

                </div>
                <div className='firstName_lastName_box'>
                    <input type="text" style={{border:error?"1px solid red":"none"}} 
                        className='user_firstName_input' 
                        value={firstName} 
                        onChange={(e)=>setFirstName(e.target.value)} 
                        placeholder='First Name'/>
                    <input type="text" style={{border:error?"1px solid red":"none"}} 
                        value={lastName} 
                        onChange={(e)=>setLastName(e.target.value)}
                        className='user_lasttName_input' placeholder='Last Name'/>
                </div>
                <div className='email_input_box'>
                    <input type="text" style = {{border:error?"1px solid red":"none"}} 
                        className='user_email_input' placeholder='Email'
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                    <p className='email_input_box_text'> Please provide valid email for verification link to be sent </p>
                </div>
                <div className='user_password_input_box'>
                    <input type={openPass ? "text" : "password"} style = {{border:error?"1px solid red":"none"}} 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        className="user_password_input" placeholder='Password'/>
                    <img src={passwordeye} className="password_eye" onClick = {()=>setOpenPass(!openPass)}/>
                </div>
                <div className='nationality_date_box'>
                    <select className='country_select' style={{border:error?"1px solid red":"none"}}
                        value={nationality} 
                        onChange={(e)=>setNationality(e.target.value)}
                    >
                        <option>Nationality</option>
                        {
                            options.map(item=>
                                <option>{item.label}</option>
                                )
                        }
                    </select>
                    <input type="date" className='input_date' 
                        style={{border:error?"1px solid red":"none"}}
                        value={birthDay} 
                        placeholder="Birthday"
                        onChange={(e)=>setBirthDay(e.target.value)}
                    />
                </div>
                <div className='passport_phone_inputs_box'>

                    <input type='text' className='passport_number_input' 
                        placeholder={passportRadio?'Passport Number':" Government ID"} 
                        style={{border:error?"1px solid red":"none"}}
                        value={passport} 
                        onChange={(e)=>setPassport(e.target.value)}
                    />
                    <div className='signup_radio_box'>
                        <span> 
                            
                            <input type="radio" name="passport" checked={passportRadio} 
                                   onClick={()=>{setPassportRadio(true); setGoverId(false)}} className='radio_for_passport_number'/>
                            Passport Number
                        </span>
                        <span>
                           
                            <input type="radio" name="passport" onClick={()=>{setPassportRadio(false); setGoverId(true)}} 
                                    checked={goverId}  className='radio_for_passport_number'/>
                            Government ID
                        </span>
                    </div>
                    <input type='text' className='phone_number_input' 
                        placeholder='Phone Number' 
                        style={{border:error?"1px solid red":"none"}}
                        value={phoneNo} 
                        onChange={(e)=>setPhoneNo(e.target.value)}
                    />
                </div>
                <div className='country_residence_input_box'>
                    <input type="text" className='country_residence_input' 
                        placeholder='Country of Residence' 
                        style={{border:error?"1px solid red":"none"}}
                        value={residenceCountry} 
                        onChange={(e)=>setResidenceCountry(e.target.value)}
                    />
                    <p className='email_input_box_text'> Please provide your valid Passport Number </p>
                </div>
                <div className='checkbox_input_box'>
                    <label>
                        <input type="checkbox" className='input_check' 
                            style={{border:error?"1px solid red":"none"}}
                            checked={accept}
                            onClick={()=>setAccept(!accept)}
                        />
                        <span id='asd' for="checkbox"></span>

                        <p className='accept_text'>Accept  <a href='#' className='link_terms_conditions'> Terms & Conditions</a></p>
                        
                    </label>
                </div>
                {
                    error ? <p className='signup_error_text'>Please fill in all the fields</p> : null
                }
                {
                    errorSignUp ? <p className='signup_error_text'> User Already Exists </p> : null
                }
                <div className='signup_btn_box'>
                    <input type="submit" className='signup_form_submit_btn' value="SIGN UP"/>
                </div>
                <div className='signup_modal_new_to_wdf_box'>
                    <hr className='signup_line2'/>
                    <h5 className='signup_modal_new_to_wdf_head'>
                        Have an Account?
                    </h5>
                    <hr className='signup_line2'/>    
                </div>
                <div className='to_signin_btn_box'>
                    <button className='tosignin_btn' onClick={showOnlySignin}>SIGN IN</button>
                </div>
            </form>

            </div>

            </ReactModal>
        </div>
    )
}

export default SignUp