import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./CheckPayment.css";
import loading from "../../Images/Loading.gif";
import * as constants from "../../constants";
 
function CheckPayment() {
    const navigate=useNavigate();
    const refId=JSON.parse(localStorage.getItem("refId"));
   
    useEffect(()=>{
        fetch(`${constants.baseURL}/check_pay_status`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                refId:refId
            })
        })
        .then(response=>response.text())
        .then(result=>{
            if(result==="OK"){
                navigate("/")
            }
        })
        .catch(err=>console.log(err))
    },[])
    return(
        <div className="CheckPayment">
            <img src={loading} className="check_loading_gif"/>
        </div>
    )
}

export default CheckPayment