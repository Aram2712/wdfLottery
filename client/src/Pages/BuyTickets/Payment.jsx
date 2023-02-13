import React, {useState, useEffect} from "react";
import ReactModal from "react-modal";
import "./BuyTickets.css";
import fon1 from '../../Images/Authorization/fon1.png';
import fon2 from '../../Images/Authorization/fon2.png';
import sharik from '../../Images/Authorization/sharik.png';
import coin from '../../Images/Authorization/rupi.gif';
import logo from "../../Images/HomePage/smalllogo.png";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import imps from "../../Images/imps.png";
import upi from "../../Images/upi.png";
import copy from "../../Images/copy.png";
import qrCode from "../../Images/qrCode.png";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import * as constants from "../../constants";
import axios from "axios";

function Payments() {
    const navigate=useNavigate();
    const [showImps, setShowImps]=useState(false);
    const [showUpi, setShowUpi]=useState(false);
    const [payModal, setPayModal]=useState(false);
    const [paymentMethod, setPaymentMethod]=useState("")
    const [paymentData, setPaymentData]=useState({
        accountNo:{
            value:"920020058162924",
            copied: false,
        },
        ifsc:{
            value:"UTIB0003015",
            copied: false,
        },
        accountHo:{
            value:"SUHANA COMMUNICATION",
            copied: false,
        },
        bankName:{
            value:"AXIS BANK",
            copied: false,
        },
        mail:{
            value:"wdfindia@ybl",
            copied: false,
        }
    })
    const [digit, setDigit]=useState('');
    const [file, setFile]=useState()
    const [screenImg, setScreenImg]=useState()
    const [showSubmitAlert, setShowSubmitAlert]=useState(false);
    const price=JSON.parse(localStorage.getItem("price"));
    const dataPayment=JSON.parse(localStorage.getItem("dataPayment"))
    console.log(dataPayment)
    const axiosMainUrl = axios.create({
        baseURL:constants.baseURL
      });
    const closePaymentWindow=()=>{
        navigate("/buy_tickets");
    }
    const showPayModal=()=>{
        setPayModal(true);
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setFile(reader.result)
                setScreenImg(e.target.files[0])
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const submitPayData=()=>{
        dataPayment.paymentName=paymentMethod;
        dataPayment.bankRef=digit
        let formData = new FormData();
        
        fetch(`${constants.baseURL}/buy_tickets`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(dataPayment)
        })
        .then(response=>response.json())
        .then(result=>{
            if(result.id){
                formData.append("id",result.id);
                formData.append("paymentName", result.paymentName);
                formData.append("paymentScreenshot", screenImg);
                axiosMainUrl.post("/upload_payment_screenshot",formData,{
                    headers: {
                        "Content-type": "multipart/form-data",
                        'Authorization':`Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(result=> {console.log(result)
                    result ? navigate("/payment_process") : null
                })
                .catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log(err))
    }
    return(
        <div>
            <div className="Authorization_component">
                <img src={fon1} className="authorization_page_fon1"/> 
                <img src={fon2} className="authorization_page_fon2"/> 
                <div className="Authorization_component_center_box">
                    <img src={sharik} className="authorization_sharik"/>
                    <img src={coin} className="authorization_bitcoin_image rupy_gif_image"/>
                </div>
            </div>
            {
                !payModal?
            
            <ReactModal
                isOpen={true}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        zIndex: 100,
                        padding:0,

                    },
                    content: {
                        maxWidth: '400px',
                        maxHeight:"1000px",
                        height:"60%",
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
                    <div className="payment_header_box">
                        <div className="payment_header_logo_exit_box">
                            <img src={logo} className="payment_window_logo"/>
                            <i className="fa-solid fa-xmark exit_signin_modal" onClick={closePaymentWindow}></i>
                        </div>
                        <h4 className="payment_head">
                            Payment Request
                        </h4>
                        <p className="payment_price_text"><i className="fa fa-rupee" 
                            style={{fontSize:"16px", color:"white",margin:"0 5px"}}></i>{price}</p>
                    </div>
                    <div className="payment_method_box">
                        <h4 className="payment_method_head">Payment methods</h4>
                        <div className="payment_imps_box payment_small_box" 
                            onClick={()=>{setShowImps(true); setShowUpi(false);setPaymentMethod("IMPS")}}
                            onMouseOver={(e)=>e.target.style.background="#FFFFFF"}
                            onMouseOut={(e)=>{e.target.style.background=!showImps?"rgba(255, 255, 255, 0.1)":"rgba(6, 197, 190, 0.3)"}}
                            style={{border:showImps?"1.5px solid #00D6E6":"none", background:showImps?"rgba(6, 197, 190, 0.3)":"rgba(255, 255, 255, 0.1)"}}>
                            <img src={imps} className="payment_icon"/>
                            <p className="payment_method_text">IMPS</p>
                            <i className="fa fa-check" style={{display:showImps?"inline-block":"none", fontSize:"20px", position:"absolute", right:"10px", color:"white"}}></i>

                        </div>
                        <div className="payment_upi_box payment_small_box" 
                            onClick={()=>{setShowImps(false); setShowUpi(true); setPaymentMethod("UPI")}}
                            onMouseOver={(e)=>e.target.style.background="#FFFFFF"}
                            onMouseOut={(e)=>{e.target.style.background=!showUpi?"rgba(255, 255, 255, 0.1)":"rgba(6, 197, 190, 0.3)"}}
                            style={{border:showUpi?"1.5px solid #00D6E6":"none", background:showUpi?"rgba(6, 197, 190, 0.3)":"rgba(255, 255, 255, 0.1)"}}>
                            <img src={upi} className="payment_icon"/>
                            <p className="payment_method_text">UPI</p>
                            <i className="fa fa-check" style={{display:showUpi?"inline-block":"none", fontSize:"20px", position:"absolute", right:"10px", color:"white"}}></i>
                        </div>
                    </div>
                    <button className="payment_window_button" 
                        style={{display:showUpi || showImps?"inline-block":"none"}}
                        onClick={showPayModal}>
                            PAY <i className="fa fa-rupee" 
                            style={{fontSize:"16px", color:"white",margin:"0 5px 0 10px"}}></i>
                            {price}
                    </button>
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
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        zIndex: 100,
                        padding:0,

                    },
                    content: {
                        maxWidth: '400px',
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
                <div className="payment_header_box payment_window_head">
                    <div className="payment_header_logo_exit_box">
                        <img src={logo} className="payment_window_logo"/>
                        <i className="fa-solid fa-xmark exit_signin_modal" onClick={closePaymentWindow}></i>
                    </div>
                    <div className="payment_modal_text_box">
                        <p className="payment_modal_text">
                            NOTE : <span>User are requested to make payment on the given details to avoid any delays and other 
                            consequences and also requesting to fill the mandatory fields, if not submitted properly within 
                            1hour of the transaction payment will be deemed as zero. False claims will has legal consequences.
                            </span>
                        </p>
                    </div>
                    <div className="payment_modal_text_box indian_text_box">
                        <p className="payment_modal_indian_text">
                            नोट: <span>उपयोगकर्ता से किसी भी देरी और अन्य परिणामों से बचने के लिए दिए गए विवरण पर भुगतान करने का 
                                    अनुरोध किया जाता है और लेनदेन भुगतान के 1 घंटे के भीतर ठीक से जमा नहीं किए जाने पर अनिवार्य फ़ील्ड भरने 
                                    का अनुरोध शून्य माना जाएगा। झूठे दावों के कानूनी परिणाम होंगे। !
                                </span>
                        </p>
                    </div>
                </div>
                {
                    showImps?
                
                <div className="payment_window_inputs_box">
                    <div className="payment_input_box">
                        <p className="payment_input_label">
                            Account number
                        </p>
                        <input type="text" className="payment_input" value={paymentData.accountNo.value}/>
                        <CopyToClipboard text={paymentData.accountNo.value}
                            onCopy={() =>setPaymentData(paymentData=>{return {...paymentData, accountNo:{...paymentData.accountNo, copied:true}}})}>
                            <img src={copy} className="payment_copy_icon"/>
                        </CopyToClipboard>
                    </div>
                    <div className="payment_input_box">
                        <p className="payment_input_label">
                            IFSC code
                        </p>
                        <input type="text" className="payment_input" value={paymentData.ifsc.value}/>
                        <CopyToClipboard text={paymentData.ifsc.value}
                            onCopy={() =>setPaymentData(paymentData=>{return {...paymentData, ifsc:{...paymentData.ifsc, copied:true}}})}>
                            <img src={copy} className="payment_copy_icon"/>
                        </CopyToClipboard>
                    </div>
                    <div className="payment_input_box">
                        <p className="payment_input_label">
                            Account holder
                        </p>
                        <input type="text" className="payment_input" value={paymentData.accountHo.value}/>
                        <CopyToClipboard text={paymentData.accountHo.value}
                            onCopy={() =>setPaymentData(paymentData=>{return {...paymentData, accountHo:{...paymentData.accountHo, copied:true}}})}>
                            <img src={copy} className="payment_copy_icon"/>
                        </CopyToClipboard>
                    </div>
                    <div className="payment_input_box">
                        <p className="payment_input_label">
                            Bank name
                        </p>
                        <input type="text" className="payment_input" value={paymentData.bankName.value}/>
                        <CopyToClipboard text={paymentData.bankName.value}
                            onCopy={() =>setPaymentData(paymentData=>{return {...paymentData, bankName:{...paymentData.bankName, copied:true}}})}>
                            <img src={copy} className="payment_copy_icon"/>
                        </CopyToClipboard>
                    </div>
                    <div className="payment_input_box">
                        <p className="payment_input_label">
                            Bank Ref. No (Mandatory)
                        </p>
                        <input type="text" maxLength="12" className="payment_digit_input" value={digit} 
                            onChange={(e)=>setDigit(e.target.value)} placeholder="Enter 12 Digit UTR No"/>

                    </div>
                    <div className="payment_screen_shot_box">
                        <input type="file" className="screen_shot_input" onChange={imageHandler} multiple/>

                    </div>
                    <div className="payment_submit_box">
                        <button className="payment_submit_button" onClick={submitPayData}>SUBMIT</button>
                    </div>
                </div>
            
            : showUpi?
            <div className="payment_window_inputs_box">
                <div className="payment_qr_box">
                    <h4 className="payment_qr_head">
                        Scan QR code below with your PSP App
                    </h4>
                    <img src={qrCode} className="image_qr"/> 
                    <p className="or_pay_to_upi_text">Or Pay to VPA</p>   
                    <div className="payment_input_box qr12_input_box">
                         <input type="text" className="payment_input qr_12_input" value={paymentData.mail.value}/>
                        <CopyToClipboard text={paymentData.mail.value}
                            onCopy={() =>setPaymentData(paymentData=>{return {...paymentData, mail:{...paymentData.mail, copied:true}}})}>
                            <img src={copy} className="payment_copy_icon qr_12_copy"/>
                        </CopyToClipboard>
                    </div>
                </div>   
                <div className="payment_input_box">
                    <p className="payment_input_label">
                        Bank Ref. No (Mandatory)
                    </p>
                    <input type="text" maxLength="12" className="payment_digit_input" value={digit} 
                        onChange={(e)=>setDigit(e.target.value)} placeholder="Enter 12 Digit UTR No"/>

                </div>
                <div className="payment_screen_shot_box">
                    <input type="file" className="screen_shot_input" onChange={imageHandler} multiple/>
                </div>
                <div className="payment_submit_box">
                    <button className="payment_submit_button" onClick={submitPayData}>SUBMIT</button>
                </div>
                
            </div>
            :null
            }
            </ReactModal>
        }


        </div>
    )
}


export default Payments