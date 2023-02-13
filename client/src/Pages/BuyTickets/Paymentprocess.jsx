import React, {useState, useEffect} from "react";
import fon1 from '../../Images/Authorization/fon1.png';
import fon2 from '../../Images/Authorization/fon2.png';
import sharik from '../../Images/Authorization/sharik.png';
import process from "../../Images/PaymentProcess.gif";
import logoBlack from "../../Images/logoBlack.png";
import "./BuyTickets.css";
import { useNavigate } from "react-router-dom";

function PaymentProcess() {
    const navigate=useNavigate();
    const closePaymentProccesss=()=>{
        navigate("/buy_tickets");
    }
    return(
        <div className="PaymentProcess">
            <div className="Authorization_component payment_proccess_component">
                <img src={fon1} className="authorization_page_fon1"/> 
                <img src={fon2} className="authorization_page_fon2"/> 
                <div className="Authorization_component_center_box">
                    <img src={sharik} className="authorization_sharik payment_process_sharik"/>
                </div>
                <div className="payment_process_masage_box">
                    <div className="black_logo_box">
                        <img src={logoBlack} className="logo_black"/>
                        <i className="fa-solid fa-xmark"
                            onClick={closePaymentProccesss} 
                            style={{fontSize:"20px",position:"absolute", right:"0", cursor:"pointer"}}></i>
                    </div>
                    <img src={process} className="proccess_gif"/>
                    <p className="payment_process_text">
                        Your payment is in process. 
                        As soon as we confirm the payment, we will send you the ticket copy by E-mail.
                    </p>
                </div>
            </div>
        </div>
    )

}

export default PaymentProcess